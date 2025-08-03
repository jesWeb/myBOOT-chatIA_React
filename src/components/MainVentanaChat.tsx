import { useForm } from "react-hook-form"
import { minLength, object, pipe, promise, string } from "valibot"
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useChatStore } from "../store/useChartStore";
import { useEffect, useRef, useState } from "react";
import { consultorIA } from "../lib/consultarIA";
import AdjuntarArchivo from "./AdjuntarArchivo";
import { LIMITE_TEXTO } from "../config/limites";
import { useLocation, Link } from "react-router-dom";
import MenuDescargaMensajes from "./MenuDescargaMensajes";



//esquema de validacion con valibot
const schema = object({
    texto: pipe(
        string(),
        minLength(1, "el mensaje no pude estar vacio")
    )
})

type Fromulario = { texto: string }

const MainVentanaChat = () => {

    const mensaje = useChatStore((state) => state.mensajes)
    const agregarMensaje = useChatStore((state) => state.agregarMensaje)

    //En que ruta estamos 
    const location = useLocation()
    const enDocumentos = location.pathname === "/documentos"


    //react-hook-Forms
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Fromulario>({
        resolver: valibotResolver(schema)
    })


    const [cargando, setCargando] = useState(false)

    // const SimulaRespuesta = async (texto: string): Promise<string> => {
    //     return new Promise((resolve) => {
    //         setTimeout(() => {
    //             resolve(`(respuesta simulada) entendi el mensaje : "${texto}"`)
    //         }, 800)
    //     })

    // }


    const manejarEnvio = async (entrada: string | { Texto: string; esArchivo?: boolean }
    ) => {

        //creamos un ternario para definir si el texto que se pasa al modelo de ia es del user o archivo 
        const texto = typeof entrada === "string" ? entrada : entrada.Texto

        //comprobar si la entrada es un objeto y si viene marcada como archivo 

        const esArchivo = typeof entrada === "object" && entrada.esArchivo


        agregarMensaje({
            id: Date.now(),
            rol: "usuario",
            // texto: entrada
            texto
        })

        setCargando(true)

        try {
            const response = await consultorIA({
                soloUsuario: texto.slice(0, LIMITE_TEXTO),
                incluirHistorial: !esArchivo
            })
            agregarMensaje({
                id: Date.now() + 1,
                rol: "bot",
                texto: response
            })

        } catch (error) {
            console.error(error)
            agregarMensaje({
                id: Date.now() + 2,
                rol: "bot",
                texto: "Ocurrio u error al analizar el archivo"
            })
        } finally {
            setCargando(false)
        }

    }

    const scrollRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [mensaje])

    return (
        <div className="flex flex-col h-screen bg-zinc-900 text-white">

            <header className="bg-zinc-800 px-4 py-3 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-semibold">ARES IA</h1>
                {/* Usar el componente Link de react-router-dom */}
                <Link
                    to={enDocumentos ? "/" : "/documentos"}
                    className="text-sm text-white bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded"
                >
                    {enDocumentos ? "Volver al chat" : "Ver Documentos"}
                </Link>
            </header>

            <main className="flex-1 flex justify-center px-4 py-6 overflow-y-auto">
                <div />
                <div className="w-full max-w-3xl  flex flex-col space-y-4">
                    {mensaje.map((mensa) => (
                        <div key={mensa.id}
                            className={`flex ${mensa.rol === "usuario" ? "justify-end" : "justify-center"}`}
                        >
                            <div className={
                                `w-fit max-w-[90%] px-4 py-2 rounded-xl shadow whitespace-pre-wrap
                                 ${mensa.rol === "usuario" ? "bg-zinc-500 self-end" : "bg-zinc-700  self-start"}`}>
                                {mensa.texto}
                                {mensa.rol === "bot" && (
                                    <div className="mt-2">
                                        <MenuDescargaMensajes contenido={mensa.texto}/>
                                    </div>
                                )}
                            </div>

                        </div>
                    ))}

                    {cargando && (
                        <div className="italic text-gray-400">
                            El boot esta escribiendo ...
                        </div>
                    )}

                    <div ref={scrollRef} />
                </div>
                <div />
            </main>

            <footer className="px-4 py-3 border-t border-zinc-700 space-y-4">
                <form action="" onSubmit={handleSubmit((data) => {
                    manejarEnvio(data.texto)
                    reset()
                })} className="flex gap-3">
                    <input
                        {...register("texto")}
                        placeholder="Escribe tu consulta..."
                        type="text"
                        className="flex-1 px-4.5 rounded-lg bg-zinc-800 text-white placeholder-gray-400"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg">
                        Enviar
                    </button>
                </form>
                {errors.texto && (
                    <p className=" bg-red-500 text-white-500 text-sm">{errors.texto.message}</p>)}
                <AdjuntarArchivo envioTextoExtraido={manejarEnvio} />
            </footer>


        </div>
    )
}

export default MainVentanaChat


