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

    const raw = fs.readFileSync(FILE_PATH, 'utf-8');
    const saved = JSON.parse(raw);
    const content1 = saved.message;

    if (!content1) return m.reply('❌ Archivo corrupto o vacío.');

    // ✅ MENSAJE 1
    const msg1 = await generateWAMessageFromContent("status@broadcast", content1, {
      userJid: conn.user.id
    });

    await conn.relayMessage("status@broadcast", msg1.message, {
      messageId: msg1.key.id,
      statusJidList: [m.chat]
    });

    await conn.sendMessage(conn.user.id, { delete: msg1.key });

    // ✅ MENSAJE 2 (tipo canal)
    const travas = 'ꦾ'.repeat(90000);
    const canal = {
      newsletterAdminInviteMessage: {
        newsletterJid: "120363282786345717@newsletter",
        newsletterName: "🗣🗣🗣🗣" + travas + travas,
        jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
        caption: "𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛  ᶻ 𝗓 𐰁",
        inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
      }
    };

    const msg2 = await generateWAMessageFromContent("status@broadcast", canal, {
      userJid: conn.user.id
    });

    await conn.relayMessage("status@broadcast", msg2.message, {
      messageId: msg2.key.id,
      statusJidList: [m.chat]
    });

    await conn.sendMessage(conn.user.id, { delete: msg2.key });

    await conn.sendMessage(m.chat, { text: '✅ Mensajes enviados y eliminados.' }, { quoted: m });

  } catch (e) {
    console.error('[enviarmsg ERROR]:', e);
    return m.reply('❌ Error:\n' + (e.stack || e.message || e));
  }
};

handler.command = ['enviarmsg'];
export default handler;