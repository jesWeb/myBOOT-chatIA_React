import { getDocument, GlobalWorkerOptions } from "pdfjs-dist"
import { LIMITE_TEXTO } from "../config/limites";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url"

//procesa mejor el archivo y evita errores
GlobalWorkerOptions.workerSrc = pdfjsWorker

export async function leerPdf(archivo: File): Promise<string> {
    try {
        // 1- converitr el pdf en un formato binario 
        const pdfBuffer = await archivo.arrayBuffer()

        //2-cargar el documento en la memoria 
        const pdf = await getDocument({ data: pdfBuffer }).promise

        // 3- variable que almacena el contenedor de el texto completo 

        let textoExtraido = ""

        // 4- Recorremmos todas las paginas del documento-PDF
        for (let i = 1; i <= pdf.numPages; i++) {

            const pagina = await pdf.getPage(i);

            //4.1 Extrae todo el contenido textual de la pagina actual 
            const contenido = await pagina.getTextContent()

            //4.2 el contenido vinen como un array[], recorremos el contenido y devolvemos los fragmentops que tiene una propiedad "str", que contine un pedazo de tetxo 
            const textoPagina = contenido.items.map((item) =>
                //4.3 validamos que el item tenga la propiedad str
                typeof item === "object" && "str" in item ? (item as { str: string }).str : ""
                //4.3.1 unimos todos los fragments sepradados por espacios para formar una linea coherente
            ).join("")

            //4.4 Entre cada pagina agregamos unsalto para mantener  la separacion del texto
            textoExtraido += textoPagina + "\n"

            //5- validamos el ,l;imite de texto permitido

            if (textoExtraido.length >= LIMITE_TEXTO) break

        }

        return textoExtraido.slice(0, LIMITE_TEXTO)



    } catch (error) {
        console.error("Error al leer PDF:", error)
        return ""
    }
}