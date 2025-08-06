import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Documento } from "../types/documento"


type EstadoDocumento = {
    documentos: Documento[]
    agregarDocumento: (doc: Documento) => void
    eliminarDocumento: (id: number) => void
    eliminarTodo: () => void
    editarTitulo: (id: number, nuevoTitulo: string) => void
}

export const useDocumentoStore = create(
    persist<EstadoDocumento>(
        (set) => ({

            documentos: [],

            agregarDocumento: (doc) => {
                set((state) => ({
                    documentos: [...state.documentos, doc]
                }));
            },

            eliminarDocumento: (id) => {
                set((state) => ({
                    documentos: state.documentos.filter((documento) => documento.id !== id)
                }));
            },

            eliminarTodo: () => set({ documentos: [] }),

            editarTitulo(id, nuevoTitulo: string) {
                set((state) => ({
                    documentos: state.documentos.map((doc) =>
                        doc.id === id ? { ...doc, titulo: nuevoTitulo } : doc
                    )
                }))
            },

        }),
        { name: "documentos-generados" }
    )
)