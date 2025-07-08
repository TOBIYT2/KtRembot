let mensajeGuardado = null;

let handler = async (m, { conn, command }) => {
  if (command === 'guardar') {
    if (!m.quoted) return m.reply('❌ Responde al mensaje que quieres guardar.');
    mensajeGuardado = m.quoted.fakeObj || m.quoted;
    return m.reply('✅ Mensaje guardado.');
  }

  if (command === 'reenviar') {
    if (!mensajeGuardado) return m.reply('❌ No hay mensaje guardado.');
    try {
      await conn.copyNForward(m.chat, mensajeGuardado);
    } catch (e) {
      console.error(e);
      m.reply('❌ Error al reenviar el mensaje.');
    }
  }
};

handler.command = ['guardar', 'reenviar'];
export default handler;