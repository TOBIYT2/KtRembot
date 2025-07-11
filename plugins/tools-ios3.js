import fs from 'fs';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const FILE_PATH = './invisibleios.json';
const TOTAL_MENSAJES = 200;
const TIEMPO_TOTAL_MS = 5 * 60 * 1000; // 5 minutos
const RETARDO_MS = Math.floor(TIEMPO_TOTAL_MS / TOTAL_MENSAJES); // Tiempo entre cada mensaje

function esperar(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let handler = async (m, { conn }) => {
  try {
    if (m.isGroup) return m.reply('🤧 Este comando no puede usarse en grupos.');

    const normalize = jid => jid.split('@')[0];
    if (normalize(m.sender) !== normalize(conn.user.jid)) {
      return m.reply('👑 Solo el número del bot puede usar este comando.');
    }

    if (!fs.existsSync(FILE_PATH)) return m.reply('❌ No hay mensaje guardado.');

    const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
    if (!mensaje?.message) return m.reply('❌ El archivo está dañado o incompleto.');

    for (let i = 0; i < TOTAL_MENSAJES; i++) {
      const reenviado = await conn.copyNForward(m.chat, mensaje, true);

      // Eliminar el mensaje del bot localmente después de enviarlo
      await conn.sendMessage(conn.user.id, {
        delete: {
          remoteJid: m.chat,
          fromMe: true,
          id: reenviado.key.id,
          participant: conn.user.id
        }
      });

      await esperar(RETARDO_MS);
    }

    await conn.sendMessage(m.chat, {
      text: '✅ El mensaje se envió 200 veces en 5 minutos.'
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR enviarmsg]:', e);
    return m.reply('❌ Error:\n' + (e.message || e));
  }
};

handler.command = ['nano'];
export default handler;