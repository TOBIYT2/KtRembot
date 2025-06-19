let handler = async (m, { conn, text, usedPrefix, command }) => {
  // Número del contacto (sin @ ni espacios)
  const number = '521234567890'; 
  const name = 'Tobi El Zorro 🦊'; // Nombre del contacto

  const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL;type=CELL;type=VOICE;waid=${number}:${number}
END:VCARD
  `.trim();

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: name,
      contacts: [{ vcard }]
    }
  }, { quoted: m });
};

handler.command = /^contacto$/i;
export default handler;