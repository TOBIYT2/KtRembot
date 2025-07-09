let handler = async (m, { conn }) => {
  const ownerNumber = '527447800928@s.whatsapp.net'; // 🔁 Reemplaza con el número del owner

  const botNumber = conn.user?.jid || '';
  const sender = m.sender;

  if (sender !== ownerNumber && sender !== botNumber) {
    return conn.reply(m.chat, '👑 Este comando solo está disponible para el owner y el número del bot.', m);
  }

  let tag = '@' + sender.split('@')[0]; // Mención al usuario

  let menu = `
¡𝗛ola! ${tag}
*Soy Zorro-Bot 🦊*
    
╭ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩♡
┊ *👑⃨፝⃕✰INFO - BOT👑⃨፝⃕✰*
┊
┊  🔥 *Menu de trabas* 🔥
┊ 
┊✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧⋄⋆⋅⋆⋄✧
┊
┊🧪 *Trabas Android para grupo* 🧪
┊
┊❧️ .canal <Enlace de grupo>
┊❧️ .ubicacion2 Título.n
┊❧️ .doc2 <enlace>|<nombre>.n
┊❧️ .convite2 <enlace>|<nombre>.n
┊❧️ .canal2 <enlace>|<nombre>|n
┊❧️ .killgp <enlace del grupo
┊❧️ .crash-iu <enlace del grupo>
┊❧️ .crash-iu2 <enlace del grupo>
┊❧️ .webpage Título.n|Descripción.n
┊❧️ .destrabar <enlace del grupo>
┊
┊💥 *Trabas remotas para Android* 💥
┊
┊❧️ .delay2 <numero>
┊
┊🧨 *Trabas directas para Android* 🧨
┊
┊❧️ .delay (atraso)
┊
┊💣 *Trabas directas para iPhone* 💣
┊
┊❧️ .holi
┊❧️ .hello
┊
┊💫 Comandos extras 💫
┊
┊❧️ .tagall (menciona a todos los del grupo)
┊❧️ .antiblock 
┊❧️ .update (usalo solo cuando se te indique)
╰꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡
`.trim();

  await conn.sendMessage(m.chat, {
    video: { url: 'https://files.catbox.moe/1b6pci.mp4' }, // debe ser corto y sin audio para funcionar como gif
    gifPlayback: true,
    caption: menu,
    mimetype: 'video/mp4',
    mentions: [sender]
  }, { quoted: m });

  await conn.sendMessage(m.chat, {
    audio: { url: 'https://files.catbox.moe/si4nps.mp3' },
    mimetype: 'audio/mp4',
    ptt: true
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'ayuda', 'help'];
handler.group = false;

export default handler;