let handler = async (m, { conn }) => {
  if (m.sender !== conn.decodeJid(conn.user.id)) return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');

  let images = [
    {
      url: 'https://files.catbox.moe/bg1vvn.jpg',
      caption: '🐱 Gato 1 - Dormido',
      buttons: [{ buttonId: '.info gato1', buttonText: { displayText: 'Ver más 🐾' }, type: 1 }]
    },
    {
      url: 'https://files.catbox.moe/bg1vvn.jpg',
      caption: '🐱 Gato 2 - Curioso',
      buttons: [{ buttonId: '.info gato2', buttonText: { displayText: 'Ver más 🐾' }, type: 1 }]
    },
    {
      url: 'https://files.catbox.moe/bg1vvn.jpg',
      caption: '🐱 Gato 3 - Travieso',
      buttons: [{ buttonId: '.info gato3', buttonText: { displayText: 'Ver más 🐾' }, type: 1 }]
    }
  ];

  for (let img of images) {
    await conn.sendMessage(m.chat, {
      image: { url: img.url },
      caption: img.caption,
      buttons: img.buttons,
      footer: '🐈 Carrusel de gatos',
      headerType: 4
    }, { quoted: m });
    await new Promise(resolve => setTimeout(resolve, 500)); // Pequeña pausa entre imágenes
  }
};

handler.help = ['carruselcat'];
handler.tags = ['bot'];
handler.command = /^carruselcat$/i;

export default handler;