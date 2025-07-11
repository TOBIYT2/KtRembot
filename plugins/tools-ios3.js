import fs from 'fs';
import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

const FILE_PATH = './invisibleios.json';

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

    // Reenviar mensaje desde el archivo
    const reenviado = await conn.copyNForward(m.chat, mensaje, true);

    // Eliminar localmente solo para el bot
    await conn.sendMessage(conn.user.id, {
      delete: {
        remoteJid: m.chat,
        fromMe: true,
        id: reenviado.key.id,
        participant: conn.user.id
      }
    });

    await conn.sendMessage(m.chat, {
      text: '🐢 El mensaje se envió con éxito'
    }, { quoted: m });

  } catch (e) {
    console.error('[ERROR enviarmsg]:', e);
    return m.reply('❌ Error:\n' + (e.message || e));
  }
};

handler.command = ['nano'];
export default handler;