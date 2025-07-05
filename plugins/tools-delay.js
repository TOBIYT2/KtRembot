let handler = async (m, { conn, args }) => {
  if (!args[0]) return await conn.sendMessage(m.chat, { text: '❗️Uso: .delay <número>' }, { quoted: m });

  const number = args[0].replace(/[^0-9]/g, "");
  const jid = number + '@s.whatsapp.net';

  await conn.sendMessage(m.chat, { text: `Recibido el número: ${number}` }, { quoted: m });

  // Aquí pondrías la función delay (simplificada para testear)
};

handler.command = ['delay'];
handler.owner = false; // cualquiera puede usarlo
module.exports = handler;