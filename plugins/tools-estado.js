let handler = async (m, { conn }) => {
  try {
    const nullChar = '\u0000'.repeat(8); // Invisible para que sea tipo estado
    const nombreEstado = `Tobi${nullChar}Tobi`; // Nombre repetido con separador invisible
    const texto = `🟢 Este es un mensaje tipo estado compartido`;

    // Enviamos el mensaje tipo estado
    await conn.sendMessage(m.chat, {
      text: texto,
      contextInfo: {
        externalAdReply: {
          title: nombreEstado,
          body: nombreEstado,
          mediaType: 1,
          thumbnailUrl: null,
          renderLargerThumbnail: false,
          showAdAttribution: false,
          sourceUrl: `https://wa.me/`, // Puedes poner cualquier URL válida o dejarla así
        }
      }
    }, { quoted: m });

  } catch (e) {
    m.reply('❌ Error al enviar el estado.');
    console.error(e);
  }
};

handler.command = ['estadofake', 'estadotobi'];
export default handler;