// Variable temporal para guardar el mensaje
let mensajeGuardado = null;

const handler = async (m, { conn, args, command }) => {
  if (command === 'guardar') {
    if (!m.quoted) return m.reply('❌ Responde al mensaje que quieres guardar.');
    mensajeGuardado = m.quoted;
    return m.reply('✅ Mensaje guardado.');
  }

  if (command === 'reenviar') {
    if (!mensajeGuardado) return m.reply('❌ No hay ningún mensaje guardado.');
    // reenviar el mensaje guardado al mismo chat
    let content = await generateWAMessageFromContent(m.chat, mensajeGuardado.message, {});
    conn.relayMessage(m.chat, content.message, { messageId: content.key.id });
  }
};

handler.command = ['guardar', 'reenviar'];
export default handler;