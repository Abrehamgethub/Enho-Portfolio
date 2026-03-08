import { NextRequest, NextResponse } from 'next/server'
import { addMessage } from '@/lib/db'
import nodemailer from 'nodemailer'

// Email notification function
async function sendEmailNotification({ name, email, subject, message }: {
  name: string
  email: string
  subject: string
  message: string
}) {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    })

    const emailContent = `
New Contact Form Submission from Eneho Egna Website

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This message was sent from the Eneho Egna website contact form.
    `.trim()

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `New Contact: ${subject}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    })

    console.log('Email notification sent successfully')
  } catch (error) {
    console.error('Failed to send email notification:', error)
    // Don't fail the request if email fails
  }
}

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

    // Save to database
    const savedMessage = await addMessage({
      name,
      email,
      subject: subject || 'No Subject',
      message
    })
    
    console.log('New contact submission saved:', savedMessage.id)

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

    // Send email notification
    await sendEmailNotification({ name, email, subject: subject || 'No Subject', message })

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
