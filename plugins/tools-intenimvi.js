let handler = async (m, { conn }) => {
  try {
    const nullChar = '\u0000';

    const nullRepeatEstado = 3; // Estado: solo nulls
    const nullRepeatVideo = 6;  // Video: Tobi + nulls

    const fakeNameEstado = nullChar.repeat(nullRepeatEstado);
    const fakeNameVideo = 'Tobi' + nullChar.repeat(nullRepeatVideo);

    // URL de prueba real de Catbox
    const videoUrl = 'https://files.catbox.moe/cs2psi.mp4'; // asegúrate de que esté online

    // Estado falso con caracteres nulos
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

    // Video con texto Tobi + nulls
    await conn.sendMessage(m.chat, {
      video: { url: videoUrl },
      caption: fakeNameVideo,
      gifPlayback: false,
      fileName: fakeNameVideo
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR EN fakestatus3]', e);
    await m.reply('❌ Ocurrió un error al enviar el estado o video.');
  }
};

handler.command = ['fakestatus3'];
handler.help = ['fakestatus3'];
handler.tags = ['test'];
handler.private = false;
handler.register = true;

export default handler;