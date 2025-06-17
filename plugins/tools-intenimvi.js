let handler = async (m, { conn }) => {
  try {
    const nullChar = '\u0000';

    // Configuración
    const nullRepeatEstado = 90000; // solo nulls invisibles en estado
    const nullRepeatVideo = 80000;  // Tobi + 6 nulls

    const fakeNameEstado = nullChar.repeat(nullRepeatEstado);           // ␀␀␀
    const fakeNameVideo = 'Tobi' + nullChar.repeat(nullRepeatVideo);    // Tobi␀␀␀␀␀␀

    // URL del video desde Catbox (reemplaza con uno válido tuyo)
    const videoUrl = 'https://files.catbox.moe/cs2psi.mp4';

    // 1️⃣ Enviar estado falso (solo caracteres nulos)
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

    // 2️⃣ Enviar video con texto "Tobi" + nulls invisibles
    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: fakeNameVideo,
      gifPlayback: false,
      fileName: fakeNameVideo
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR EN fakestatus3]', e);
    await m.reply("❌ Hubo un error al enviar el estado o el video.");
  }
};

handler.command = ['fakatu'];
handler.help = ['tools'];
handler.tags = ['faketu'];
handler.private = true;
handler.register = true;
handler.estrellas = 4;

export default handler;