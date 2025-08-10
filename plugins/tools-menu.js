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


// ======== COMANDO NEWME ========
let newmeHandler = async (m, { conn }) => {
  const ownerNumber = '527447800928@s.whatsapp.net';
  if (m.sender !== ownerNumber) return m.reply('🚫 Solo el owner puede cambiar la imagen del menú.');

  if (!m.quoted || !/image/.test(m.quoted.mtype))
    return m.reply('📸 Responde a una imagen con el comando *.newme* para actualizar el menú.');

  let media = await m.quoted.download();
  fs.writeFileSync(menuImagePath, media);
  m.reply('✅ Imagen del menú actualizada correctamente.');
};

newmeHandler.command = ['newme'];
export { newmeHandler };