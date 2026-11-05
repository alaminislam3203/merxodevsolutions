import { NextResponse } from 'next/server';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import {
  getOrCreateSession,
  addChatMessage,
  getSessionMessages,
  updateSessionState,
  extractLeadInfo,
} from '@/lib/chatStore';
import {
  generateAiResponse,
  detectHumanRequest,
  detectLanguage,
} from '@/lib/aiEngine';

const WHATSAPP_NUM = '8801313334279';
const WHATSAPP_DISPLAY = '+880 1313-334279';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    if (!sessionId) {
      return NextResponse.json({ session: null, messages: [] });
    }

    const data = await getSessionMessages(sessionId, 'visitor');
    return NextResponse.json({
      session: data.session,
      messages: data.messages,
    });
  } catch (error) {
    console.error('GET /api/chat error:', error);
    return NextResponse.json({ session: null, messages: [] });
  }
}

export async function POST(request) {
  try {
    const clientIp = getClientIp(request);
    const rateCheck = checkRateLimit(`chat:${clientIp}`, {
      limit: 40,
      windowMs: 60 * 1000,
    });
    if (!rateCheck.success) {
      return NextResponse.json(
        { error: 'Too many messages. Please wait a moment before sending another message.' },
        { status: 429, headers: { 'Retry-After': String(rateCheck.retryAfter) } }
      );
    }

    const body = await request.json();
    const { sessionId: rawSessionId, message, action, visitorName } = body || {};
    const sessionId = String(rawSessionId || 'sess_' + Date.now()).slice(0, 80);

    const session = await getOrCreateSession(sessionId, {
      ip: clientIp,
      visitorName,
    });

    // Action 1: Visitor clicked "Talk to Live Admin" button
    if (action === 'request_human') {
      await updateSessionState(sessionId, { needsHuman: true });
      const lang = session?.language || 'en';
      const userReqText =
        lang === 'bn'
          ? '🔔 আমি একজন লাইভ অ্যাডমিনের সাথে কথা বলতে চাই।'
          : '🔔 I would like to speak with a Live Admin.';

      await addChatMessage(sessionId, {
        sender: 'user',
        text: userReqText,
        language: lang,
        needsHuman: true,
      });

      const botAckText =
        lang === 'bn'
          ? '✅ **লাইভ অ্যাডমিনকে ইনস্ট্যান্ট নোটিফিকেশন পাঠানো হয়েছে!** আমাদের অ্যাডমিন এখনই চ্যাটে জয়েন করবেন।\n\nআপনি চাইলে এখানে আপনার **নাম ও WhatsApp নাম্বার** এবং প্রজেক্টের বিস্তারিত লিখে রাখতে পারেন।'
          : lang === 'banglish'
          ? '✅ **Live Admin ke instant notification pathano hoyeche!** Amader admin ekhoni chat e join korben.\n\nApni chaile apnar **nam o WhatsApp number** ebong ki dhoroner website lagbe ekhane likhe rakhte paren.'
          : '✅ **Instant Alert Sent to Live Admin!** An admin has been notified with a sound alert and will join this chat shortly.\n\nFeel free to drop your **Name, WhatsApp number/Email**, and project details right here!';

      const botMsg = await addChatMessage(sessionId, {
        sender: 'bot',
        text: botAckText,
        actions: [
          { label: `Direct WhatsApp (${WHATSAPP_DISPLAY})`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' },
        ],
        language: lang,
        needsHuman: true,
      });

      const updated = await getSessionMessages(sessionId, 'visitor');
      return NextResponse.json({
        reply: botMsg.text,
        actions: botMsg.actions,
        session: updated.session,
        messages: updated.messages,
      });
    }

    if (!message || typeof message !== 'string') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const trimmed = message.trim();
    if (!trimmed || trimmed.length > 1500) {
      return NextResponse.json({ error: 'Invalid message length' }, { status: 400 });
    }

    const lang = detectLanguage(trimmed, session?.language || 'en');
    const wantsHuman = detectHumanRequest(trimmed);
    const leadCaptured = extractLeadInfo(trimmed);

    // Save visitor's message in DB
    await addChatMessage(sessionId, {
      sender: 'user',
      text: trimmed,
      language: lang,
      needsHuman: wantsHuman ? true : undefined,
      leadInfo: leadCaptured,
    });

    const currentData = await getSessionMessages(sessionId, 'visitor');
    const activeSession = currentData.session || session;

    // If Admin has taken over this chat in LIVE mode, do NOT let AI interrupt!
    if (activeSession?.mode === 'live') {
      return NextResponse.json({
        mode: 'live',
        waitingForAdmin: true,
        session: activeSession,
        messages: currentData.messages,
      });
    }

    // If visitor typed "talk to human/admin" in text
    if (wantsHuman) {
      const humanReply =
        lang === 'bn'
          ? '🔔 আমি আমাদের **লাইভ অ্যাডমিনকে ইনস্ট্যান্ট সাউন্ড নোটিফিকেশন** পাঠিয়ে দিয়েছি! অ্যাডমিন যেকোনো মুহূর্তে এই চ্যাটে যুক্ত হয়ে আপনার সাথে সরাসরি কথা বলবেন।\n\nআপনার **WhatsApp নাম্বারটি** কি এখানে শেয়ার করবেন?'
          : lang === 'banglish'
          ? '🔔 Ami amader **Live Admin ke instant sound notification** pathiye diyechi! Admin ekhoni ei chat e join kore apnar sathe direct kotha bolben.\n\nApnar **WhatsApp number** ta ki ekhane diben?'
          : '🔔 I have alerted our **Live Admin** with an instant notification! An admin can join this chat live at any moment.\n\nIn the meantime, please share your **Name & WhatsApp number** or ask me anything about MerxoDev Solutions!';

      const botMsg = await addChatMessage(sessionId, {
        sender: 'bot',
        text: humanReply,
        actions: [
          { label: `WhatsApp (${WHATSAPP_DISPLAY})`, href: `https://wa.me/${WHATSAPP_NUM}`, type: 'external' },
        ],
        language: lang,
        needsHuman: true,
      });

      const afterHuman = await getSessionMessages(sessionId, 'visitor');
      return NextResponse.json({
        reply: botMsg.text,
        actions: botMsg.actions,
        session: afterHuman.session,
        messages: afterHuman.messages,
      });
    }

    // Generate intelligent AI response with conversation history + website/DB context
    const historyWithoutCurrent = (currentData.messages || []).slice(0, -1);
    const aiResult = await generateAiResponse({
      userMessage: trimmed,
      history: historyWithoutCurrent,
      session: activeSession,
      leadCaptured,
    });

    await addChatMessage(sessionId, {
      sender: 'bot',
      text: aiResult.reply,
      actions: aiResult.actions,
      language: aiResult.lang,
    });

    const finalData = await getSessionMessages(sessionId, 'visitor');

    return NextResponse.json({
      reply: aiResult.reply,
      actions: aiResult.actions,
      suggestions: aiResult.suggestions,
      mode: finalData.session?.mode || 'ai',
      session: finalData.session,
      messages: finalData.messages,
    });
  } catch (error) {
    console.error('Chatbot API Error:', error);
    return NextResponse.json(
      {
        reply: `I am experiencing a brief network delay. Please reach us directly on WhatsApp (${WHATSAPP_DISPLAY}).`,
      },
      { status: 500 }
    );
  }
}
