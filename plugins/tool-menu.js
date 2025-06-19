let handler = async (m, { conn }) => {
  let tag = '@' + m.sender.split('@')[0]; // Mención al usuario

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

  // Envía imagen con el texto del menú como descripción (caption)
  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/px6z4y.jpg' }, // 🔁 Pon tu link de imagen Catbox
    caption: menu,
    mentions: [m.sender]
  }, { quoted: m });

  // Envía audio como nota de voz
  await conn.sendMessage(m.chat, {
    audio: { url: 'https://files.catbox.moe/4c2kje.mp3' }, // 🔁 Pon tu link de audio Catbox
    mimetype: 'audio/mp4', // usa 'audio/mpeg' si es .mp3
    ptt: true
  }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'ayuda', 'help'];
handler.group = false;

export default handler;