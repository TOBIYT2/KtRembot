import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

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
      title: '⚡ ATAQUE MASIVO',
      body: 'mass-attack1\nmass-attack2\nmass-attack3',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.mass-attack1'
    },
    {
      title: '👻 GHOST MODE',
      body: 'ghost-on\nghost-off',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.ghost-on'
    },
    {
      title: '📦 ENCRYPTED FLOOD',
      body: 'enc-flood1\nenc-flood2',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.enc-flood1'
    },
    {
      title: '🧠 MENTELOOP',
      body: 'loop-start\nloop-stop',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.loop-start'
    },
    {
      title: '💣 OVERLOAD',
      body: 'overload-test\nsafe-overload',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.overload-test'
    },
    {
      title: '🔐 ANTI-BAN',
      body: 'antiban-enable\nantiban-status',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.antiban-enable'
    },
    {
      title: '🎭 CAMUFLAJE',
      body: 'fake-disconnect\nstealth-mode',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.stealth-mode'
    },
    {
      title: '🧪 EXPERIMENTAL',
      body: 'beta-module1\nbeta-module2',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      buttonCmd: '.beta-module1'
    }
  ];

  for (let card of cards) {
    const thumbnailBuffer = (await conn.getFile(card.image)).data;

    const msg = generateWAMessageFromContent(m.chat, {
      templateMessage: {
        hydratedTemplate: {
          imageMessage: {
            jpegThumbnail: thumbnailBuffer
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
    await new Promise(res => setTimeout(res, 300)); // Pausa visual entre tarjetas
  }
};

handler.command = /^carruselcat$/i;
export default handler;