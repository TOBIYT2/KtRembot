let handler = async (m, { conn, args }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'; // 🔁 Cambia esto por tu número de owner
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  // Verificación de permisos
  if (sender !== ownerNumber && sender !== botNumber) {
    return m.reply('👑 Este comando solo está disponible para el owner y el número del bot.', m);
  }

  if (!args[0]) return m.reply('😡 Pon el enlace del grupo.\n\nUso:\n.destrabar https://chat.whatsapp.com/xxxx');

  const groupLink = args[0];
  const inviteCode = groupLink.split('/')[3];
  const jid = await conn.groupAcceptInvite(inviteCode).catch(() => null);
  if (!jid) return m.reply('😭 No pude unirme al grupo.');

  // Genera texto largo con puntos y saltos
  const repeat = 200; // puedes subir este número para hacerlo más largo
  let bigText = '';
  for (let i = 0; i < repeat; i++) {
    bigText += '🦊\n\n\n\n';
  }

  await conn.sendMessage(jid, {
    text: bigText
  });

  m.reply('🌟 Destraba enviado');
};

handler.command = ['destrabar'];

export default handler;