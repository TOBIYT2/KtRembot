import fs from 'fs';

const FILE_PATH = './mensajes_multi.json';
const CONFIG_PATH = './config_guardado.json';

// Leer mensajes guardados
let mensajesGuardados = fs.existsSync(FILE_PATH)
  ? JSON.parse(fs.readFileSync(FILE_PATH))
  : [];

// Leer estado de guardado
let estadoGuardado = fs.existsSync(CONFIG_PATH)
  ? JSON.parse(fs.readFileSync(CONFIG_PATH)).guardar
  : false;

// Guardar mensajes
function guardarMensajes() {
  fs.writeFileSync(FILE_PATH, JSON.stringify(mensajesGuardados, null, 2));
}

// Guardar configuración
function guardarConfig() {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ guardar: estadoGuardado }, null, 2));
}

let handler = async (m, { conn, command, args, isCmd }) => {
  // Activar/desactivar guardado
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

  // Reenviar todos los mensajes guardados
  if (command === 'reenviar') {
    if (mensajesGuardados.length === 0) return m.reply('❌ No hay mensajes guardados.');

    for (const msg of mensajesGuardados) {
      try {
        await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
      } catch (e) {
        console.error('❌ Error al reenviar:', e);
      }
    }

    return m.reply('✅ Mensajes reenviados.');
  }

  // Descargar el archivo de mensajes
  if (command === 'descargarmsg') {
    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensajes guardados.');

    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(FILE_PATH),
      fileName: 'mensajes_multi.json',
      mimetype: 'application/json'
    }, { quoted: m });

    return;
  }

  // Guardado automático (si está activado)
  if (estadoGuardado && !isCmd && m.key.fromMe === false && m.message) {
    // Guardamos solo el contenido esencial: key + message
    const data = {
      key: {
        remoteJid: m.key.remoteJid,
        fromMe: false,
        id: m.key.id,
        participant: m.participant || m.key.participant || null
      },
      message: m.message
    };

    mensajesGuardados.push(data);
    guardarMensajes();
  }
};

handler.command = ['guardar', 'reenviar', 'descargarmsg'];
export default handler;