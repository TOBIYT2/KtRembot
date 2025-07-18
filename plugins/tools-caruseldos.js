let handler = async (m, { conn }) => {
  if (m.sender !== conn.decodeJid(conn.user.id)) return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');

  const productItems = [
    {
      productId: '001',
      title: '🔥 Destruct Group',
      description: 'Comando: .group-destruct1',
      currencyCode: 'USD',
      priceAmount1000: 1000,
      imageUrl: 'https://files.catbox.moe/bg1vvn.jpg'
    },
    {
      productId: '002',
      title: '💣 Crash Privado',
      description: 'Comando: .crash-priv1',
      currencyCode: 'USD',
      priceAmount1000: 1000,
      imageUrl: 'https://files.catbox.moe/bg1vvn.jpg'
    },
    {
      productId: '003',
      title: '⚡ Ataque Masivo',
      description: 'Comando: .mass-attack1',
      currencyCode: 'USD',
      priceAmount1000: 1000,
      imageUrl: 'https://files.catbox.moe/bg1vvn.jpg'
    }
  ];

  const message = {
    contextInfo: {
      businessMessageForwardInfo: {},
      forwardingScore: 999,
      isForwarded: true
    },
    multiProductMessage: {
      header: {
        title: '🧰 Menú de Funciones BotZapp'
      },
      businessOwnerJid: conn.decodeJid(conn.user.id),
      sections: [
        {
          title: '⚙️ Comandos disponibles',
          productItems: productItems.map(p => ({
            productId: p.productId
          }))
        }
      ]
    }
  };

  // Registrar los productos en el catálogo (falsos)
  conn.catalog = conn.catalog || {};
  for (let item of productItems) {
    conn.catalog[item.productId] = {
      productId: item.productId,
      title: item.title,
      description: item.description,
      currencyCode: item.currencyCode,
      priceAmount1000: item.priceAmount1000,
      productImageCount: 1,
      imageUrl: item.imageUrl
    };
  }

  await conn.sendMessage(m.chat, message, { quoted: m });
};

handler.command = /^carruselreal$/i;
export default handler;