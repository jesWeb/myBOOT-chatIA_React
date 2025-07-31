import { renderAsync } from "docx-preview"
import { convert } from "html-to-text"
import { LIMITE_TEXTO } from "../config/limites"

export const leerDocs = async (archivo: File): Promise<string> => {
    try {
        const container = document.createElement("div")
        await renderAsync(archivo, container)

        const textoplano = convert(container.innerHTML, {
            wordwrap: false,
            selectors: [
                { selector: "a", format: "inline" },//link
                { selector: "img", format: "skip" },//ignora imagenes


            ]
        })
        return textoplano.slice(0, LIMITE_TEXTO)

    } catch (error) {
        console.error("Error al leer el doc", error)
        return ""
    }
} 