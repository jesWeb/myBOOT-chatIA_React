import { Link } from "react-router-dom"
import { useDocumentoStore } from "../store/useDocumentosStore"
import { useState } from "react"
import { saveAs } from 'file-saver'
import { generarPdf } from '../utils/generarPdf'
import { generarWord } from '../utils/generarWords'
import { exportarExcel } from '../utils/generarXlsx'

const Documentos = () => {

    const documentos = useDocumentoStore((state) => state.documentos)
    const eliminarDoc = useDocumentoStore((state) => state.eliminarDocumento)
    const eliminarTodo = useDocumentoStore((state) => state.eliminarTodo)
    const editarTitulo = useDocumentoStore((state) => state.editarTitulo)
    //-- guardamos el id del documento en el que estamos editando 
    const [editandoId, setEditandoId] = useState<number | null>(null)
    // guardamos el nuevo titulo mientras escribe en un input
    const [nuevoTitul, setNuevoTitul] = useState('')

    //
    const descargar = (doc: (typeof documentos)[number]) => {
        const { contenido, tipo, titulo } = doc

        if (tipo === "txt") {
            const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" })
            saveAs(blob, `${titulo}.txt`)
        }
        if (tipo === "pdf") {
            generarPdf(contenido, titulo)
        }
        if (tipo === "word") {
            generarWord(contenido, titulo)
        }
        if (tipo === "xlsx") {
            exportarExcel(contenido, titulo)
        }


    }

    return (
        <div className="min-h-screen bg-zinc-900 text-white p-6">
            <div className="mb-4">
                <Link
                    to="/"
                    className="text-sm bg-zinc-700 hover:bg-zinc-600 px-3 py-1 rounded"
                >
                    Volver al Chat

                </Link>
            </div>
            <h1 className="text-2xl font-semibold mb-4">Documentos Generados</h1>

            {
                documentos.length == 0 ? (
                    <p className="text-gray-400"> No hay documentos </p>

                ) : (
                    <ul className="space-y-4 mt-6">
                        {documentos.map((doc) => (
                            <li
                                key={doc.id}
                                className="bg-zinc-700 p-4 rounded-lg flex justify-between items-center">
                                <div>
                                    {editandoId === doc.id ?
                                        (
                                            <div className="">
                                                <input
                                                    className="text-sm bg-zinc-700 text-white px-2 py-1 rounded"
                                                    type="text"
                                                    value={nuevoTitul}
                                                    onChange={(e) => setNuevoTitul(e.target.value)}
                                                />
                                                <button
                                                    onClick={() => {
                                                        editarTitulo(doc.id, nuevoTitul)
                                                        setEditandoId(null)

                                                    }}
                                                    className="bg-green-600 hover:bg-green-700 text-sm px-2 py-1 rounded"

                                                >aceptar</button>
                                                <button
                                                    className="bg-zinc-600 hover:bg-zinc-700 text-sm px-2 py-1 rounded"
                                                    onClick={() => setEditandoId(null)}
                                                >Cancelar</button>
                                            </div>
                                        )
                                        :
                                        <div className="flex items-center gap-2 mb-2">
                                            <p className="font-semibold text-lg">{doc.titulo}</p>
                                            <button
                                                onClick={() => {
                                                    setEditandoId(doc.id)
                                                    setNuevoTitul(doc.titulo)
                                                }}
                                                className="text-sm text-blue-400 hover:underline cursor-pointer">Editar</button>
                                        </div>
                                    }

                                    <p className="text-sm text-gray-400 mb-2">{doc.fecha}</p>
                                    <p className="text-sm line-clamp-3 max-w-xl text-gray-300 ">{doc.contenido}</p>
                                </div>

                                <div className="flex flex-col gap-2 ml-4">
                                    <button
                                        onClick={() => descargar(doc)}
                                        className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded cursor-pointer "
                                    >Descargar</button>
                                    <button
                                        onClick={() => eliminarDoc(doc.id)}
                                        className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded cursor-pointer"
                                    >Eliminar</button>
                                </div>

                            </li>

                        ))
                        }
                    </ul>

                )
            }



            <div className="mt-6">
                <button
                    onClick={eliminarTodo}
                    className="text-sm bg-red-700 hover:bg-red-800 px-3 py-1 rounded cursor-pointer"
                >
                    Eliminar Todo
                </button>
            </div>


        </div>
    )
}

export default Documentos
