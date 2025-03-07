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

    static cleanUrl(url: string) {
        return url.trim()
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
                .select()
                .eq("code", code)
                .maybeSingle()
            if (error) {
                throw new Error(error.message)
            }
            return !!data
        } catch (error: any) {
            console.error("Hubo un problema al comparar los codigos: ", error.message)
            throw new Error(error.message)
        }
    }

    static async checkId(id: string): Promise<Boolean> {
        const numberId = parseInt(id)
        try {
            const { data, error } = await supabase
                .from("urls")
                .select()
                .eq("id", numberId)
                .maybeSingle()
            if (error) {
                throw new Error(error.message)
            }
            if (!data) {
                throw new Error(`el id ${id} ingresado no existe en la tabla urls`)
            }
            return !!data
        } catch (error: any) {
            console.error("Hubo un problema al comparar los Ids: ", error.message)
            throw new Error(error.message)
        }
    }

    static createShortUrl(url: string, code: string) {
        return url.concat(`/${code}`)
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
            throw new Error(error.message)
        }
    }

    static async deleteUrl(id: string) {
        const numberId = parseInt(id)
        try {
            const response = await supabase
                .from('urls')
                .delete()
                .eq('id', numberId)
            return response
        } catch (error: any) {
            console.error("hubo un problema al eliminar el id ingresado en Supabase", error.message)
            throw new Error(error.message)
        }
    }
}