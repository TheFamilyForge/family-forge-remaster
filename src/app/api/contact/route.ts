// src/app/api/contact/route.ts

import fs from 'fs'
import path from 'path'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  const { name, email, subject, message } = await request.json()

  // load & base64‑encode your logo once per request
  const logoPath = path.join(
    process.cwd(),
    'public',
    'assets',
    'icons',
    'family-forge-logo-black.png'
  )
  const logoBase64 = fs.readFileSync(logoPath).toString('base64')
  const logoSrc = `data:image/png;base64,${logoBase64}`

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
      envelope: {
        from: process.env.SMTP_USER,
        to:   process.env.NOTIFY_EMAIL,
      },
      from:    `"The Family Forge" <${process.env.SMTP_USER}>`,
      to:      process.env.NOTIFY_EMAIL,
      replyTo: `"${name}" <${email}>`,
      subject: `[Family Forge Contact Form] ${subject}`,

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

      html: `
        <div style="text-align:center; padding:1rem 0;">
          <img
            src="${logoSrc}"
            alt="The Family Forge Logo"
            style="width:40px; height:auto; display:block; margin:0 auto 1rem;"
          />
        </div>
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
      // no attachments array here!
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
