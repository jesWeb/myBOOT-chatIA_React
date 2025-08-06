export type Tipo = "pdf" | "word" | "xlsx" | "txt"

export type Documento = {
    id: number,
    tipo: Tipo,
    titulo: string,
    contenido: string,
    fecha: string
}
