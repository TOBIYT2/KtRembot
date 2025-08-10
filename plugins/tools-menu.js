import fs from 'fs';
import path from 'path';

// Ruta donde se guardará la imagen del menú
const menuImagePath = path.join(process.cwd(), 'src', 'completado.jpg');

// ======== COMANDO MENU ========
let menuHandler = async (m, { conn }) => {
  const ownerNumber = '527447800928@s.whatsapp.net';
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) return;

  let tag = '@' + sender.split('@')[0];
  let menu = `
¡𝗛ola! ${tag}
*Soy Zorro-Bot 🦊*

... (tu texto de menú aquí) ...
`.trim();

  await conn.sendMessage(m.chat, {
    image: fs.readFileSync(menuImagePath),
    caption: menu,
    mentions: [sender]
  }, { quoted: m });
};

menuHandler.command = ['menu', 'ayuda', 'help'];
export default menuHandler;

