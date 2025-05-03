// src/app/api/contact/route.ts

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json()

  const transporter = nodemailer.createTransport({
    host:   process.env.SMTP_HOST,
    port:   Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  try {
    await transporter.sendMail({
      // 1) Envelope for proper SPF/DKIM
      envelope: {
        from: process.env.SMTP_USER,
        to:   process.env.NOTIFY_EMAIL,
      },

      // 2) From/To/Reply‑To/Subject
      from:    `"The Family Forge" <${process.env.SMTP_USER}>`,
      to:      process.env.NOTIFY_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: `[Family Forge Contact Form] ${subject}`,

      // 3) Plain‑text fallback
      text: [
        'You’ve received a new message via your website contact form:',
        '–––––––––––––––––––––––––––––––––––––––––––––––',
        `From: ${name} <${email}>`,
        '',
        message || '<no message provided>',
        '',
        '–––––––––––––––––––––––––––––––––––––––––––––––',
        'This notification was sent by The Family Forge.'
      ].join('\n'),

      // 4) HTML body (no logo/image)
      html: `
        <h2>You’ve received a new message via your website contact form:</h2>
        <hr/>
        <p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
        <div style="margin:1em 0; padding:1em; background:#f9f9f9; border-radius:4px;">
          ${message.replace(/\n/g, '<br/>') || '<i>No message provided</i>'}
        </div>
        <hr/>
        <p style="font-size:0.9em; color:#666;">
          This notification was sent by The Family Forge.
        </p>
      `,
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
