import { generateWAMessageFromContent, getContentType } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, usedPrefix, command }) => {
  // 🔓 Para que cualquiera lo pueda usar
  if (!args[0]) return m.reply(`Usa el comando así:\n\n${usedPrefix + command} <link del grupo>\n\nEjemplo:\n${usedPrefix + command} https://chat.whatsapp.com/LvZcbvreV9lBfE1XtwQsUF`);

  // Extraer ID del grupo desde el link
  let groupLinkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;
  let match = args[0].match(groupLinkRegex);
  if (!match) return m.reply('❌ Link de grupo inválido.');

  let groupCode = match[1];

  // Unirse al grupo
  let res = await conn.groupAcceptInvite(groupCode).catch(e => {});
  let isTarget = `${res}@g.us`;

  // Ejecutar la función de carrusel (versión simplificada aquí)
  await carouselNew(isTarget, conn);

  m.reply('✅ Carrusel enviado al grupo.');
};

handler.command = /^carousel-nuke$/i;
export default handler;

// 🧠 Función que envía el carrusel (puedes reemplazar por tu versión completa)
async function carouselNew(isTarget, conn) {
  const push = [];
  for (let i = 0; i < 5; i++) {
    push.push({
      body: { text: `🔥 Oferta especial ${i + 1}` },
      footer: { text: 'Desliza para más →' },
      header: {
        title: `Producto ${i + 1}`,
        hasMediaAttachment: true,
        imageMessage: {
          url: 'https://placekitten.com/400/400',
          mimetype: 'image/jpeg',
          jpegThumbnail: null
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
          body: { text: "🛍️ ¡Explora nuestras promos!" },
          footer: { text: "🔄 Carrusel promocional" },
          header: { hasMediaAttachment: false },
          carouselMessage: {
            cards: push
          }
        }
      }
    }
  }, {});

  await conn.relayMessage(isTarget, carousel.message, { messageId: carousel.key.id });
}