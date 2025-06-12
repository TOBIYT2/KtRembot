import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  const IMAGE_URL = 'https://files.catbox.moe/culffa.jpeg';

  let buffer;
  try {
    const res = await fetch(IMAGE_URL);
    if (!res.ok) throw new Error('❌ No se pudo descargar la imagen desde Catbox');
    buffer = await res.buffer();
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, '⚠️ Error al obtener la imagen.', m);
  }

  for (let i = 15; i > 0; i--) {
    await conn.relayMessage(m.chat, {
      viewOnceMessage: {
        message: {
          orderMessage: {
            orderId: '0',
            itemCount: 69,
            status: 'DECLINED',
            surface: 'CATALOG',
            orderTitle: '𝐏.𝐀.ꪶ〽️ꫂ𝐙𝐢𝐧 𝐌𝐚𝐤𝐞𝐫',
            message: '𝐏.𝐀.ꪶ〽️ꫂ𝐙𝐢𝐧 𝐌𝐚𝐤𝐞𝐫 ✨✨',
            orderDescription: 'Carrito con imagen de Catbox 💫',
            thumbnail: buffer,
            token: '1234567890',
            messageVersion: 1,
            buttons: [],
          },
        },
      },
    }, {});
  }
};

handler.help = ['carrito'];
handler.tags = ['fun'];
handler.command = ['carrito'];
handler.group = false;
handler.premium = false;
handler.owner = false;

export default handler;