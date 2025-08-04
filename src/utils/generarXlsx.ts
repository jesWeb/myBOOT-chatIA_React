import { saveAs } from 'file-saver';
import *  as XLSX from 'xlsx';


export function exportarExcel(contenido: string, titulo: string) {

    //  1- dividir el contenido por saltos de lineas 
    const filas = contenido.split("\n").map((linea) => [linea])

    //2 - Convertimos el array [linea] en una hoja de excel
    // cada fila, es un array de celdas => [["Hola"],["Mundo"]]  - funcionara un array de arrays
    const hoja = XLSX.utils.aoa_to_sheet(filas)

    // 3- creamos un libro de EXCE vacio

    const libro = XLSX.utils.book_new()

    // 4- agregamos la hoja creada al libro

    XLSX.utils.book_append_sheet(libro, hoja, "mensaje")

    // 5 - Convertimos el libro en un array de bytez  binarios para poder descargarlo y , asi transformamos el objeto "libtro" en un archivo descargable

    const buffer = XLSX.write(libro, { bookType: "xlsx", type: "array" })

    // 6- creamos un blob con los datos generados

    const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    })

    // 7- usamos file-server para forzar la descarga 

    saveAs(blob, `${titulo}.xlsx`)

}