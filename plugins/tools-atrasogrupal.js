let handler = async (m, { conn, args, isBot, isOwner }) => {
  if (!isBot && !isOwner) {
    return conn.sendMessage(m.chat, {
      text: `❌ *COMANDO DENEGADO: Solo puede ser usado por mi portador.*\n\nSi deseas adquirir este bot, contacta a: +526421147692`
    }, { quoted: m });
  }

  const link = args[0];
  if (!link || !link.includes('chat.whatsapp.com/')) {
    return m.reply('📎 *Debes proporcionar un enlace de grupo válido.*\n\nEjemplo: *.togrup https://chat.whatsapp.com/xxxxxxxxxxxx*');
  }

  const code = link.split('/').pop().trim();
  let groupJid;

  try {
    groupJid = await conn.groupAcceptInvite(code);
    await delay(1500);
    await m.reply(`✅ *Se unió correctamente al grupo: ${groupJid}*`);
  } catch (e) {
    return m.reply('❌ *No se pudo unir al grupo. Link inválido, expulsado o el bot ya es miembro.*');
  }
};

handler.command = ['togrup'];
handler.owner = false;
handler.bot = true;

export default handler;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}