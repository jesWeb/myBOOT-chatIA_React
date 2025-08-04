import { Link } from "react-router-dom"

const Documentos = () => {
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
            <p className="text-gray-400">aqui se mostraran los documentos </p>

            <ul className="space-y-4 mt-6">
                <li className="bg-zinc-700 p-4 rounded-lg flex justify-between items-center">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <p className="font-semibold text-lg">Titulo de documento</p>
                            <button className="text-sm text-blue-400 hover:underline cursor-pointer">Editar</button>
                        </div>
                        <p className="text-sm text-gray-400 mb-2">Fecha del documento</p>
                        <p className="text-sm line-clamp-3 max-w-xl text-gray-300 ">Vista previa del contenido generado</p>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                        <button
                            className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded cursor-pointer "
                        >Descargar</button>
                        <button
                            className="text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded cursor-pointer"
                        >Eliminar</button>
                    </div>

                </li>
            </ul>

            <div className="mt-6">

                <button
                    className="text-sm bg-red-700 hover:bg-red-800 px-3 py-1 rounded cursor-pointer"
                >
                    Eliminar Todo
                </button>
            </div>


        </div>
    )
}

export default Documentos
