import { useForm } from "react-hook-form"
import { minLength, object, pipe, promise, string } from "valibot"
import { valibotResolver } from "@hookform/resolvers/valibot";
import { useChatStore } from "../store/useChartStore";
import { useEffect, useState } from "react";
import { consultorIA } from "../lib/consultarIA";



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


    const manejarEnvio = async (entrada: string) => {

        agregarMensaje({
            id: Date.now(),
            rol: "usuario",
            texto: entrada
        })

        setCargando(true)

        try {
            const response = await consultorIA({
                soloUsuario: entrada,
                incluirHistorial: true
            })
            agregarMensaje({
                id: Date.now() + 1,
                rol: "usuario",
                texto: response
            })

        } catch (error) {
            console.error(error)
        } finally {
            setCargando(false)
        }

    }


    // useEffect(() => {
    //     consultorIA().then((respuesta) => {
    //         console.log("Respuesta de la IA", respuesta);

    //     })
    // }, [])

    return (
        <div className="flex flex-col h-screen bg-zinc-900 text-white">

            <header className="bg-zinc-800 px-4 py-3 flex justify-between items-center shadow-md">
                <h1 className="text-xl font-semibold">ARES IA</h1>
            </header>

            <main className="flex-1 px-4 py-6 overflow-y-auto space-y-4">
                {mensaje.map((mensa) => (
                    <div key={mensa.id}
                        className={`max-w-md px-4 py-2 rounded-xl shadow ${mensa.rol === "usuario" ? "bg-zinc-500 self-end" : "bg-zinc-700  self-start"}`}
                    >
                        {mensa.texto}
                    </div>
                ))}

                {cargando && (
                    <div className="italic text-gray-400">
                        El boot esta escribiendo ...
                    </div>
                )}
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
            </footer>


        </div>
    )
}

export default MainVentanaChat


