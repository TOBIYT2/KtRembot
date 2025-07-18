let handler = async (m, { conn }) => {
  if (m.sender !== conn.decodeJid(conn.user.id)) return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/bg1vvn.jpg' },
    caption: `
*🔥 ATTACK ID GROUP*

╭──────────────
│ ⚙️ 𝑩𝑶𝑻𝒁𝑨𝑷𝑷 ⚙️
╰──────────────
╰⊹ group-destruct1
╰⊹ group-destruct2
╰⊹ group-destruct3
╰⊹ group-destruct4
    `.trim(),
    footer: '👾 BOTZAPP SYSTEM',
    buttons: [
      {
        buttonId: '.group-destruct1',
        buttonText: { displayText: '💥 Ejecutar' },
        type: 1
      }
    ],
    headerType: 4
  }, { quoted: m });
};

handler.command = /^carruselcat$/i;
export default handler;