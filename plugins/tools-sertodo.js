import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
  const OWNER_NUMBER = '34613772401@s.whatsapp.net'; 
  const IMAGE_URL = 'https://files.catbox.moe/b7whtu.jpg'; 

  if (m.sender !== OWNER_NUMBER) {
    return conn.reply(m.chat, '🚫 No tienes permiso para usar este comando.', m);
  }

  try {
    const res = await fetch(IMAGE_URL);
    if (!res.ok) throw new Error('No se pudo descargar la imagen');

    const buffer = await res.buffer();
    await conn.updateProfilePicture(conn.user.jid, buffer);
    conn.reply(m.chat, '😿 Adios bot.', m);
  } catch (e) {
    console.error(e);
    conn.reply(m.chat, '⚠️ Error al actualizar la foto de perfil.', m);
  }
};

handler.help = ['pusha'];
handler.tags = ['owner'];
handler.command = ['pusha', 'karmaja'];
handler.owner = false;
handler.group = false;

export default handler;