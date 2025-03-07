import { z } from "zod"

export const schemaCreateUrl =z.object({
    url:z.string().url({message:"url invalida"})
}).strict({message:"no se pueden agregar campos adicionales"})
