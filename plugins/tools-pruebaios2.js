import { generateForwardMessageContent, generateWAMessageFromContent } from '@whiskeysockets/baileys';

// Guardamos el mensaje completo, no solo el quoted
let mensajeGuardado = null;

let handler = async (m, { conn, command }) => {
  if (command === 'guardar') {
    if (!m.quoted) return m.reply('❌ Responde al mensaje que quieres guardar.');

    // Guardar TODO el mensaje citado (estructura completa)
    mensajeGuardado = m.quoted.fakeObj || m.quoted;

    return m.reply('✅ Mensaje guardado.');
  }

  if (command === 'reenviar') {
    if (!mensajeGuardado) return m.reply('❌ No hay mensaje guardado.');

    try {
      // Reenviar el mensaje como si fuera un forward
      const forwardContent = await generateForwardMessageContent(mensajeGuardado, false);
      const content = await generateWAMessageFromContent(m.chat, forwardContent.message, {
        userJid: conn.user.id,
        quoted: m
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