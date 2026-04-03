import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { requireAuth } from '@/lib/auth-middleware'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResponse = await requireAuth(request)
  if (authResponse) return authResponse

  try {
    const { to, subject, replyText, originalMessage } = await request.json()

    if (!to || !subject || !replyText) {
      return NextResponse.json(
        { error: 'Recipient, subject, and reply text are required' },
        { status: 400 }
      )
    }

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
${replyText}

---
On ${new Date().toLocaleDateString()}, ${to} wrote:
> ${originalMessage}

--
Eneho Egna Team
Health Media & Community Wellness
    `.trim()

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
        <p style="white-space: pre-wrap;">${replyText}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="color: #666; font-size: 0.9em;">On ${new Date().toLocaleDateString()}, you wrote:</p>
        <blockquote style="margin: 0; padding-left: 15px; border-left: 3px solid #ccc; color: #555; white-space: pre-wrap;">
          ${originalMessage}
        </blockquote>
        <br />
        <p style="color: #888; font-size: 0.8em; margin-top: 20px;">
          --<br />
          <strong>Eneho Egna Team</strong><br />
          Health Media & Community Wellness
        </p>
      </div>
    `

    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'enehoegna@gmail.com',
      to,
      subject: `Re: ${subject}`,
      text: emailContent,
      html: htmlContent,
    })

    return NextResponse.json({ success: true, message: 'Reply sent successfully' })

  } catch (error) {
    console.error('Failed to send email reply:', error)
    return NextResponse.json(
      { error: 'Failed to send reply. Please check email configuration.' },
      { status: 500 }
    )
  }
}
