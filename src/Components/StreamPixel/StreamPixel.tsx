import { useState, useCallback, useEffect } from 'react';
import { useAppStore } from "../../store/useAppStore";
import { useStreamPixelIframe } from "./useStreamPixelIframe";
import { handleWhatsApp, openURL, openYoutube, logUnreal } from '../../Utils/streamHelpers';
import {WhatsApp, UrlToCall, Youtube, UnrealLog, RoleType} from '../../Types/types';
import Image from 'next/image';
import StreamPixelControls from './StreamPixelControls';

const StreamPixel = () => {
  const [loading, setLoading] = useState(false);
  const [loginWeb, setLoginWeb] = useState(false);
  const [splash, setSplash] = useState("/logo0.png");

  // Usamos el estado global en lugar del estado local para el rol
  const token = useAppStore((state) => state.user?.token);
  const iframeURL = useAppStore((state) => state.iframeURL);
  const logout = useAppStore((state) => state.logout);
  const role = useAppStore((state) => state.role);
  const setRole = useAppStore((state) => state.setRole);

  // Primero obtenemos las referencias y funciones del hook
  const { iframeRef, postMessageToIframe, setFocusIframe } = useStreamPixelIframe({
    onMessage: (event) => handleMessage(event),
    token
  });

  // Luego definimos el callback que usa estas referencias
  const handleMessage = useCallback((event: MessageEvent) => {
    // se asegura de que el mensaje proviene del iframe correcto
    const isFromIframe = iframeRef.current?.contentWindow === event.source;
    if (!isFromIframe) return;

    // se asegura de que el origen del mensaje es el esperado
    //if (event.origin !== 'https://share.streampixel.io') return;

    console.log('Mensaje recibido from iframe:', event.data);

    // Los mensajes esperador deben tener la forma { action: string, content: unknown }
    // pues la estrucutra de content depende de action pudiendo ser un string o un objeto
    let parsedUEData: unknown = null; // Inicializar como null para evitar conflicto de tipos
    let action = '';
    let content: unknown = null; // Puede ser cadena o un objeto

    if (typeof event.data === 'string') {
        try {
            parsedUEData = JSON.parse(event.data);
            if (typeof parsedUEData === "object" && parsedUEData !== null) {
                if ("action" in parsedUEData && "content" in parsedUEData) {
                    const tempData = parsedUEData as { action: string; content: unknown };
                    action = tempData.action;
                    content = tempData.content;
                }
            }
        } catch (error) {
            console.error("Error al parsear el mensaje JSON:", event.data, error);
        }
    }

    const type = event.data?.type ?? "";
    if (type === 'stream-state') {
        // Aquí manejo los diferentes estados del stream
        // según https://docs.streampixel.io/resources/custom-integration-guide/setting-up-your-frontend/stream-states
        const value = event.data?.value ?? "";
        switch (value) {
            case "authenticating": //10% progreso de carga
                console.log("Autenticando...");
                setLoading(true);
                setSplash("/logo1.png");
                break;
            case "connecting": //20% progreso de carga
                console.log("Conectando...");
                setSplash("/logo2.png");
                break;
            case "finalising": //80% progreso de carga
                console.log("Finalizando...");
                setSplash("/logo3.png");
                break;
            case "loadingComplete": //100% progreso de carga
                {
                    setSplash("/logo4.png");
                    setLoading(false);
                    console.log("Carga completa.");
                    setTimeout(() => {
                        postMessageToIframe({ event: 'Login', data: { token: token, width: window.innerWidth, height: window.innerHeight, url: 'https://www.bbc.com/' } });
                }, 1000);
                setFocusIframe();
                break;
            }
            case "disconnected": // desconectado(inactividad, crash)
                console.log("Desconectado.");
                setLoading(false);
                setSplash("/logo0.png"); // o mostrar un mensaje de error
                break;
            case "restricted": //restringido(dominio no permitido, inactividad, permisos de usuario)
                console.log("Acceso restringido.");
                break;
            case "afkWarning":
                if(role === 'Server') {
                    postMessageToIframe({ message: 'heartbeat' });
                }
                //aviso de inactividad, 10 segundos antes de desconectar
                console.log("Aviso de inactividad.");
                break;
            case "afkAbort": // usuario interactua antes 10 segundos y se cancela la desconexión
                console.log("Desconexión cancelada.");
                break;
            case "showPassword": // restringido por contraseña
                console.log("Introduce la contraseña para continuar.");
                break;
            case "hidePassword": // se introdujo la contraseña correctamente
                console.log("Contraseña correcta.");
                break;

            default: {
                const regex = /^queue-(\d+)$/;
                const input = value;

                const match = input.match(regex);

                if (match) {
                    const N = parseInt(match[1], 10); // Extrae el número como entero
                    const mensaje = `Usuario en cola y posición ${N}`;
                    console.log(mensaje);
                    alert(mensaje); // Muestra el mensaje en un alert
                } else {
                    console.log("No cumple el patrón. Otro mensaje de estado(Raro).");
                }
            }
                break;
        }
        // console.log('Estado del stream:', event.data.value);
    } else if (action !== '') {
        switch (action) {
            case "ConsoleLog":
                console.log("Haciendo log de Unreal");
                logUnreal(content as UnrealLog, setLoginWeb);
                break;
            case "OpenWhatsApp":
                console.log("Vamos a Whatsapp");
                handleWhatsApp(content as WhatsApp);
                break;
            case "OpenURL":
                console.log("Vamos a abrir la URL");
                openURL(content as UrlToCall);
                break;
            case "NewRole":
                console.log("Cambiando rol de instancia");
                if (content && typeof content === 'object' && 'Role' in content) {
                    setRole(content.Role as string);
                    console.log("Nuevo rol asignado:", content.Role);
                }
                break;
            case "OpenYoutube":
                console.log("Vamos a abrir Youtube");
                openYoutube(content as Youtube);
                break;
            default:
                console.log(`Acción '${action}' no reconocida.`);
                break;
        }
    }

}, [token, role, postMessageToIframe, setFocusIframe, setRole, iframeRef]);

  const sendCommand = useCallback(() => {
    postMessageToIframe({ event: 'Login', data: { token, width: window.innerWidth, height: window.innerHeight, url: 'https://www.bbc.com/', isServer: true } });
  }, [postMessageToIframe, token]);

  const terminateSession = useCallback(() => {
    postMessageToIframe({ event: 'Logout', data: {} });
    setLoginWeb(false);
    postMessageToIframe({ message: 'terminateSession' });
    setTimeout(() => {
      logout();
    }, 1000);
  }, [postMessageToIframe, logout]);

  useEffect(() => {
    if (token) {
        setLoading(true)
        setSplash("/logo0.png");
    }
}, [token])

  // manejar estado de carga en función del token e inicio de sesión
  useEffect(() => {
    const timeout = setTimeout(() => {
        if (loading) {
            setLoading(false);
            setSplash("/logo0.png"); // o mostrar un mensaje de error timeout
            console.warn('Fallback: Quitada la pantalla de carga por timeout.');
        }
    }, 10000);
    return () => { clearTimeout(timeout); console.log('Timeout quitado.'); };
}, [loading]);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 flex justify-center items-center z-50">
          <Image
            src={splash}
            alt="Loading..."
            width={128}
            height={128}
            className="object-contain"
          />
        </div>
      )}
      {/*{token && (*/}
      {/*  <StreamPixelControls*/}
      {/*    token={token}*/}
      {/*    loginWeb={loginWeb}*/}
      {/*    onLogin={sendCommand}*/}
      {/*    onLogout={terminateSession}*/}
      {/*  />*/}
      {/*)}*/}
      {iframeURL && (
        <iframe
          ref={iframeRef}
          id="streamPixelIframe"
          src={iframeURL}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals allow-pointer-lock"
          allow="autoplay;camera;microphone;encrypted-media;fullscreen;display-capture;xr-spatial-tracking;allow-pointer-lock"
          allowFullScreen
          title="StreamPixel Stream"
          className={`fixed top-0 left-0 w-full h-full border-none z-0 transition-opacity duration-300 ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}
        ></iframe>
      )}
    </div>
  );
};

export default StreamPixel;
