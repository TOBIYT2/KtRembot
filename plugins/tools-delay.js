conn.ev.on('messages.upsert', async ({ messages }) => {
  const m = messages[0];
  if (!m.message) return;

  const text = m.message.conversation || m.message.extendedTextMessage?.text;
  if (!text) return;

  if (text.startsWith('.delay')) {
    await conn.sendMessage(m.key.remoteJid, { text: 'Comando delay detectado!' });
  }
});