import prisma from '@/lib/prisma';

let tablesInitialized = false;

// In-memory backup store in case DB connection has a transient hiccup
const memorySessions = new Map();
const memoryMessages = new Map();

export async function ensureChatTables() {
  if (tablesInitialized) return;
  try {
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ChatSession" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "visitorName" TEXT NOT NULL DEFAULT 'Visitor',
        "visitorEmail" TEXT,
        "visitorPhone" TEXT,
        "visitorIp" TEXT,
        "language" TEXT NOT NULL DEFAULT 'en',
        "mode" TEXT NOT NULL DEFAULT 'ai',
        "needsHuman" BOOLEAN NOT NULL DEFAULT false,
        "unreadAdmin" INTEGER NOT NULL DEFAULT 0,
        "unreadVisitor" INTEGER NOT NULL DEFAULT 0,
        "lastMessage" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "ChatMessage" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "sessionId" TEXT NOT NULL REFERENCES "ChatSession"("id") ON DELETE CASCADE,
        "sender" TEXT NOT NULL,
        "text" TEXT NOT NULL,
        "actions" JSONB,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "ChatMessage_sessionId_idx" ON "ChatMessage"("sessionId");
    `);

    tablesInitialized = true;
  } catch (err) {
    console.error('Failed to initialize chat tables (using fallback):', err.message);
  }
}

/**
 * Automatically extract phone number, email, or name from visitor text (Smart Lead Capture)
 */
export function extractLeadInfo(text) {
  if (!text || typeof text !== 'string') return {};
  const result = {};

  // Match email
  const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
  if (emailMatch) {
    result.email = emailMatch[0].toLowerCase();
  }

  // Match BD or international phone number (e.g., +8801..., 013..., 017..., etc.)
  const phoneMatch = text.match(/(?:\+?880|0)?1[3-9]\d{8}\b|\+\d{1,3}[\s-]?\d{6,12}\b/);
  if (phoneMatch) {
    result.phone = phoneMatch[0].trim();
  }

  // Match explicit name introduction (English / Bangla / Banglish)
  const namePatterns = [
    /(?:my name is|i am|this is|i'm)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){0,2})/i,
    /(?:amar nam|ami)\s+([A-Za-z]{2,20}(?:\s+[A-Za-z]{2,20})?)/i,
    /(?:আমার নাম)\s+([\u0980-\u09FF\s]{2,25})/,
  ];
  for (const pat of namePatterns) {
    const m = text.match(pat);
    if (m && m[1]) {
      const candidate = m[1].trim();
      const ignoreWords = new Set(['looking', 'planning', 'interested', 'asking', 'want', 'need', 'from', 'here', 'fine', 'good', 'ekjon', 'akta', 'ekta']);
      if (!ignoreWords.has(candidate.toLowerCase().split(/\s+/)[0])) {
        result.name = candidate;
        break;
      }
    }
  }

  return result;
}

export async function getOrCreateSession(sessionId, meta = {}) {
  await ensureChatTables();
  const cleanId = String(sessionId || 'sess_' + Date.now()).slice(0, 80);

  try {
    const existing = await prisma.$queryRaw`
      SELECT * FROM "ChatSession" WHERE "id" = ${cleanId} LIMIT 1
    `;
    if (existing && existing[0]) {
      return existing[0];
    }

    const visitorName = meta.visitorName || `Visitor #${cleanId.slice(-4).toUpperCase()}`;
    const visitorIp = meta.ip || null;
    const language = meta.language || 'en';

    const created = await prisma.$queryRaw`
      INSERT INTO "ChatSession" (
        "id", "visitorName", "visitorIp", "language", "mode", "needsHuman", "unreadAdmin", "unreadVisitor", "createdAt", "updatedAt"
      )
      VALUES (
        ${cleanId}, ${visitorName}, ${visitorIp}, ${language}, 'ai', false, 0, 0, NOW(), NOW()
      )
      ON CONFLICT ("id") DO UPDATE SET "updatedAt" = NOW()
      RETURNING *
    `;
    return created?.[0] || null;
  } catch (err) {
    if (!memorySessions.has(cleanId)) {
      memorySessions.set(cleanId, {
        id: cleanId,
        visitorName: meta.visitorName || `Visitor #${cleanId.slice(-4).toUpperCase()}`,
        visitorEmail: null,
        visitorPhone: null,
        visitorIp: meta.ip || null,
        language: meta.language || 'en',
        mode: 'ai',
        needsHuman: false,
        unreadAdmin: 0,
        unreadVisitor: 0,
        lastMessage: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }
    return memorySessions.get(cleanId);
  }
}

export async function addChatMessage(sessionId, { sender, text, actions = [], language, needsHuman, leadInfo = {} }) {
  await ensureChatTables();
  const msgId = 'msg_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 7);
  const actionsJson = JSON.stringify(Array.isArray(actions) ? actions : []);

  const extracted = sender === 'user' ? extractLeadInfo(text) : {};
  const finalName = leadInfo.name || extracted.name || null;
  const finalEmail = leadInfo.email || extracted.email || null;
  const finalPhone = leadInfo.phone || extracted.phone || null;

  try {
    await getOrCreateSession(sessionId, { language });

    await prisma.$executeRaw`
      INSERT INTO "ChatMessage" ("id", "sessionId", "sender", "text", "actions", "createdAt")
      VALUES (${msgId}, ${sessionId}, ${sender}, ${text}, ${actionsJson}::jsonb, NOW())
    `;

    const incAdmin = sender === 'user' ? 1 : 0;
    const incVisitor = sender === 'admin' ? 1 : 0;

    if (needsHuman === true) {
      await prisma.$executeRaw`
        UPDATE "ChatSession"
        SET
          "lastMessage" = ${text.slice(0, 300)},
          "unreadAdmin" = "unreadAdmin" + ${incAdmin},
          "unreadVisitor" = "unreadVisitor" + ${incVisitor},
          "needsHuman" = true,
          "language" = COALESCE(${language || null}, "language"),
          "visitorName" = COALESCE(${finalName}, "visitorName"),
          "visitorEmail" = COALESCE(${finalEmail}, "visitorEmail"),
          "visitorPhone" = COALESCE(${finalPhone}, "visitorPhone"),
          "updatedAt" = NOW()
        WHERE "id" = ${sessionId}
      `;
    } else {
      await prisma.$executeRaw`
        UPDATE "ChatSession"
        SET
          "lastMessage" = ${text.slice(0, 300)},
          "unreadAdmin" = "unreadAdmin" + ${incAdmin},
          "unreadVisitor" = "unreadVisitor" + ${incVisitor},
          "language" = COALESCE(${language || null}, "language"),
          "visitorName" = COALESCE(${finalName}, "visitorName"),
          "visitorEmail" = COALESCE(${finalEmail}, "visitorEmail"),
          "visitorPhone" = COALESCE(${finalPhone}, "visitorPhone"),
          "updatedAt" = NOW()
        WHERE "id" = ${sessionId}
      `;
    }

    return {
      id: msgId,
      sessionId,
      sender,
      text,
      actions: Array.isArray(actions) ? actions : [],
      createdAt: new Date().toISOString(),
    };
  } catch (err) {
    const list = memoryMessages.get(sessionId) || [];
    const item = {
      id: msgId,
      sessionId,
      sender,
      text,
      actions: Array.isArray(actions) ? actions : [],
      createdAt: new Date().toISOString(),
    };
    list.push(item);
    memoryMessages.set(sessionId, list);
    return item;
  }
}

export async function getSessionMessages(sessionId, reader = 'visitor') {
  await ensureChatTables();
  try {
    const sessions = await prisma.$queryRaw`
      SELECT * FROM "ChatSession" WHERE "id" = ${sessionId} LIMIT 1
    `;
    const session = sessions?.[0] || null;
    if (!session) return { session: null, messages: [] };

    if (reader === 'visitor' && session.unreadVisitor > 0) {
      await prisma.$executeRaw`
        UPDATE "ChatSession" SET "unreadVisitor" = 0 WHERE "id" = ${sessionId}
      `;
      session.unreadVisitor = 0;
    } else if (reader === 'admin' && session.unreadAdmin > 0) {
      await prisma.$executeRaw`
        UPDATE "ChatSession" SET "unreadAdmin" = 0 WHERE "id" = ${sessionId}
      `;
      session.unreadAdmin = 0;
    }

    const messages = await prisma.$queryRaw`
      SELECT * FROM "ChatMessage"
      WHERE "sessionId" = ${sessionId}
      ORDER BY "createdAt" ASC
      LIMIT 150
    `;

    return {
      session,
      messages: (messages || []).map((m) => ({
        ...m,
        actions: typeof m.actions === 'string' ? JSON.parse(m.actions || '[]') : (m.actions || []),
      })),
    };
  } catch (err) {
    return {
      session: memorySessions.get(sessionId) || null,
      messages: memoryMessages.get(sessionId) || [],
    };
  }
}

export async function listAllChatSessions() {
  await ensureChatTables();
  try {
    const sessions = await prisma.$queryRaw`
      SELECT * FROM "ChatSession"
      ORDER BY "needsHuman" DESC, "updatedAt" DESC
      LIMIT 100
    `;
    return sessions || [];
  } catch {
    return Array.from(memorySessions.values());
  }
}

export async function updateSessionState(sessionId, { mode, needsHuman, visitorName, visitorEmail, visitorPhone }) {
  await ensureChatTables();
  try {
    const rows = await prisma.$queryRaw`
      UPDATE "ChatSession"
      SET
        "mode" = COALESCE(${mode ?? null}, "mode"),
        "needsHuman" = COALESCE(${needsHuman ?? null}, "needsHuman"),
        "visitorName" = COALESCE(${visitorName ?? null}, "visitorName"),
        "visitorEmail" = COALESCE(${visitorEmail ?? null}, "visitorEmail"),
        "visitorPhone" = COALESCE(${visitorPhone ?? null}, "visitorPhone"),
        "updatedAt" = NOW()
      WHERE "id" = ${sessionId}
      RETURNING *
    `;
    return rows?.[0] || null;
  } catch {
    return null;
  }
}

export async function deleteChatSession(sessionId) {
  await ensureChatTables();
  try {
    await prisma.$executeRaw`
      DELETE FROM "ChatSession" WHERE "id" = ${sessionId}
    `;
    return true;
  } catch {
    memorySessions.delete(sessionId);
    memoryMessages.delete(sessionId);
    return true;
  }
}

export async function getAiConfig() {
  const defaults = {
    geminiApiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || '',
    groqApiKey: process.env.GROQ_API_KEY || '',
    openaiApiKey: process.env.OPENAI_API_KEY || '',
    customInstructions: '',
  };

  try {
    const block = await prisma.contentBlock.findUnique({
      where: { key: 'ai_chat_config' },
    });
    if (block?.value) {
      const parsed = JSON.parse(block.value);
      return {
        geminiApiKey: parsed.geminiApiKey || defaults.geminiApiKey,
        groqApiKey: parsed.groqApiKey || defaults.groqApiKey,
        openaiApiKey: parsed.openaiApiKey || defaults.openaiApiKey,
        customInstructions: parsed.customInstructions || '',
      };
    }
  } catch {
    // Fallback to env defaults
  }
  return defaults;
}

export async function saveAiConfig(newConfig) {
  const current = await getAiConfig();
  const merged = {
    geminiApiKey: newConfig.geminiApiKey !== undefined ? newConfig.geminiApiKey.trim() : current.geminiApiKey,
    groqApiKey: newConfig.groqApiKey !== undefined ? newConfig.groqApiKey.trim() : current.groqApiKey,
    openaiApiKey: newConfig.openaiApiKey !== undefined ? newConfig.openaiApiKey.trim() : current.openaiApiKey,
    customInstructions: newConfig.customInstructions !== undefined ? newConfig.customInstructions : current.customInstructions,
  };

  await prisma.contentBlock.upsert({
    where: { key: 'ai_chat_config' },
    update: {
      value: JSON.stringify(merged),
      title: 'MerxoDev AI Chatbot Configuration',
      section: 'ai',
    },
    create: {
      key: 'ai_chat_config',
      title: 'MerxoDev AI Chatbot Configuration',
      value: JSON.stringify(merged),
      section: 'ai',
    },
  });

  return merged;
}

