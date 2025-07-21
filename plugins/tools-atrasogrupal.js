const handler = async (m, { conn, args, usedPrefix, command }) => {
  m.reply('✅ Recibí el comando .togrup');

  // Solo prueba básica por ahora
  if (!args[0]) return m.reply(`Envíame un link de grupo como:\n${usedPrefix + command} <link>`);

  let groupLink = args[0];
  let code = groupLink.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i)?.[1];

  if (!code) return m.reply('❌ Link inválido.');

  try {
    let jid = await conn.groupAcceptInvite(code);
    m.reply('✅ Me uní al grupo: ' + jid);
  } catch (e) {
    console.error(e);
    m.reply('❌ Error: No me pude unir.');
  }
};

handler.command = /^togrup$/i;
handler.group = false;
handler.private = false;

module.exports = handler;