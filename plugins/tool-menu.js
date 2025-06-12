let handler = async (m, { conn }) => {
  let tag = '@' + m.sender.split('@')[0]; // Menciona al usuario

  let menu = `
¡𝗛ola! ${tag}
Soy Zorro-Bot 🦊
    
╭ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩♡
┊ *👑⃨፝⃕✰INFO - BOT👑⃨፝⃕✰*
┊   😼 *Cliente:* ${tag}
┊
┊  🔥 *Trabas disponibles* 🔥
┊ 
┊❧️ .canal <Enlace de grupo>
┊❧️ .ubicacion2 Título.n
┊❧️ .ios <numero>
┊❧️ .doc2 <enlace>|<nombre>.n
┊❧️ .convite2 <enlace>|<nombre>.n
┊❧️ .canal2 <enlace>|<nombre>|n
┊❧️ .code (para ser sudbot)
╰꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡꒰⁠⑅⁠ᵕ⁠༚⁠ᵕ⁠꒱⁠˖⁠♡
`.trim();

  await conn.sendMessage(m.chat, { text: menu, mentions: [m.sender] }, { quoted: m });
};

handler.help = ['menu'];
handler.tags = ['info'];
handler.command = ['menu', 'ayuda', 'help'];
handler.group = false;

export default handler;