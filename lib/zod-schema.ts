import { z } from "zod"

export const schemaCreateUrl = z.object({
    url: z.string().url().min(1)
})