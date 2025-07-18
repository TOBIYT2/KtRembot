import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, usedPrefix, command }) => {
  // Solo dejar al número vinculado
  if (m.sender !== conn.decodeJid(conn.user.id)) return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');

  // Mensaje informativo inicial
  await m.reply('🧪 Enviando carrusel con imágenes desde Catbox...');

  // Construimos los items del carrusel
  const sections = [
    {
      title: '✨ Opciones destacadas',
      rows: [
        {
          title: '🐱 Gato 1',
          description: 'Gato dormido bonito',
          rowId: `${usedPrefix}info gato1`
        },
        {
          title: '🐱 Gato 2',
          description: 'Gato en la ventana',
          rowId: `${usedPrefix}info gato2`
        },
        {
          title: '🐱 Gato 3',
          description: 'Gato travieso',
          rowId: `${usedPrefix}info gato3`
        }
      ]
    }
  ];

  // Imagen principal desde Catbox
  const catboxImageUrl = 'https://files.catbox.moe/bg1vvn.jpg'; // Reemplaza con tu imagen

  // Creamos el mensaje tipo "listMessage" (simula carrusel)
  const listMessage = {
    text: '🐾 Bienvenido al carrusel de gatos:',
    footer: 'Selecciona una opción para ver más 🐈',
    title: '📸 Carrusel de Catbox',
    buttonText: 'Ver opciones',
    sections
  };

  const msg = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {},
        imageMessage: {
          mimetype: 'image/jpeg',
          caption: '🌟 Carrusel con imagen desde Catbox',
          jpegThumbnail: null,
          url: catboxImageUrl
        }
      }
    }
  }, {});

  // Enviamos primero la imagen como viewOnce
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

  // Luego enviamos el mensaje tipo lista
  await conn.sendMessage(m.chat, listMessage, { quoted: m });
};

handler.help = ['carruselcat'];
handler.tags = ['test'];
handler.command = /^carruselcat$/i;

export default handler;