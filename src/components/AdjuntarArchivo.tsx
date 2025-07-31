export default function AdjuntarArchivo() {
    return (
        <div className="mt-4 space-y-2">

            <label className="inline-block cursor-pointer text-sm bg-zinc-700 text-white px-3 py-1 rounded  hover:bg-zinc-500">
                Elegir Archivo
                <input
                    accept=".txt, .pdf, .docx "
                    type="file"
                    className="hidden"
                />
            </label>


            <div className="text-sm bg-zing-800 p-3 rounded text-center">
                <p className="mb-2">
                    Quieres analizar este Archivo?
                </p>

                <div className="flex justify-center gap-2">
                    <button
                        className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600"
                    >
                        Si
                    </button>

                    <button
                        className="bg-amber-700 px-3 py-1 rounded hover:bg-amber-800"
                    >
                        No
                    </button>




                </div>



            </div>



        </div>
    )
}
