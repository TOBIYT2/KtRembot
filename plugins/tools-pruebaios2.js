import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const FILE_PATH = './mensajes_guardados.json';

// Cargar si existe, si no crear
let mensajeGuardado = fs.existsSync(FILE_PATH)
  ? JSON.parse(fs.readFileSync(FILE_PATH))
  : null;

let handler = async (m, { conn, command }) => {
  if (command === 'guardar') {
    if (!m.quoted) return m.reply('❌ Responde al mensaje que quieres guardar.');

    let msg = m.quoted.fakeObj || m.quoted;

    // Guardar el mensaje en memoria
    mensajeGuardado = msg;

    // Guardar en archivo
    fs.writeFileSync(FILE_PATH, JSON.stringify(mensajeGuardado, null, 2));

    return m.reply('✅ Mensaje guardado permanentemente.');
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