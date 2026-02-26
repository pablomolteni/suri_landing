import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Faltan campos requeridos' })
  }

  try {
    await resend.emails.send({
      from: 'SURI Contacto <contacto@suri.lat>',
      to: 'pablomolteni+suri@gmail.com',
      reply_to: email,
      subject: `Nuevo mensaje desde suri.lat — ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px; background: #f8f9ff; border-radius: 12px;">
          <img src="https://suri.lat/logo.png" alt="SURI" style="height: 28px; margin-bottom: 24px;" />
          <h2 style="color: #0d0d0d; margin-bottom: 24px;">Nuevo mensaje desde suri.lat</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; width: 120px;">Nombre</td>
              <td style="padding: 10px 0; color: #0d0d0d; font-weight: 600;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #0061FC;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Mensaje</td>
              <td style="padding: 10px 0; color: #0d0d0d; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
          <p style="color: #9ca3af; font-size: 12px; margin: 0;">Este mensaje fue enviado desde el formulario de contacto de suri.lat</p>
        </div>
      `,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Resend error:', error)
    return res.status(500).json({ error: 'Error al enviar el mensaje' })
  }
}
