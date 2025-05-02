// src/app/api/contact/route.ts

import { NextResponse } from 'next/server'
import * as nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json()

  // create a transporter using your SMTP settings
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    // send the email
    await transporter.sendMail({
      from: `"Family Forge Notifications" <${process.env.SMTP_USER}>`,
      to:   process.env.NOTIFY_EMAIL,
      subject: `[Family Forge Contact Form] ${subject} (from ${email})`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
      replyTo: email,   // replies go back to the customer
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Mail error:', err)
    return NextResponse.json(
      { ok: false, error: 'Failed to send email.' },
      { status: 500 }
    )
  }
}
