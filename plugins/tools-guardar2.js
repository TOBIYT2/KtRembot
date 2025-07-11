import fs from 'fs';

const FILE_PATH = './mensajes_multi.json';
const CONFIG_PATH = './config_guardado.json';

// Cargar mensajes guardados
let mensajesGuardados = fs.existsSync(FILE_PATH)
  ? JSON.parse(fs.readFileSync(FILE_PATH))
  : [];

// Cargar estado del guardado automático
let estadoGuardado = fs.existsSync(CONFIG_PATH)
  ? JSON.parse(fs.readFileSync(CONFIG_PATH)).guardar
  : false;

// Función para guardar los mensajes en archivo
function guardarMensajes() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(mensajesGuardados, null, 2));
}

// Función para guardar el estado del sistema
function guardarConfig() {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ guardar: estadoGuardado }, null, 2));
}

// Handler principal
let handler = async (m, { conn, command, args, isCmd }) => {
  // Comando: activar o desactivar guardado
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

  // Comando: reenviar todos los mensajes guardados
  if (command === 'reenviar') {
    if (!mensajesGuardados.length) return m.reply('❌ No hay mensajes guardados.');
    for (const mensaje of mensajesGuardados) {
      try {
        await conn.copyNForward(m.chat, mensaje);
      } catch (e) {
        console.error('❌ Error al reenviar mensaje:', e);
      }
    }
    return m.reply('✅ Mensajes reenviados.');
  }

  // Comando: descargar archivo JSON de mensajes guardados
  if (command === 'descargarmsg') {
    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensajes guardados.');
    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(FILE_PATH),
      fileName: 'mensajes_multi.json',
      mimetype: 'application/json'
    }, { quoted: m });
    return;
  }

  // Guardado automático solo si está activado y el mensaje viene de otro (no del bot)
  if (estadoGuardado && !isCmd && !m.key.fromMe && m.message) {
    mensajesGuardados.push(m);
    guardarMensajes();
  }
};

handler.command = ['guardar', 'reenviar', 'descargarmsg'];
export default handler;