import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    // Here you can integrate with:
    // 1. Email service (Nodemailer, SendGrid, Resend)
    // 2. Database (save to MongoDB, Supabase, etc.)
    // 3. Notification service (Slack, Telegram)

    // For now, log the contact submission
    console.log('New contact submission:', { name, email, subject, message })

    // Example: Send to Telegram (if BOT_TOKEN and CHAT_ID are set)
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN
    const telegramChatId = process.env.TELEGRAM_CHAT_ID

    if (telegramBotToken && telegramChatId) {
      const telegramMessage = `
🆕 New Contact Form Submission

👤 Name: ${name}
📧 Email: ${email}
📋 Subject: ${subject || 'No subject'}
💬 Message: ${message}
      `.trim()

      await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text: telegramMessage,
          parse_mode: 'HTML'
        })
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.' 
    })

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    )
  }
}
