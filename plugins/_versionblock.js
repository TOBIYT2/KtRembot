let handler = async (m, { isAdmin, isOwner, isROwner }) => {
  const prefixes = global.prefix instanceof RegExp
    ? global.prefix.source.replace(/[\^\$\.\*\+\?\=\!\:\|\\\/\(\)\[\]\{\}]/g, '')
    : global.prefix;

  const firstChar = m.text?.charAt(0);
  const startsWithPrefix = prefixes.includes(firstChar);

  if (!startsWithPrefix) return;

  const chat = global.db.data.chats[m.chat] || {};
  if (chat.versionadmin) {
    const allowed = isAdmin || isOwner || isROwner;
    if (!allowed) {
      console.log(`[VERSIONBLOCK] Ignorado por modo solo admin: ${m.sender}`);
      return m.reply('🖤 solamente los administradores pueden usar comandos en este momento.');
    }
  }
};

handler.all = true;

export default handler;