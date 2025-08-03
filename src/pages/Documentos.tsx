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
            Documentos
        </div>
    )
}

export default Documentos
