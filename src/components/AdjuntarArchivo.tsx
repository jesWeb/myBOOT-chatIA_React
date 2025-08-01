/**
 * user selecciona un archivo 
 *  valida  + extraer el texto
 *  vista previa 
 *          no -> Borrar el texto 
 *          si -> Se envia la info al chat
 * 
 */
import { useState } from "react"
import { LIMITE_TEXTO } from "../config/limites"
import { leerDocs } from "../utils/leerDocs"
import { leerPdf } from "../utils/Leerpdf"

const EXTENSIONES_MIME_VALIDAS = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"

]

// const tamano = 5 * 1024 * 1024

type PropAjuntarArchivo = {
    envioTextoExtraido: (
        entrada: {
            Texto: string
            esArchivo: boolean
        }
    ) => void
}

export default function AdjuntarArchivo({ envioTextoExtraido }: PropAjuntarArchivo) {

    const [Texto, setTexto] = useState("")
    const lecturaSize = 5000;
    const EXTEN_VALIDAS = ["pdf", "docx", "txt", "xlsx"]
    //evento de archivo
    const manejarArchivo = async (e: React.ChangeEvent<HTMLInputElement>) => {
        //validaciones generales archivo 
        const archivo = e.target.files?.[0]
        if (!archivo) return

        const extension = archivo.name.split('.').pop()?.toLocaleLowerCase()

        if (!extension || !EXTEN_VALIDAS.includes(extension)) {
            alert("Formato no permitido")
            return
        }

        if (!EXTENSIONES_MIME_VALIDAS.includes(archivo.type)) {
            alert("Tipo de mime no permitido")
            return
        }

        if (archivo.size > LIMITE_TEXTO) {
            alert("El archivoo excede el tamano maximo permitido")
            return
        }

        // procesar archivo  por su tipo
        //txt
        if (extension === "txt") {
            const lector = new FileReader()
            lector.onload = () => {
                const contenido = (lector.result as string).slice(0, lecturaSize)
                setTexto(contenido)
            }
            lector.readAsText(archivo)
            return
        }

        //DOCX
        if (extension === "docx") {
            //nuevo archivo
            const lector = new FileReader()
            //como vamos a procesar el arch y por donde , como se tiene que leer el archivo 
            // nos deviuleve el contenido crudo y ya estamos listos para procesar el contemnido y enviarlo a index Ventana chat a travez de settexto
            lector.onload = async () => {
                const resultado = await leerDocs(archivo)
                setTexto(resultado)
            }
            //leemos el archivo a las especificaciones que nos indiquen en el lectoer onload
            lector.readAsArrayBuffer(archivo)
            return
        }

        //pdf 

        if (extension === "pdf") {
            const resultado = await leerPdf(archivo)
            setTexto(resultado)
            return
        }





    }


    //funcion para confirmar 
    const confirmar = () => {
        envioTextoExtraido({
            esArchivo: true,
            Texto
        })
        setTexto("")
    }
    //funcion para cancelar
    const cancelar = () => {
        setTexto("")
    }


    return (
        <div className="mt-4 space-y-2">

            <label className="inline-block cursor-pointer text-sm bg-zinc-700 text-white px-3 py-1 rounded  hover:bg-zinc-500">
                Elegir Archivo
                <input
                    accept=".txt, .pdf, .docx "
                    type="file"
                    className="hidden"
                    onChange={manejarArchivo}
                />
            </label>

            {Texto && (

                <div className="text-sm bg-zing-800 p-3 rounded text-center">
                    <p className="mb-2">
                        Quieres analizar este Archivo?
                    </p>

                    <div className="flex justify-center gap-2">
                        <button
                            onClick={confirmar}
                            className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                        >
                            Si
                        </button>

                        <button
                            onClick={cancelar}
                            className="bg-amber-700 px-3 py-1 rounded hover:bg-amber-800"
                        >
                            No
                        </button>
                    </div>
                </div>
            )}



        </div>
    )
}
