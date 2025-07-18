let handler = async (m, { conn }) => {
  if (m.sender !== conn.decodeJid(conn.user.id)) return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');

  const cards = [
    {
      title: '🔥 ATTACK ID GROUP',
      body: 'group-destruct1\ngroup-destruct2\ngroup-destruct3',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      button: '.group-destruct1'
    },
    {
      title: '🚫 CRASH PRIVADO',
      body: 'priv-iu\nscheduled-priv\ncrash-priv1\ncrash-priv2',
      image: 'https://files.catbox.moe/bg1vvn.jpg',
      button: '.crash-priv1'
    }
  ];

  for (let card of cards) {
    await conn.sendMessage(m.chat, {
      image: { url: card.image },
      caption: `*${card.title}*\n\n${card.body}`,
      footer: '⚙ BOTZAPP',
      buttons: [
        { buttonId: card.button, buttonText: { displayText: '💥 Ejecutar' }, type: 1 }
      ],
      headerType: 4
    }, { quoted: m });

    await new Promise(resolve => setTimeout(resolve, 300)); // Pausa corta para simular efecto carrusel
  }
};

handler.command = /^carruselcat$/i;
handler.help = ['carruselcat'];
handler.tags = ['bot'];

export default handler;