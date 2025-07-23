import fetch from 'node-fetch';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return conn.reply(
      m.chat,
      `💛 Ingresa un link de YouTube válido\n📌 Ejemplo: ${usedPrefix + command} https://youtu.be/P4LfHsUnNL8`,
      m
    );
  }

  await m.react('🕓');

  try {
    let res = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${text}`);
    let json = await res.json();

    if (!json.status || !json.data?.dl) {
      throw new Error('⚠️ No se pudo obtener el video. Revisa el enlace.');
    }

    let dl_url = json.data.dl;

    await conn.sendMessage(
      m.chat,
      {
        video: { url: dl_url },
        caption: `✅ Video descargado exitosamente.`
      },
      { quoted: m }
    );

    await m.react('✅');
  } catch (error) {
    console.error(error);
    await m.react('❌');
    conn.reply(
      m.chat,
      `✖️ Ocurrió un error. Asegúrate de usar el comando correctamente:\n📌 ${usedPrefix + command} <url>`,
      m
    );
  }
};

handler.help = ['ytmp4 *<url>*'];
handler.tags = ['descargas'];
handler.command = ['ytmp4', 'ytv'];
handler.estrellas = 4;
handler.register = true;

export default handler;
