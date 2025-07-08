import fs from 'fs';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn, command }) => {
  if (command === 'enviarmsg') {
    if (!fs.existsSync(FILE_PATH)) return m.reply('😿 Error en el comando.');

    try {
      let mensaje = JSON.parse(fs.readFileSync(FILE_PATH));
      await conn.copyNForward(m.chat, mensaje);
    } catch (e) {
      console.error(e);
      m.reply('❌ Error al enviar el mensaje desde archivo.');
    }
  }
};

handler.command = ['rios'];
export default handler;