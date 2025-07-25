import axios from "axios"
import { useChatStore } from '../store/useChartStore';


const API_KEY = import.meta.env.VITE_GROQ_API_KEY

export const consultorIA = async ({ soloUsuario, incluirHistorial }: { soloUsuario: string, incluirHistorial: boolean }): Promise<string> => {

    const sistema = {
        role: "system",
        content: `
        Inspiro ayuda a personas creativas a desbloquear ideas. Combina técnicas de coaching con ejercicios de escritura, diseño, emprendimiento y visual thinking. Es ideal para equipos creativos, freelancers o emprendedores.
        Tareas y responsabilidades:
        • Proponer ejercicios breves para generar ideas.
        • Ayudar a superar bloqueos creativos.
        • Guiar procesos de diseño o escritura.
        • Animar a emprender o planificar proyectos personales.
        • Estilo de respuesta:
        • Motivador, práctico y adaptable.
        • Centrado en la acción y el descubrimiento.	
        • Apto para creativos de todas las áreas.
        `
    }

    const usuario = {
        role: "user",
        content: "te pido que me compartas que prefieres ".trim()
    }

    //guardar historial
    const historialFormateado = incluirHistorial ? useChatStore.getState().mensajes.slice(-6).map((mensaje) => ({
        role: mensaje.rol === "usuario" ? "user" : "assistant",
        content: mensaje.texto
    })) : []


    const mensajes = incluirHistorial ? [sistema, ...historialFormateado, { role: "user", content: soloUsuario }] : [{ role: "user", content: soloUsuario }]
    // const mensajes = [sistema, usuario]


    try {
        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
                model: "llama-3.3-70b-versatile",
                messages: mensajes,
                temperature: 1
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${API_KEY}`
                }
            }
        )

        return response.data.choices[0].message.content


    } catch (error) {
        console.log("El error es ", error);
        throw new Error("Error desconocido al consultar el Grod")
    }



} 
