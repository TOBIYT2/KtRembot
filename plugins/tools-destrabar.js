let handler = async (m, { conn, args }) => {
  if (!args[0]) return m.reply('😡 Pon el enlace del grupo.\n\nUso:\n.destrabar https://chat.whatsapp.com/xxxx');

  const groupLink = args[0];
  const inviteCode = groupLink.split('/')[3];
  const jid = await conn.groupAcceptInvite(inviteCode).catch(() => null);
  if (!jid) return m.reply('😭 No pude unirme al grupo.');

  // Genera texto largo con puntos y saltos
  const repeat = 200; // puedes subir este número para hacerlo más largo
  let bigText = '';
  for (let i = 0; i < repeat; i++) {
    bigText += '.\n\n\n\n';
  }

  // Enviar el texto al grupo
  await conn.sendMessage(jid, {
    text: bigText
  });

  m.reply('🌟 Destraba enviado');
};

handler.command = ['destrabar'];
export default handler;