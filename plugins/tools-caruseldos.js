import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

async function carouselVisible(conn, jid) {
  const cards = [];

  for (let i = 0; i < 10; i++) {
    cards.push({
      body: { text: `🌟 Producto ${i + 1}\nHaz clic para más info.` },
      footer: { text: "🔥 Oferta por tiempo limitado" },
      header: {
        title: `🛒 Promo #${i + 1}`,
        hasMediaAttachment: true,
        imageMessage: {
          url: "https://www.kindacode.com/wp-content/uploads/2021/01/test.jpg",
          mimetype: "image/jpeg"
        }
      },
      nativeFlowMessage: { buttons: [] }
    });
  }

  const msg = generateWAMessageFromContent(jid, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {
          deviceListMetadata: {},
          deviceListMetadataVersion: 2
        },
        interactiveMessage: {
          body: { text: "🧃 Desliza para ver promociones exclusivas" },
          footer: { text: "CrowBot Carousel" },
          header: { hasMediaAttachment: false },
          carouselMessage: { cards }
        }
      }
    }
  }, {});

  await conn.relayMessage(jid, msg.message, {
    messageId: msg.key.id
  });

  console.log("✅ Carrusel visible enviado correctamente");
}

let handler = async (m, { conn, args, command }) => {
  let target = args[0];
  if (!target) return m.reply(`📌 Uso: .${command} número o JID`);

  if (!target.includes('@')) {
    target = target.replace(/\D/g, '') + '@s.whatsapp.net';
  }

  try {
    await carouselVisible(conn, target);
    m.reply('✅ Carrusel visible enviado.');
  } catch (e) {
    console.error("❌ Error:", e);
    m.reply('❌ Error enviando carrusel:\n' + (e.message || e));
  }
};

handler.command = /^carousel-nuke$/i;
export default handler;