import axios from "axios"


const API_KEY = import.meta.env.VITE_GROQ_API_KEY

export const consultorIA = async ({ soloUsuario, incluirHistorial }: { soloUsuario: string, incluirHistorial: boolean }): Promise<string> => {

    const sistema = {
        role: "system",
        content: 'eres un bot que habla sobre downhill de montana y comparas el deporte con las motocicletas'
    }

    const usuario = {
        role: "user",
        content: "te pido que me compartas que prefieres ".trim()
    }


    const mensajes = incluirHistorial ? [sistema, { role: "user", content: soloUsuario }] : [{ role: "user", content: soloUsuario }]

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
