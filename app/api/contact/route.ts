import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/firebase'
import { collection, addDoc } from 'firebase/firestore'
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
        user: process.env.EMAIL_USER || 'enehoegna@gmail.com',
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
      from: process.env.EMAIL_FROM || 'enehoegna@gmail.com',
      to: process.env.EMAIL_TO || 'enehoegna@gmail.com',
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

    let savedMessage;
    try {
      // 1. Save to database FIRST
      savedMessage = await addDoc(collection(db, "messages"), {
        name,
        email,
        subject: subject || 'No Subject',
        message,
        read: false,
        date: new Date().toISOString()
      })
      console.log('✅ New contact submission saved:', savedMessage.id)
    } catch (error: any) {
      // Return the EXACT error message to not hide silent failures
      console.error("CONTACT API ERROR:", error);
      return NextResponse.json(
        { error: error.message || 'Database write failed' },
        { status: 500 }
      );
    }

    // 2. Email sending happens AFTER (try/catch so it doesn't fail the request)
    try {
      await sendEmailNotification({ name, email, subject: subject || 'No Subject', message })
    } catch (emailError) {
      console.error('Email notification failed but message was saved:', emailError)
    }

    // 3. Telegram notification happens AFTER (try/catch so it doesn't fail the request)
    try {
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
    } catch (telegramError) {
      console.error('Telegram notification failed but message was saved:', telegramError)
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Thank you for your message! We will get back to you soon.' 
    })

  } catch (error: any) {
    console.error("CONTACT API ERROR:", error);
    return NextResponse.json(
      { error: error.message || 'Unknown request failure' },
      { status: 500 }
    )
  }
}
