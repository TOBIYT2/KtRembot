import fs from 'fs';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn, command }) => {
  if (command === 'enviarmsg') {
    try {
      if (!fs.existsSync(FILE_PATH)) {
        return m.reply('❌ No hay mensaje guardado (archivo no existe).');
      }

      const rawData = fs.readFileSync(FILE_PATH, 'utf-8');
      const mensaje = JSON.parse(rawData);

      if (!mensaje || typeof mensaje !== 'object' || !mensaje.message) {
        return m.reply('❌ El archivo está corrupto o no contiene un mensaje válido.');
      }

      await conn.copyNForward(m.chat, mensaje);
      await m.reply('✅ Mensaje enviado directamente desde el archivo.');

    } catch (e) {
      console.error('[enviarmsg] ERROR:', e);
      await m.reply('❌ Error al reenviar el mensaje:\n' + e.message);
    }
  }
};

handler.command = ['enviarmsg'];
export default handler;