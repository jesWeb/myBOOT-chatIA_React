import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export function generarWord(contenido: string, titulo: string) {

    // 1 - creamos el documento 
    const docx = new Document({
        // 2- Definimos las distintas "secciones"
        sections: [
            {
                //3- Dentro de cada seccion dividimos el contenido del mensaje en lineas usando split
                children: contenido.split("\n").map((linea) =>
                    //4 -Para cada linea, creamos un nuevo parrafo
                    new Paragraph({
                        // 5 -vemos si cada fragmento del texto tiene algtun estilo propio (cursiva,negrita, etc)
                        children: [
                            // utilizamos un arreglo porque  podriamos tener varios TextRuns
                            new TextRun(linea)
                        ],
                        //6- Configuramos el espacio despues de cada parrafo 100 es aporx 7px 
                        spacing: { after: 100 }
                    })
                )
            }
        ]

    })
    //7- Usamos Packer para comvertir el doc en un blob 
    Packer.toBlob(docx).then((blob) => { saveAs(blob, `${titulo}.docx`) })
}