import fetch from 'node-fetch';
import yts from 'yt-search';
import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
    if (!text) return m.reply(`🍭 Ingresa un texto para buscar en YouTube\n> *Ejemplo:* ${usedPrefix + command} crow edits`);
    
    await m.react('🔍');
    
    try {
        // Buscar en YouTube usando yt-search (más confiable)
        let search = await yts(text);
        let video = search.videos[0];
        
        if (!video) {
            return m.reply('❌ No se encontraron resultados para tu búsqueda');
        }
        
        // Formatear duración
        let duration = formatDuration(video.seconds);
        
        // Información del video
        let txt = `🎵 *YOUTUBE PLAY* 🎵\n\n`;
        txt += `✨ **Título:** ${video.title}\n`;
        txt += `👤 **Canal:** ${video.author.name}\n`;
        txt += `⌛ **Duración:** ${duration}\n`;
        txt += `👀 **Vistas:** ${formatViews(video.views)}\n`;
        txt += `📅 **Publicado:** ${video.ago}\n`;
        txt += `📎 **URL:** ${video.url}\n\n`;
        txt += `⏳ *Descargando audio...*`;
        
        // Enviar imagen con información
        await conn.sendMessage(m.chat, { 
            image: { url: video.thumbnail }, 
            caption: txt 
        }, { quoted: m });
        
        await m.react('⏳');
        
        // Array de APIs para probar (en orden de preferencia)
        const apis = [
            `https://api.agatz.xyz/api/ytmp3?url=${video.url}`,
            `https://api.vreden.my.id/api/ytmp3?url=${video.url}`,
            `https://api.ryzendesu.vip/api/downloader/ytmp3?url=${video.url}`,
            `https://api.dhamzxploit.my.id/api/ytaudio?url=${video.url}`
        ];
        
        let audioUrl = null;
        let audioTitle = video.title;
        
        // Probar cada API hasta encontrar una que funcione
        for (let apiUrl of apis) {
            try {
                console.log(`Probando API: ${apiUrl}`);
                
                let response = await fetch(apiUrl);
                let data = await response.json();
                
                // Diferentes estructuras de respuesta según la API
                if (data.result?.download?.url) {
                    audioUrl = data.result.download.url;
                    break;
                } else if (data.result?.url) {
                    audioUrl = data.result.url;
                    break;
                } else if (data.data?.url) {
                    audioUrl = data.data.url;
                    break;
                } else if (data.download?.url) {
                    audioUrl = data.download.url;
                    break;
                } else if (data.url) {
                    audioUrl = data.url;
                    break;
                }
                
            } catch (apiError) {
                console.log(`Error con API ${apiUrl}:`, apiError.message);
                continue;
            }
        }
        
        if (!audioUrl) {
            // Si las APIs fallan, usar ytdl como respaldo
            try {
                let ytdlResponse = await fetch(`https://api.cobalt.tools/api/json`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        url: video.url,
                        vCodec: 'h264',
                        vQuality: '720',
                        aFormat: 'mp3',
                        isAudioOnly: true
                    })
                });
                
                let ytdlData = await ytdlResponse.json();
                if (ytdlData.url) {
                    audioUrl = ytdlData.url;
                }
            } catch (ytdlError) {
                console.log('Error con cobalt.tools:', ytdlError.message);
            }
        }
        
        if (!audioUrl) {
            throw new Error('No se pudo obtener el audio de ninguna fuente disponible');
        }
        
        // Descargar y enviar el audio
        console.log(`Descargando audio desde: ${audioUrl}`);
        
        try {
            // Verificar el tamaño del archivo antes de descargarlo
            let headResponse = await fetch(audioUrl, { method: 'HEAD' });
            let fileSize = headResponse.headers.get('content-length');
            
            if (fileSize && parseInt(fileSize) > 50 * 1024 * 1024) { // 50MB límite
                return m.reply('❌ El archivo es demasiado grande (>50MB). Intenta con otra canción más corta.');
            }
            
            // Enviar audio directamente desde URL
            await conn.sendMessage(m.chat, {
                audio: { url: audioUrl },
                fileName: `${audioTitle}.mp3`,
                mimetype: 'audio/mpeg'
            }, { quoted: m });
            
            await m.react('✅');
            
        } catch (sendError) {
            // Si falla el envío directo, intentar descargar primero
            try {
                let audioBuffer = await getBuffer(audioUrl);
                
                await conn.sendMessage(m.chat, {
                    audio: audioBuffer,
                    fileName: `${audioTitle}.mp3`,
                    mimetype: 'audio/mpeg'
                }, { quoted: m });
                
                await m.react('✅');
                
            } catch (bufferError) {
                throw new Error('No se pudo enviar el audio');
            }
        }
        
    } catch (error) {
        console.error('Error en play handler:', error);
        await m.reply(`❌ *Error al procesar tu solicitud*\n\n📝 *Detalles:* ${error.message}\n\n💡 *Sugerencia:* Intenta con otro término de búsqueda`);
        await m.react('✖️');
    }
};

// Función para formatear duración
function formatDuration(seconds) {
    if (!seconds) return 'Desconocida';
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    } else {
        return `${minutes}:${secs.toString().padStart(2, '0')}`;
    }
}

// Función para formatear vistas
function formatViews(views) {
    if (!views) return 'Desconocidas';
    
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K`;
    } else {
        return views.toString();
    }
}

// Función para obtener buffer
const getBuffer = async (url, options = {}) => {
    try {
        const response = await axios({
            method: 'GET',
            url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            ...options,
            responseType: 'arraybuffer',
            timeout: 60000, // 60 segundos
            maxContentLength: 50 * 1024 * 1024, // 50MB máximo
        });
        
        return Buffer.from(response.data);
    } catch (error) {
        console.error(`Error en getBuffer: ${error.message}`);
        throw error;
    }
};

handler.command = ['play', 'paudio', 'p'];
handler.help = ['play *<búsqueda>*'];
handler.tags = ['descargas'];
handler.estrellas = 5;

export default handler;
