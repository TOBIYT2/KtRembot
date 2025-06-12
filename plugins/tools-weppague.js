import fetch from 'node-fetch'; // aún no se usa, pero lo dejamos

let handler = async (m, { conn, text }) => {
  // Validación básica
  if (!text || !text.includes('|')) {
    return m.reply('Uso correcto: .webpage Título.Numero|Descripción.Numero');
  }

  try {
    const [tituloRaw, descripcionRaw] = text.split('|');

    // Separar texto y número (ej: Tobi.12)
    const [tituloTexto, tituloVeces] = tituloRaw.split('.');
    const [descTexto, descVeces] = descripcionRaw.split('.');

    // Repetir texto según el número indicado
    const titulo = (tituloTexto + ' ').repeat(parseInt(tituloVeces)).trim();
    const descripcion = (descTexto + ' ').repeat(parseInt(descVeces)).trim();

    const url = 'https://www.xvideos.com'; // o cualquier URL

    await conn.relayMessage(m.chat, {
      extendedTextMessage: {
        text: `🎗 • ${tituloTexto} • 🎗\n\n> ©${titulo}\n${url}`,
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
        text: `✅ Mensaje generado con título y descripción repetidos correctamente.`
      }
    }, {});
  } catch (e) {
    console.error(e);
    m.reply('Ocurrió un error al procesar el mensaje. Asegúrate de usar el formato correcto: .webpage Titulo.Numero|Descripcion.Numero');
  }
};

handler.help = ['webpage'];
handler.tags = ['fun'];
handler.command = ['webpage'];
handler.group = false;
handler.owner = false;

export default handler;