import fs from 'fs';

let handler = async (m, { conn, text }) => {
  const ownerNumber = '527447800928@s.whatsapp.net';
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) {
    return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el bot.', m);
  }

  if (!text || !text.includes('whatsapp.com')) {
    return m.reply('😿 Usa: .kill-grupo <enlace del grupo>', m);
  }

  const match = text.match(/chat\.whatsapp\.com\/([\w\d]+)/i);
  if (!match) return m.reply('😡 Enlace inválido.', m);

  const inviteCode = match[1];
  let groupId;

  try {
    groupId = await conn.groupAcceptInvite(inviteCode);
    await conn.sendMessage(m.chat, { text: `✅ Me uní al grupo ${groupId}` }, { quoted: m });
  } catch {
    groupId = `120363${inviteCode}@g.us`;
    await conn.sendMessage(m.chat, { text: `⚠️ Ya estoy en el grupo ${groupId}` }, { quoted: m });
  }

  const FILE_PATH = './stickers.json';
  if (!fs.existsSync(FILE_PATH)) {
    return m.reply('❌ No se encontró el archivo stickers.json', m);
  }

  const mensaje = JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
  if (!mensaje?.message) {
    return m.reply('❌ El archivo está dañado o incompleto', m);
  }

  await conn.sendMessage(m.chat, { text: '🌀 Enviando archivo 10 veces al grupo...' }, { quoted: m });

  const delay = 1000; // 1 segundo

  for (let i = 0; i < 10; i++) {
    try {
      await conn.copyNForward(groupId, mensaje, true);
      console.log(`✅ Archivo reenviado ${i + 1}/10`);
      await new Promise(res => setTimeout(res, delay));
    } catch (e) {
      console.error(`❌ Error al reenviar archivo #${i + 1}:`, e);
    }
  }

  await conn.sendMessage(m.chat, { text: '✅ Archivo enviado 10 veces con éxito.' }, { quoted: m });
};

handler.command = ['attasog'];
handler.tags = ['grupo'];
handler.help = ['attasog <enlace>'];

export default handler;