import fs from 'fs';

const FILE_PATH = './mensajes_multi.json';
const CONFIG_PATH = './config_guardado.json';

// Cargar mensajes guardados
let mensajesGuardados = fs.existsSync(FILE_PATH)
  ? JSON.parse(fs.readFileSync(FILE_PATH))
  : [];

// Cargar estado del guardado
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

// 🔵 Este handler responde a COMANDOS
let handler = async (m, { conn, command, args }) => {
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

  if (command === 'reenviar') {
    if (!mensajesGuardados.length) return m.reply('❌ No hay mensajes guardados.');
    for (const msg of mensajesGuardados) {
      try {
        await conn.copyNForward(m.chat, msg);
      } catch (e) {
        console.error('❌ Error al reenviar:', e);
      }
    }
    return m.reply('✅ Mensajes reenviados.');
  }

  if (command === 'descargarmsg') {
    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensajes guardados.');
    await conn.sendMessage(m.chat, {
      document: fs.readFileSync(FILE_PATH),
      fileName: 'mensajes_multi.json',
      mimetype: 'application/json'
    }, { quoted: m });
    return;
  }

  if (command === 'limpiarmensajes') {
    mensajesGuardados = [];
    guardarMensajes();
    return m.reply('🧹 Archivo limpiado.');
  }
};
handler.command = ['guardar', 'reenviar', 'descargarmsg', 'limpiarmensajes'];

// 🟢 Este handler captura TODOS los mensajes
handler.all = async function (m) {
  if (
    estadoGuardado &&
    !m.key.fromMe &&
    m.message
  ) {
    const jsonMsg = m.toJSON();
    mensajesGuardados.push(jsonMsg);
    guardarMensajes();
  }
};

export default handler;