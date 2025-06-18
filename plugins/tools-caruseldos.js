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

    for (let img of listaImagenes) {
      await conn.sendMessage(m.chat, {
        image: { url: img.url },
        caption: img.caption
        // ❌ viewOnce eliminado para permitir compartir
      }, { quoted: m });
    }
  } catch (e) {
    console.error(e);
    m.reply('❌ Error al enviar las imágenes tipo carrusel.');
  }
};

handler.command = ['carrul', 'album', 'wao'];
export default handler;