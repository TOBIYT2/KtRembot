let handler = async (m, { conn, participants }) => {
  await new Promise(res => setTimeout(res, 250)); // sleep

  const groupId = m.chat;
  const participantIds = participants.map(p => p.id);

  const mensaje = "\n\n" + participantIds.map(id => "⭐️ • @" + id.split('@')[0]).join("\n");

  await conn.sendMessage(groupId, {
    text: mensaje,
    mentions: participantIds
  });
};

handler.command = ['tagall'];
handler.group = true; // Solo en grupos
handler.rowner = true; // Solo owner del bot
export default handler;