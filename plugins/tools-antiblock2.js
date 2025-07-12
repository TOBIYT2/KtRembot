let handler = async (m, { conn, args, isBot, isOwner }) => {
  if (!isBot && !isOwner) {
    return conn.sendMessage(m.chat, {
      text: `\n ❌ *COMANDO NEGADO, SOLO PUEDE SER USADO POR MI PORTADOR. SI DESEAS ADQUIRIRLO MANDA MENSAJE A: +526421147692*\n`
    }, { quoted: m });
  }

  const link = args[0];
  if (!link || !link.includes('chat.whatsapp.com/')) {
    return m.reply('📎 *Debes proporcionar un enlace de grupo válido.*\n\nEjemplo: *.antiblock2 https://chat.whatsapp.com/xxxxxxxxxxxx*');
  }

  const code = link.split('/').pop().trim();
  let groupJid;

  try {
    // 🔁 Intenta unirse al grupo
    groupJid = await conn.groupAcceptInvite(code);
    await delay(2000); // Espera a que se una correctamente
  } catch (e) {
    // Si ya es miembro, intenta recuperar el JID
    try {
      const info = await conn.groupGetInviteInfo(code);
      groupJid = info.id;
    } catch (err) {
      return m.reply('❌ *No se pudo acceder al grupo. Link inválido o restringido.*');
    }
  }

  const cantidad = 2;
  for (let i = 0; i < cantidad; i++) {
    try {
      await conn.relayMessage(groupJid, {
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

      await delay(100);
    } catch (e) {
      console.error(`[ERROR] Falló intento ${i + 1}:`, e);
    }
  }

  await m.reply(`✅ *Comando ejecutado con éxito en el grupo: ${groupJid}*`);
};

handler.command = ['antiblock2'];
handler.owner = false;
handler.bot = true;

export default handler;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}