import fs from 'fs';

const FILE_PATH = './mensajes_guardados.json';

let mensajeGuardado = fs.existsSync(FILE_PATH)
  ? JSON.parse(fs.readFileSync(FILE_PATH))
  : null;

let handler = async (m, { conn, command }) => {
  switch (command) {
    case 'guardar':
      if (!m.quoted) return m.reply('❌ Responde al mensaje que quieres guardar.');

      let msg = m.quoted.fakeObj || m.quoted;

      mensajeGuardado = msg;

      fs.writeFileSync(FILE_PATH, JSON.stringify(mensajeGuardado, null, 2));

      return m.reply('✅ Mensaje guardado permanentemente.');
    
    case 'reenviar':
      if (!mensajeGuardado) return m.reply('❌ No hay mensaje guardado.');
      try {
        await conn.copyNForward(m.chat, mensajeGuardado);
      } catch (e) {
        console.error(e);
        m.reply('❌ Error al reenviar el mensaje.');
      }
      break;

    case 'descargarmsg':
      if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay archivo guardado.');
      await conn.sendMessage(m.chat, {
        document: fs.readFileSync(FILE_PATH),
        fileName: 'mensaje_guardado.json',
        mimetype: 'application/json'
      }, { quoted: m });
      break;
  }
};

handler.command = ['guardar', 'reenviar', 'descargarmsg'];
export default handler;