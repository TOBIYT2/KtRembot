import fs from 'fs';
import path from 'path';

// Ruta donde se guardará la imagen del menú
const menuImagePath = path.join(process.cwd(), 'src', 'completado.jpg');

let newmeHandler = async (m, { conn, participants, isAdmin, isBotAdmin }) => {
  const botNumber = conn.user?.jid || '';

  // Permitir solo si es el bot o un admin del grupo
  const senderIsBot = m.sender === botNumber;
  const senderIsAdmin = isAdmin; // viene del contexto del mensaje

  if (!senderIsBot && !senderIsAdmin) {
    return m.reply('🚫 Solo los administradores del grupo o el bot pueden cambiar la imagen del menú.');
  }

  if (!m.quoted || !/image/.test(m.quoted.mtype)) {
    return m.reply('📸 Responde a una imagen con el comando *.newme* para actualizar el menú.');
  }

  let media = await m.quoted.download();
  fs.writeFileSync(menuImagePath, media);
  m.reply('✅ Imagen del menú actualizada correctamente.');
};

newmeHandler.command = ['newme'];

export default newmeHandler;