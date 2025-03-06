import { Database } from "@/types/supabase-types"
import { supabase } from "@/lib/supabase-db"

export class Url {
    id?: number;
    url: string;
    short_url: string;
    code: string;
    created_at: Date

    constructor(url: string) {
        if (!url) {
            throw new Error("Ingresar una url valida")
        }
        this.url = url;
        this.code = Url.generateShortCode();
        this.short_url = Url.createShortUrl(url, this.code);
        this.created_at = new Date;
    }

    private static generateShortCode() {
        const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
        let code = ""
        for (let i = 0; i < 6; i++) {
            code += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        return code
    }

    static async checkCode(code: string): Promise<Boolean> {
        try {
            const { data, error } = await supabase
                .from("urls")
                .select("code")
                .neq("code", code)
                .single()
            if (error) {
                throw new Error(error.message)
            }
            return !data
        } catch (error: any) {
            console.error("Hubo un problema al comparar los codigos: ", error.message)
            throw new Error("Error al verificar el codigo: ", error.message)
        }
    }


    private static createShortUrl(url: string, code: string) {
        return url.concat(code)
    }

    static async savedData(url: string, shortUrl: string, code: string) {
        try {
            const { data, error } = await supabase
                .from('urls')
                .insert(
                    {
                        url: url,
                        short_url: shortUrl,
                        code: code,
                    })
                .select()

            if (error) {
                throw new Error(error.message)
            }
            return data
        } catch (error: any) {
            console.error("Hubo un problema al insertar los datos:", error.message)
            throw new Error("Error al insertar los datos:", error.message)
        }
    }
}