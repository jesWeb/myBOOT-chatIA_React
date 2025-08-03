
import *  as XLSX from "xlsx"
import { LIMITE_TEXTO } from "../config/limites"

export async function leerXlsx(archivo: File): Promise<string> {

    //1 -  Leemos el contenido binario del archivo
    const ContenidoLeido = await archivo.arrayBuffer()

    // 2 - Interpretamos el contenido
    const libro = XLSX.read(ContenidoLeido, { type: "array" })

    // 3 - Processamos cada hoja del libro para convertirla en un texto plano 
    const textoHojas = libro.SheetNames.map((nombreHoja) => {

        const hoja = XLSX.utils.sheet_to_json(libro.Sheets[nombreHoja], {
            // 4- Pedimos que las filas vengan como arreglos  de celdas
            header: 1,
            // 5 - le decimos a Tps que va ha recibir un array de array de tetxtos 
        }) as string[][]

        //6 Unimos cada fila y cada hoja 
        const textoPlano = hoja.map((fila) => fila.join("")).join("\n")

        //7 - Agregamos el nombre de la hoja como titulo antes de su contenido

        return `HOJA ${nombreHoja}\n${textoPlano}`

    }).join("\n\n")

    // 8 - limitamos el texto

    return textoHojas.slice(0, LIMITE_TEXTO)

}