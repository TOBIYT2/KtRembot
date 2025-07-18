import { generateWAMessageFromContent } from '@whiskeysockets/baileys';

let handler = async (m, { conn }) => {
  if (m.sender !== conn.decodeJid(conn.user.id)) {
    return m.reply('❌ Solo el número vinculado al bot puede usar este comando.');
  }

  const catalogFlow = {
    interactiveMessage: {
      body: { text: '💥 Selecciona una opción destructiva' },
      footer: { text: '🧪 CrowBot Flow' },
      header: { type: 'text', text: '☠️ ATAQUES DISPONIBLES ☠️' },
      nativeFlowMessage: {
        buttons: [
          {
            type: 'reply',
            reply: {
              id: 'abrir-carrusel',
              title: '🚀 Ver ataques'
            }
          }
        ],
        messageParamsJson: JSON.stringify({
          flow_message_type: 'product_list',
          flow_token: 'abc123',
          sections: [
            {
              title: '🔥 ATAQUES DESTRUCTIVOS 🔥',
              headers: [
                {
                  title: 'group-destruct1',
                  description: 'Destruye grupo 1',
                  media: {
                    url: 'https://files.catbox.moe/bg1vvn.jpg'
                  },
                  action: {
                    button: 'Ejecutar',
                    sections: [
                      {
                        title: 'Comandos',
                        rows: [
                          { title: 'group-destruct1', rowId: '.group-destruct1' },
                          { title: 'group-destruct2', rowId: '.group-destruct2' }
                        ]
                      }
                    ]
                  }
                },
                {
                  title: 'group-destruct2',
                  description: 'Destruye grupo 2',
                  media: {
                    url: 'https://files.catbox.moe/bg1vvn.jpg'
                  },
                  action: {
                    button: 'Ejecutar',
                    sections: [
                      {
                        title: 'Comandos',
                        rows: [
                          { title: 'group-destruct3', rowId: '.group-destruct3' },
                          { title: 'group-destruct4', rowId: '.group-destruct4' }
                        ]
                      }
                    ]
                  }
                }
              ]
            }
          ]
        })
      }
    }
  };

  const msg = generateWAMessageFromContent(m.chat, catalogFlow, {});
  await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });
};

handler.command = /^carruselcat$/i;
handler.help = ['carruselcat'];
handler.tags = ['bot'];

export default handler;