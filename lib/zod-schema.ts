import { z } from "zod"

export const schemaCreateUrl =z.object({
    url:z.string().url({message:"url invalida"})
}).strict({message:"no se pueden agregar campos adicionales"})

export const schemaDeleteId=z.object({
    id:z.string().min(1).regex(/^\d+$/,{message:"el id solo debe contener numeros de 0 al 9"})
}).strict({message:"no se pueden agregar campos adicionales"})

export const schemaRedirectUrl=z.object({
code:z.string().length(6,{message:"el code debe tener 6 caracteres"}),
}).strict({message:"no se pueden agregar campos adicionales"})
