let handler = async (m, { conn }) => {
  try {
    const imagenes = [
      'https://files.catbox.moe/bg1vvn.jpg',
      'https://files.catbox.moe/bg1vvn.jpg',
      'https://files.catbox.moe/bg1vvn.jpg'
    ];

    for (let i = 0; i < imagenes.length; i++) {
      await conn.sendMessage(m.chat, {
        image: { url: imagenes[i] },
        // caption solo en la primera imagen
        caption: i === 0 ? '🌄 Carrusel de imágenes' : undefined
      });
      await new Promise(resolve => setTimeout(resolve, 300)); // pequeña pausa
    }

  } catch (e) {
    console.error(e);
    m.reply('❌ Error al enviar el carrusel.');
  }
};

handler.command = ['carel', 'album'];
export default handler;