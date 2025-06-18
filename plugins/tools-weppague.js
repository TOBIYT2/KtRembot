import fetch from 'node-fetch'; 

let handler = async (m, { conn, text }) => {
  if (!text || !text.includes('|')) {
    return m.reply('Uso correcto: .webpage Título.Numero|Descripción.Numero');
  }

  try {
    const [tituloRaw, descripcionRaw] = text.split('|');

    const [tituloTexto, tituloVeces] = tituloRaw.split('.');
    const [descTexto, descVeces] = descripcionRaw.split('.');

    const titulo = (tituloTexto + ' ').repeat(parseInt(tituloVeces)).trim();
    const descripcion = (descTexto + ' ').repeat(parseInt(descVeces)).trim();

    const url = 'https://www.xvideos.com'; // 

    await conn.relayMessage(m.chat, {
      extendedTextMessage: {
        text: `🦊 • ${tituloTexto} • 🦊\n\n> ©${titulo}\n${url}`,
        matchedText: url,
        canonicalUrl: url,
        description: descripcion,
        title: titulo,
        previewType: 'NONE',
        inviteLinkGroupTypeV2: 'DEFAULT',
      },
    }, {});

    await conn.relayMessage(m.chat, {
      extendedTextMessage: {
        text: `😼 Mensaje para bromear generado con exito`
      }
    }, {});
  } catch (e) {
    console.error(e);
    m.reply('Ocurrió un error al procesar el mensaje. Hazlo bien 🫠');
  }
};

handler.help = ['webpage'];
handler.tags = ['fun'];
handler.command = ['webpage'];
handler.group = false;
handler.owner = false;

export default handler;