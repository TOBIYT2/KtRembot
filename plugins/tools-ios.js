import fs from 'fs';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn, command }) => {
  if (command === 'enviarmsg') {
    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay archivo guardado.');

    try {
      let mensaje = JSON.parse(fs.readFileSync(FILE_PATH));

      if (!mensaje || !mensaje.message) {
        return m.reply('❌ El archivo existe pero el contenido no es válido.');
      }

      await conn.copyNForward(m.chat, mensaje);
      await m.reply('😼 Ataque enviado con exito');
    } catch (e) {
      console.error('[ERROR enviarmsg]', e);
      m.reply('❌ Error interno al leer o reenviar el mensaje.');
    }
  }
};

handler.command = ['holi'];
export default handler;