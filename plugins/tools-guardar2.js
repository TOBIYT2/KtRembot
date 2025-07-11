import fs from 'fs';

const FILE_PATH = './mensajes_multi.json';
const CONFIG_PATH = './config_guardado.json';

// Leer mensajes guardados
let mensajesGuardados = fs.existsSync(FILE_PATH)
  ? JSON.parse(fs.readFileSync(FILE_PATH))
  : [];

// Leer estado actual del guardado
let estadoGuardado = fs.existsSync(CONFIG_PATH)
  ? JSON.parse(fs.readFileSync(CONFIG_PATH)).guardar
  : false;

// Guardar mensajes en el archivo
function guardarMensajes() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(mensajesGuardados, null, 2));
}

// Guardar estado en el archivo
function guardarConfig() {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ guardar: estadoGuardado }, null, 2));
}

let handler = async (m, { conn, command, args, isCmd }) => {
  // Comando para activar o desactivar el guardado
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
      return m.reply('ℹ️ Usa `.guardar on` o `.guardar off`');
    }
  }

  // Comando para reenviar los mensajes guardados
  if (command === 'reenviar') {
    if (!mensajesGuardados.length) return m.reply('❌ No hay mensajes guardados.');
    for (const mensaje of mensajesGuardados) {
      try {
        await conn.copyNForward(m.chat, mensaje);
      } catch (e) {
        console.error('❌ Error al reenviar mensaje:', e);
      }
    }
    return m.reply('✅ Mensajes reenviados correctamente.');
  }

  // Comando para descargar el archivo de mensajes
  if (command === 'descargarmsg') {
    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensajes guardados.');
    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(FILE_PATH),
      fileName: 'mensajes_multi.json',
      mimetype: 'application/json'
    }, { quoted: m });
    return;
  }

  // Comando para limpiar el archivo
  if (command === 'limpiarmensajes') {
    mensajesGuardados = [];
    guardarMensajes();
    return m.reply('🧹 Archivo de mensajes limpiado con éxito.');
  }

  // Guardado automático
  if (estadoGuardado && !isCmd && !m.key.fromMe && m.message) {
    const jsonMsg = m.toJSON(); // 💡 ESTE ES EL PUNTO CLAVE
    mensajesGuardados.push(jsonMsg);
    guardarMensajes();
  }
};

handler.command = ['guardar', 'reenviar', 'descargarmsg', 'limpiarmensajes'];
export default handler;