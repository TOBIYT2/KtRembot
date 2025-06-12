import fetch from 'node-fetch'; // solo si necesitas hacer requests, pero no se usa en este caso

let handler = async (m, { conn }) => {
  const url = 'https://www.xvideos.com'; // ⚠️ puedes cambiar este enlace si quieres otro
  const titulo = '𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛 ϟ';
  const descripcion = '𝐓͢𝐝𝐌 𝐢𝐎͢𝐒 𝐕𝟐';

  // Mensaje falso tipo vista previa de página web
  await conn.relayMessage(m.chat, {
    extendedTextMessage: {
      text: `🎗 • 𝐓𝐝𝐌 𝐢𝐎𝐒 • 🎗\n\n> ©𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛 ϟ\n${url}`,
      matchedText: url,
      canonicalUrl: url,
      description: descripcion,
      title: titulo,
      previewType: 'NONE', // Evita preview real
      inviteLinkGroupTypeV2: 'DEFAULT',
    },
  }, {});

  // Mensaje adicional decorativo
  await conn.relayMessage(m.chat, {
    extendedTextMessage: {
      text: `〽️ •𝐓͢𝐝𝐌 𝐢𝐎͢𝐒 𝐕𝟐 • 💤`
    }
  }, {});
};

handler.help = ['webpage'];
handler.tags = ['fun'];
handler.command = ['webpage'];
handler.group = false;
handler.owner = false; // ✅ cualquiera lo puede usar

export default handler;