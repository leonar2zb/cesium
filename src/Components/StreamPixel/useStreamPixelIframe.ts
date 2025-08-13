import { useEffect, useRef, useCallback } from "react";

interface UseStreamPixelIframeProps {
  onMessage: (event: MessageEvent) => void;
  token: string | undefined;
}

export function useStreamPixelIframe({ onMessage, token }: UseStreamPixelIframeProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Enfoca el iframe y habilita eventos
  const setFocusIframe = useCallback(() => {
    const streamIframe = document.getElementById('streamPixelIframe') as HTMLIFrameElement;
    if (streamIframe) {
      streamIframe.style.pointerEvents = 'auto';
      streamIframe.focus();
    }
  }, []);

  // Envía mensajes al iframe
  const postMessageToIframe = useCallback((message: unknown) => {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(message, '*');
    } else {
      console.error("Iframe no encontrado o contentWindow no disponible.");
    }
    setFocusIframe();
  }, [setFocusIframe]);

  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => {
      window.removeEventListener('message', onMessage);
    };
  }, [onMessage, token]);

  return { iframeRef, postMessageToIframe, setFocusIframe };
}
