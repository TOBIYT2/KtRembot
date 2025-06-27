let handler = async (m, { conn }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'; // 🔁 Reemplaza con el número del owner, con @s.whatsapp.net

  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) {
    return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el número del bot.', m);
  }

  let tag = '@' + sender.split('@')[0]; // Mención al usuario

  let menu = `
¡𝗛ola! ${tag}
Soy Zorro-Bot 🦊
    
╭ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩♡
┊ *👑⃨፝⃕✰INFO - BOT👑⃨፝⃕✰*
┊
┊  🔥 *Trabas disponibles* 🔥
┊ 
┊❧️ .canal <Enlace de grupo>
┊❧️ .ubicacion2 Título.n
┊❧️ .ios2 <numero>
┊❧️ .doc2 <enlace>|<nombre>.n
┊❧️ .convite2 <enlace>|<nombre>.n
┊❧️ .canal2 <enlace>|<nombre>|n
┊❧️ .code (para ser sudbot)
┊❧️ .crash-iu <enlace del grupo>
┊❧️ .crash-iu2 <enlace del grupo>
┊❧️ .webpage Título.n|Descripción.n
┊❧️ .destrabar <enlace del grupo>
╰꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡
`.trim();

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/px6z4y.jpg' },
    caption: menu,
    mentions: [sender]
  }, { quoted: m });

  await conn.sendMessage(m.chat, {
    audio: { url: 'https://files.catbox.moe/4c2kje.mp3' },
    mimetype: 'audio/mp4',
    ptt: true
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'ayuda', 'help'];
handler.group = false;

export default handler;