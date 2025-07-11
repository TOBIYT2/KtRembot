import fs from 'fs';

const FILE_PATH = './mensajes_multi.json';
const CONFIG_PATH = './config_guardado.json';

// Cargar mensajes guardados
let mensajesGuardados = fs.existsSync(FILE_PATH)
  ? JSON.parse(fs.readFileSync(FILE_PATH))
  : [];

// Cargar estado de guardado (on/off)
let estadoGuardado = fs.existsSync(CONFIG_PATH)
  ? JSON.parse(fs.readFileSync(CONFIG_PATH)).guardar
  : false;

// Guardar mensajes en archivo
function guardarMensajes() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(mensajesGuardados, null, 2));
}

// Guardar configuración
function guardarConfig() {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ guardar: estadoGuardado }, null, 2));
}

let handler = async (m, { conn, command, args, isCmd }) => {
  // Si es un comando relacionado con 'guardar'
  if (command === 'guardar') {
    const arg = args[0]?.toLowerCase();

    if (arg === 'on') {
      estadoGuardado = true;
      guardarConfig();
      return m.reply('✅ Guardado automático ACTIVADO.');
    } else if (arg === 'off') {
      estadoGuardado = false;
      guardarConfig();
      return m.reply('❌ Guardado automático DESACTIVADO.');
    } else {
      return m.reply('⚙️ Usa `.guardar on` o `.guardar off`');
    }
  }

  // Si el guardado está activado y no es comando
  if (estadoGuardado && !isCmd && m.message) {
    mensajesGuardados.push(m);
    guardarMensajes();
  }

  // Comando para reenviar todos los mensajes
  if (command === 'reenviar') {
    if (mensajesGuardados.length === 0) return m.reply('❌ No hay mensajes guardados.');
    for (const mensaje of mensajesGuardados) {
      try {
        await conn.copyNForward(m.chat, mensaje);
      } catch (e) {
        console.error('❌ Error al reenviar:', e);
      }
    }
    return m.reply('✅ Todos los mensajes fueron reenviados.');
  }

  // Descargar archivo JSON
  if (command === 'descargarmsg') {
    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensajes guardados.');
    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(FILE_PATH),
      fileName: 'mensajes_multi.json',
      mimetype: 'application/json'
    }, { quoted: m });
  }
};

handler.command = ['guardar', 'reenviar', 'descargarmsg'];
export default handler;