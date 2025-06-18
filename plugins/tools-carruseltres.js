let handler = async (m, { conn }) => {
  try {
    const listaImagenes = [
      {
        url: 'https://files.catbox.moe/bg1vvn.jpg',
        caption: 'https://files.catbox.moe/bg1vvn.jpg'
      },
      {
        url: 'https://files.catbox.moe/bg1vvn.jpg',
        caption: '🌄 Montaña al amanecer'
      },
      {
        url: 'https://files.catbox.moe/bg1vvn.jpg',
        caption: '🌌 Cielo estrellado de noche'
      }
    ];

    const imagenes = listaImagenes.map(img => ({
      image: { url: img.url },
      caption: img.caption
    }));

    await conn.sendMessage(m.chat, {
      image: imagenes[0].image,
      caption: imagenes[0].caption
    }, { quoted: m });

    for (let i = 1; i < imagenes.length; i++) {
      await conn.sendMessage(m.chat, {
        image: imagenes[i].image,
        caption: imagenes[i].caption
      }, { quoted: null });
    }

  } catch (e) {
    console.error(e);
    m.reply('❌ Error al enviar el carrusel de imágenes.');
  }
};

handler.command = ['carel', 'album', 'wao'];
export default handler;