let handler = async (m, { conn, args }) => {
  const BOT_NUMBER = conn.user?.id || ''
  if (m.sender !== BOT_NUMBER) return;

  let veces = parseInt(args[0]) || 1
  let caracter = args[1] || 'ꦾ'
  let texto = caracter.repeat(veces).split('').join('\u0000') // EE con \u0000 entre letras

  await conn.sendMessage(m.chat, {
    image: { url: 'https://files.catbox.moe/qoya2e.jpg' },
    caption: texto,
    viewOnce: true
  }, { quoted: m })
}

handler.command = /^\.?imagen\.\d+$/i;
export default handler;