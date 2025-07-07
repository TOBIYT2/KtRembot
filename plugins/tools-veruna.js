let handler = async (m, { conn, args, command }) => {
  if (!args[0] || !args[1]) return m.reply(`📌 Ejemplo:\n${command} https://whatsapp.com/channel/ID/MENSAJE 😭`);

  const url = args[0];
  const emoji = args[1];

  if (!url.includes("https://whatsapp.com/channel/")) return m.reply("❌ Enlace inválido");

  const [_, __, ___, channelId, messageId] = url.split("/");

  if (!channelId || !messageId) return m.reply("⚠️ Formato incorrecto. Asegúrate de que el enlace sea válido");

  const jid = `${channelId}@newsletter`;

  try {
    // Intentar cargar el mensaje del canal
    const messages = await conn.fetchMessagesFromWA(jid, 50); // últimos 50 mensajes
    const msg = messages.find(m => m.key.id === messageId);

    if (!msg) return m.reply("❌ No se encontró el mensaje dentro del canal. Puede que ya esté fuera de rango o eliminado.");

    await conn.sendMessage(jid, {
      react: {
        text: emoji,
        key: msg.key
      }
    });

    m.reply(`✅ Reacción ${emoji} enviada al mensaje ${messageId} del canal.`);
  } catch (e) {
    console.error('[ERROR EN SPAMREACTCH]', e);
    m.reply('❌ No se pudo reaccionar. Asegúrate de que el bot esté suscrito al canal y que el mensaje exista.');
  }
};

handler.command = ['spamreactch'];
handler.owner = false;
handler.premium = true;
handler.group = false;

export default handler;
