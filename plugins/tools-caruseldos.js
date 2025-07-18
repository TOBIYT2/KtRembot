import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  if (m.sender !== conn.decodeJid(conn.user.id)) return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');

  const cards = [
    {
      title: '🔴 ATTACK ID GROUP',
      body: `
╭──────────────
│ ⚙️ 𝑩𝑶𝑻𝒁𝑨𝑷𝑷 ⚙️
╰──────────────
╰⊹ group-destruct
╰⊹ group-destruct2
╰⊹ group-destruct3
╰⊹ group-destruct4
      `.trim(),
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonText: '💥 Ejecutar',
      buttonCmd: '.group-destruct'
    },
    {
      title: '🚫 CRASH PRIVADO',
      body: `
╭──────────────
│ ⚙️ 𝑩𝑶𝑻𝒁𝑨𝑷𝑷 ⚙️
╰──────────────
╰⊹ priv-iu
╰⊹ scheduled-priv
╰⊹ crash-priv1
╰⊹ crash-priv2
      `.trim(),
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonText: '💥 Ejecutar',
      buttonCmd: '.crash-priv1'
    }
  ];

  for (let card of cards) {
    const msg = generateWAMessageFromContent(m.chat, {
      templateMessage: {
        hydratedTemplate: {
          imageMessage: {
            jpegThumbnail: (await conn.getFile(card.image)).data
          },
          hydratedContentText: `*${card.title}*\n\n${card.body}`,
          hydratedFooterText: '👾 BOTZAPP ⚙️',
          hydratedButtons: [
            {
              quickReplyButton: {
                displayText: card.buttonText,
                id: card.buttonCmd
              }
            }
          ]
        }
      }
    }, { userJid: m.sender, quoted: m });

    await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
    await new Promise(res => setTimeout(res, 300)); // pausa visual
  }
};

handler.command = /^carruselcat$/i;
export default handler;