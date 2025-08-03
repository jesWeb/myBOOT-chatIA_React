import { jsPDF } from "jspdf"


export function generarPdf(contenido: string, titulo: string) {

    // 1- PDF en blanco 
    const pdf = new jsPDF()

    //2- le damos margenes respecto ak ancho , para que no se desborde el texto

    const maxWidth = pdf.internal.pageSize.getWidth() - 20

    // 3- Agregamos el texto con el formato 
    pdf.text(contenido, 10, 20, { maxWidth })

    // 4- Guardamos elpdf con el tirulo
    pdf.save(`${titulo}.pdf`)


}