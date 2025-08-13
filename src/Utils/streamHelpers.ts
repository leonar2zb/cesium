import type { WhatsApp, UrlToCall, Youtube, UnrealLog } from '../Types/types';

export function handleWhatsApp(data: WhatsApp) {
    const phone = data.phone.replace(/(?!^\+)[^0-9]/g, '');
    let url = `https://api.whatsapp.com/send?phone=${phone}`;
    const message = data.message ? data.message.trim() : '';
    if (message.length > 0) {
        url += `&text=${encodeURIComponent(message)}`;
    }
    console.log("Abriendo WhatsApp: ", url);
    const newTab = window.open(url, '_blank');
    if (!newTab) {
        console.warn("Popup bloqueado por el navegador al intentar abrir WhatsApp");
        window.location.href = url;
    }
}

export function openURL(data: UrlToCall) {
    const url = data.url.trim();
    console.log("Abriendo URL: ", url);
    const newTab = window.open(url, '_blank');
    if (!newTab) {
        console.warn("Popup bloqueado por el navegador al intentar abrir la URL");
        window.location.href = url;
    }
}

export function openYoutube(data: Youtube) {
    console.log("Abriendo Youtube");
    const url = data.url?.trim();
    const videoId = data.videoId?.trim();
    let fullUrl = url;
    if (videoId)
        fullUrl = `https://www.youtube.com/watch?v=${videoId}&autoplay=1&rel=0`;
    const newTab = window.open(fullUrl, '_blank');
    if (!newTab) {
        console.warn("Popup bloqueado por el navegador al intentar abrir Youtube");
        window.location.href = fullUrl || window.location.href;
    }
}

export function logUnreal(data: UnrealLog, setLoginWeb: (v: boolean) => void) {
    const level = data.level || 'info';
    const message = data.message.trim();
    if (message === 'Login Web terminado') setLoginWeb(true);
    switch (level) {
        case 'warn':
            console.warn("Unreal Log (Warning): ", message);
            break;
        case 'error':
            console.error("Unreal Log (Error): ", message);
            break;
        default:
            console.log("Unreal Log (Info): ", message);
            break;
    }
}

