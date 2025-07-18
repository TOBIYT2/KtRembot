import { generateWAMessageFromContent } from '@whiskeysockets/baileys';
import fetch from 'node-fetch'; // solo si tu entorno no tiene fetch global

let handler = async (m, { conn }) => {
  if (m.sender !== conn.decodeJid(conn.user.id)) return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');

  const cards = [
    {
      title: '🔥 ATTACK ID GROUP',
      body: 'group-destruct1\ngroup-destruct2\ngroup-destruct3\ngroup-destruct4',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.group-destruct1'
    },
    {
      title: '🚫 CRASH PRIVADO',
      body: 'priv-iu\nscheduled-priv\ncrash-priv1\ncrash-priv2',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.crash-priv1'
    },
    {
      title: '🚫 CRASH PRIVADO',
      body: 'priv-iu\nscheduled-priv\ncrash-priv1\ncrash-priv2',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.crash-priv1'
    },
        {
      title: '🚫 CRASH PRIVADO',
      body: 'priv-iu\nscheduled-priv\ncrash-priv1\ncrash-priv2',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.crash-priv1'
    },
        {
      title: '🚫 CRASH PRIVADO',
      body: 'priv-iu\nscheduled-priv\ncrash-priv1\ncrash-priv2',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.crash-priv1'
    },
        {
      title: '🚫 CRASH PRIVADO',
      body: 'priv-iu\nscheduled-priv\ncrash-priv1\ncrash-priv2',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.crash-priv1'
    },
        {
      title: '🚫 CRASH PRIVADO',
      body: 'priv-iu\nscheduled-priv\ncrash-priv1\ncrash-priv2',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.crash-priv1'
    },
        {
      title: '🚫 CRASH PRIVADO',
      body: 'priv-iu\nscheduled-priv\ncrash-priv1\ncrash-priv2',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.crash-priv1'
    },
        {
      title: '🚫 CRASH PRIVADO',
      body: 'priv-iu\nscheduled-priv\ncrash-priv1\ncrash-priv2',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.crash-priv1'
    }
    // Puedes añadir 8 tarjetas más aquí si esto te funciona
  ];

  for (let card of cards) {
    const res = await fetch(card.image);
    const buffer = await res.buffer();

    const msg = generateWAMessageFromContent(m.chat, {
      templateMessage: {
        hydratedTemplate: {
          imageMessage: {
            image: buffer
          },
          hydratedContentText: `*${card.title}*\n\n${card.body}`,
          hydratedFooterText: '⚙️ BOTZAPP SYSTEM ⚙️',
          hydratedButtons: [
            {
              quickReplyButton: {
                displayText: '💥 Ejecutar',
                id: card.buttonCmd
              }
            }
          ]
        }
      }
    }, { userJid: m.sender, quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    await new Promise(res => setTimeout(res, 300));
  }
};

handler.command = /^carruselcat$/i;
export default handler;