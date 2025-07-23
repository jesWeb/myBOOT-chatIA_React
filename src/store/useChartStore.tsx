import { create } from "zustand";
import type { Mensaje } from "../types/mensaje";

type EstadoChat = {
    mensajes: Mensaje[]
    agregarMensaje: (mensaje: Mensaje) => void
}

export const useChatStore = create<EstadoChat>((set) => ({
    mensajes: [
        {
            id: 1,
            rol: "bot",
            texto: "Hola soy el bot super inteligente con IA, en que te puedo ayudar?"
        }
    ],

    agregarMensaje: (mensaje) =>
        set((state) => ({
            mensajes: [
                ...state.mensajes,
                mensaje
            ]
        }))
}))