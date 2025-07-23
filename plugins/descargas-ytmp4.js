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

    console.log('[DEBUG] Respuesta JSON:', json);

    if (!json.status || !json.data?.dl) {
      await conn.reply(m.chat, '⚠️ La API no devolvió un enlace válido.', m);
      throw new Error('Descarga fallida');
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
    console.error('[ERROR] en ytmp4:', error);
    await m.react('❌');
    conn.reply(
      m.chat,
      `✖️ Ocurrió un error al intentar descargar el video.`,
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
