import React, { useState } from 'react'
import type { Tipo } from '../types/documento'
import { saveAs } from 'file-saver'
import { generarPdf } from '../utils/generarPdf'
import { generarWord } from '../utils/generarWords'
import { exportarExcel } from '../utils/generarXlsx'

type PropMenuDescarga = {
    contenido: string
}



export default function MenuDescargaMensajes({ contenido }: PropMenuDescarga) {

    const [abierto, setAbierto] = useState(false)

    const titulo = contenido.slice(0, 40).replace(/\s+/g, "_")

    const DescargarDoc = (tipo: Tipo) => {
        // if (tipo === "txt") {
        //     //forma de guardar datos en 
        //     const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" })
        //     saveAs(blob,`${titulo}.txt`)
        // }
        switch (tipo) {
            case "txt":
                const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" })
                saveAs(blob, `${titulo}.txt`)
                break;
            case "pdf":
                generarPdf(contenido, titulo)
                break;
            case "word":
                generarWord(contenido, titulo)
                break;
            case "xlsx":
                exportarExcel(contenido, titulo)
                break;
        }
        setAbierto(false)
    }

    return (
        <div className='relative inline-block text-left'>
            <button
                onClick={() => setAbierto(!abierto)}
                className='text-xs bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded mt-1'
            >
                Descargar
            </button>

            {abierto && (
                <div className="absolute mt-1 bg-zinc-800  rounded shadow p-2 flex gap-2 z-50 min-w-[250px]">
                    <button
                        onClick={() => DescargarDoc("pdf")}
                        className="bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600 text-sm"
                    >
                        PDF
                    </button>
                    <button
                        onClick={() => DescargarDoc("word")}
                        className="bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600 text-sm"
                    >
                        WORD
                    </button>
                    <button
                        onClick={() => DescargarDoc("txt")}
                        className="bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600 text-sm"
                    >
                        TXT
                    </button>
                    <button
                        onClick={() => DescargarDoc("xlsx")}
                        className="bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600 text-sm"
                    >
                        EXCEL
                    </button>
                </div>

            )}


        </div>
    )
}
