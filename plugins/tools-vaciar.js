let handler = async (m, { conn, args, command, usedPrefix }) => {
  // Verifica que el mensaje venga del propio bot
  if (m.sender !== conn.user.jid) return;

  if (!args[0]) return m.reply(`😡 Ejemplo de uso:\n\n${usedPrefix + command} https://chat.whatsapp.com/xxxxx`);

  let linkRegex = /chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;
  let match = args[0].match(linkRegex);
  if (!match) return m.reply('❌ Enlace de grupo inválido.');

  let groupCode = match[1];

  try {
    let groupId = await conn.groupAcceptInvite(groupCode);
    let groupMetadata = await conn.groupMetadata(groupId);
    let participants = groupMetadata.participants.map(p => p.id).filter(id => id !== conn.user.jid);

    for (let id of participants) {
      await conn.groupParticipantsUpdate(groupId, [id], 'remove');
      await new Promise(r => setTimeout(r, 1500)); // Delay para evitar baneos
    }

    m.reply(`😼 Se vació el grupo *${groupMetadata.subject}* correctamente.`);

  } catch (e) {
    console.error(e);
    m.reply('❌ Error al vaciar el grupo. ¿El bot es administrador en ese grupo?');
  }
};

handler.command = /^vaciar$/i;
handler.group = false;
handler.private = false;
handler.owner = false;

export default handler;