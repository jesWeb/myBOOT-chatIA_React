import React, { useState } from 'react'

export default function MenuDescargaMensajes() {

    const [abierto, setAbierto] = useState(false)

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
                        className="bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600 text-sm"
                    >
                        PDF
                    </button>
                    <button
                        className="bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600 text-sm"
                    >
                        WORD
                    </button>
                    <button
                        className="bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600 text-sm"
                    >
                        TXT
                    </button>
                    <button
                        className="bg-zinc-700 px-3 py-1 rounded hover:bg-zinc-600 text-sm"
                    >
                        EXCEL
                    </button>
                </div>

            )}


        </div>
    )
}
