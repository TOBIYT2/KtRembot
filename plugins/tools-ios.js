import fs from 'fs';
import { generateForwardMessageContent, generateWAMessageFromContent } from '@whiskeysockets/baileys';

const FILE_PATH = './mensajes_guardados.json';

let handler = async (m, { conn, command }) => {
  if (command === 'enviarmsg') {
    if (!fs.existsSync(FILE_PATH)) {
      return m.reply('❌ No hay mensaje guardado.');
    }

    try {
      const rawMsg = JSON.parse(fs.readFileSync(FILE_PATH));
      if (!rawMsg.message) {
        return m.reply('❌ El archivo está dañado o incompleto.');
      }

      // reconstruye como forward
      const forwardContent = await generateForwardMessageContent(rawMsg, false);
      const content = await generateWAMessageFromContent(m.chat, forwardContent.message, {
        userJid: conn.user.id,
        quoted: m
      });

      await conn.relayMessage(m.chat, content.message, { messageId: content.key.id });
      await m.reply('✅ Mensaje reenviado desde el archivo.');

    } catch (e) {
      console.error('ERROR enviarmsg:', e);
      m.reply('❌ Error al leer o reenviar el mensaje.');
    }
  }
};

handler.command = ['holi'];
export default handler;