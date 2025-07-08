import { generateForwardMessageContent, generateWAMessageFromContent } from '@whiskeysockets/baileys';

let mensajeGuardado = null;

let handler = async (m, { conn, command }) => {
  if (command === 'guardar') {
    if (!m.quoted) return m.reply('❌ Responde al mensaje que quieres guardar.');
    mensajeGuardado = m.quoted;
    return m.reply('✅ Mensaje guardado correctamente.');
  }

  if (command === 'reenviar') {
    if (!mensajeGuardado) return m.reply('❌ No hay mensaje guardado.');

    try {
      let fakeJid = mensajeGuardado.chat || m.chat;

      // Prepara el contenido reenviable (viewOnce false también si quieres)
      const forwardContent = await generateForwardMessageContent(mensajeGuardado, false);

      const content = await generateWAMessageFromContent(m.chat, forwardContent.message, {
        userJid: conn.user.id,
        quoted: m,
      });

      await conn.relayMessage(m.chat, content.message, { messageId: content.key.id });
    } catch (e) {
      console.error(e);
      m.reply('❌ Error al reenviar el mensaje.');
    }
  }
};

handler.command = ['guardar', 'reenviar'];
export default handler;