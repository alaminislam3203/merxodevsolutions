import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/adminAuth';
import { logActivity } from '@/lib/workspaceStore';
import {
  listAllChatSessions,
  getSessionMessages,
  addChatMessage,
  updateSessionState,
  deleteChatSession,
  getAiConfig,
  saveAiConfig,
} from '@/lib/chatStore';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { authorized, response } = await requireAdmin({ allowTeamMember: true });
    if (!authorized) return response;

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    const includeConfig = searchParams.get('config') === '1';

    if (sessionId) {
      const data = await getSessionMessages(sessionId, 'admin');
      return NextResponse.json(data);
    }

    const sessions = await listAllChatSessions();
    let totalUnread = 0;
    let needsHumanCount = 0;
    let liveCount = 0;

    for (const s of sessions) {
      totalUnread += Number(s.unreadAdmin || 0);
      if (s.needsHuman) needsHumanCount += 1;
      if (s.mode === 'live') liveCount += 1;
    }

    let aiConfigSummary = null;
    if (includeConfig) {
      const cfg = await getAiConfig();
      aiConfigSummary = {
        hasGemini: Boolean(cfg.geminiApiKey),
        hasGroq: Boolean(cfg.groqApiKey),
        hasOpenai: Boolean(cfg.openaiApiKey),
        geminiKeyPreview: cfg.geminiApiKey ? `${cfg.geminiApiKey.slice(0, 6)}...${cfg.geminiApiKey.slice(-4)}` : '',
        groqKeyPreview: cfg.groqApiKey ? `${cfg.groqApiKey.slice(0, 6)}...${cfg.groqApiKey.slice(-4)}` : '',
        customInstructions: cfg.customInstructions || '',
      };
    }

    return NextResponse.json({
      sessions,
      stats: {
        totalSessions: sessions.length,
        totalUnread,
        needsHumanCount,
        liveCount,
      },
      aiConfig: aiConfigSummary,
    });
  } catch (error) {
    console.error('GET /api/admin/chat error:', error);
    return NextResponse.json({ error: 'Failed to load chat sessions' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { authorized, session, response, isAdmin } = await requireAdmin({ allowTeamMember: true });
    if (!authorized) return response;

    const body = await request.json();
    const { action, sessionId, text, mode, visitorName, config } = body || {};

    if (action === 'save_config' && config) {
      if (!isAdmin) {
        return NextResponse.json({ error: 'Only Admin can modify AI API configuration' }, { status: 403 });
      }
      await saveAiConfig(config);
      const updated = await getAiConfig();
      return NextResponse.json({
        success: true,
        aiConfig: {
          hasGemini: Boolean(updated.geminiApiKey),
          hasGroq: Boolean(updated.groqApiKey),
          hasOpenai: Boolean(updated.openaiApiKey),
          geminiKeyPreview: updated.geminiApiKey
            ? `${updated.geminiApiKey.slice(0, 6)}...${updated.geminiApiKey.slice(-4)}`
            : '',
          groqKeyPreview: updated.groqApiKey
            ? `${updated.groqApiKey.slice(0, 6)}...${updated.groqApiKey.slice(-4)}`
            : '',
          customInstructions: updated.customInstructions || '',
        },
      });
    }

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    // Admin sends a live reply
    if (action === 'reply') {
      if (!text || !text.trim()) {
        return NextResponse.json({ error: 'Reply text is required' }, { status: 400 });
      }

      // Automatically switch session to 'live' mode and clear needsHuman flag
      await updateSessionState(sessionId, {
        mode: 'live',
        needsHuman: false,
      });

      await addChatMessage(sessionId, {
        sender: 'admin',
        text: text.trim(),
        needsHuman: false,
        senderMeta: {
          name: session?.user?.name || 'MerxoDev Team',
          image: session?.user?.image || null,
          role: session?.user?.role || 'ADMIN',
        },
      });

      const updated = await getSessionMessages(sessionId, 'admin');
      await logActivity({
        user: session?.user,
        action: 'CHAT_REPLY',
        target: updated?.session?.visitorName || sessionId,
        details: `Replied in Live Chat: "${text.trim().slice(0, 70)}"`,
      });
      return NextResponse.json({
        success: true,
        session: updated.session,
        messages: updated.messages,
      });
    }

    // Admin toggles mode between 'live' (Admin Takeover) and 'ai' (AI Mode)
    if (action === 'toggle_mode') {
      const targetMode = mode === 'live' ? 'live' : 'ai';
      await updateSessionState(sessionId, {
        mode: targetMode,
        needsHuman: false,
      });

      const sysMsg =
        targetMode === 'live'
          ? '**Live Team joined the chat!** You are now speaking directly with a MerxoDev Solutions team member.'
          : '**MerxoDev AI Assistant is back online** to assist you instantly.';

      await addChatMessage(sessionId, {
        sender: 'system',
        text: sysMsg,
      });

      const updated = await getSessionMessages(sessionId, 'admin');
      return NextResponse.json({
        success: true,
        session: updated.session,
        messages: updated.messages,
      });
    }

    if (action === 'update_visitor') {
      const updatedSession = await updateSessionState(sessionId, {
        visitorName,
        needsHuman: false,
      });
      return NextResponse.json({ success: true, session: updatedSession });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('POST /api/admin/chat error:', error);
    return NextResponse.json({ error: 'Failed to process chat action' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { authorized, response } = await requireAdmin();
    if (!authorized) return response;

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 });
    }

    await deleteChatSession(sessionId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/admin/chat error:', error);
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
  }
}

