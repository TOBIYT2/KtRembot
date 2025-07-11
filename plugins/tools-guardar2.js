import fs from 'fs';
import path from 'path';

const CONFIG_PATH = './config_guardado.json';
const DIR = './mensajes_guardados';

// Asegurar que exista la carpeta
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);

// Leer estado actual
let estadoGuardado = fs.existsSync(CONFIG_PATH)
  ? JSON.parse(fs.readFileSync(CONFIG_PATH)).guardar
  : false;

// Guardar config
function guardarConfig() {
  fs.writeFileSync(CONFIG_PATH, JSON.stringify({ guardar: estadoGuardado }, null, 2));
}

// Comando handler (comandos directos)
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
    const archivos = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));
    if (!archivos.length) return m.reply('❌ No hay mensajes guardados.');

    for (const archivo of archivos) {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(DIR, archivo)));
        await conn.copyNForward(m.chat, data);
      } catch (e) {
        console.error(`Error reenviando ${archivo}:`, e);
      }
    }
    return m.reply('✅ Mensajes reenviados.');
  }

  if (command === 'limpiarmensajes') {
    const archivos = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));
    for (const archivo of archivos) {
      fs.unlinkSync(path.join(DIR, archivo));
    }
    return m.reply('🧹 Todos los mensajes fueron eliminados.');
  }

  if (command === 'descargarmsg') {
    const archivos = fs.readdirSync(DIR).filter(f => f.endsWith('.json'));
    if (!archivos.length) return m.reply('❌ No hay mensajes guardados.');

    for (const archivo of archivos) {
      await conn.sendMessage(m.chat, {
        document: fs.readFileSync(path.join(DIR, archivo)),
        fileName: archivo,
        mimetype: 'application/json'
      }, { quoted: m });
    }
    return;
  }
};
handler.command = ['guardar', 'reenviar', 'limpiarmensajes', 'descargarmsg'];

// Handler para todos los mensajes entrantes
handler.all = async function (m) {
  if (
    estadoGuardado &&
    !m.key.fromMe &&
    m.message
  ) {
    const json = m.toJSON();
    const filename = `msg-${Date.now()}.json`;
    fs.writeFileSync(path.join(DIR, filename), JSON.stringify(json, null, 2));
  }
};

export default handler;