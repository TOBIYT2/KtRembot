let handler = async (m, { conn, args, text, command }) => {
  if (!args[0] || !args[1]) return m.reply(`📌 Ejemplo:\n${command} https://whatsapp.com/channel/ID/MENSAJE 😂`);

  const url = args[0];
  const emoji = args[1];

  if (!url.includes("https://whatsapp.com/channel/")) return m.reply("❌ Enlace inválido");

  const [_, __, ___, idCanal, idMensaje] = url.split("/");

  if (!idCanal || !idMensaje) return m.reply("⚠️ Formato incorrecto. Asegúrate de que el enlace sea válido");

  const jid = `${idCanal}@newsletter`; // Canal como JID
  const msgId = idMensaje; // ID del mensaje a reaccionar

  try {
    await conn.sendMessage(jid, {
      react: {
        text: emoji,
        key: {
          id: msgId,
          fromMe: false,
          remoteJid: jid
        }
      }
    });

    m.reply(`✅ Reacción ${emoji} enviada al canal ${jid}`);
  } catch (e) {
    console.log('[ERROR EN SPAMREACTCH]', e);
    m.reply('❌ Error al enviar la reacción. Asegúrate de que el bot esté suscrito al canal.');
  }
};

handler.command = ['spamreactch'];
handler.owner = false;
handler.premium = true;
handler.group = false;

export default handler;