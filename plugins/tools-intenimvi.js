
let handler = async (m, { conn }) => {
  try {
    const nullChar = '\u0000';

    // Cantidad de repeticiones del carácter invisible
    const repeatEstado = 8; // Estado llevará solo \u0000 x8
    const repeatVideo = 6;  // Video llevará "Tobi" + \u0000 x6

    // Nombres falsos
    const fakeNameEstado = nullChar.repeat(repeatEstado);
    const fakeNameVideo = 'Tobi' + nullChar.repeat(repeatVideo);

    // Enlace del video (puedes cambiarlo si lo deseas)
    const videoUrl = 'https://files.catbox.moe/cs2psi.mp4';

    // Enviar mensaje tipo "estado compartido"
    await conn.sendMessage(m.chat, {
      text: `WhatsApp • Status\n📄 ${fakeNameEstado}`,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        externalAdReply: {
          title: fakeNameEstado,
          body: '',
          mediaType: 1,
          previewType: 'NONE'
        }
      }
    }, { quoted: m });

    // Enviar video con nombre personalizado
    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: fakeNameVideo,
      gifPlayback: false,
      fileName: fakeNameVideo
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR EN fakestatus3]', e);
    await m.reply('❌ Error al ejecutar el comando.\n\n' + e.message);
  }
};

handler.command = ['fakestatus3'];
handler.help = ['fakestatus3'];
handler.tags = ['test'];
handler.private = false;
handler.register = true;

export default handler;