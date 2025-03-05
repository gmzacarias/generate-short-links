import { Database } from "@/types/supabase-types"
import { supabase } from "@/lib/supabase-db"

export class Url {
    id?: string;
    url: string;
    short_url?: string | null = null;
    created_at?: Date;
    constructor(url: string, shortUrl: string, code: string) {
        if (!url) {
            throw new Error("Ingresar una url valida")
        }
        this.url = url;
    }


    static async checkCode(code: string): Promise<Boolean> {
        try {
            const { data: urls, error } = await supabase
                .from("urls")
                .select("code")

            if (error) {
                throw new Error(error.message)
            }
            for (const url of urls) {
                const codeData = url.code
                if (codeData === code) {
                    throw new Error("el codigo ya fue generado");
                }
            }
            return true
        } catch (error: any) {
            console.error("Hubo un problema al comparar los codigos: ", error.message)
            throw Error
        }
    }


    static async shortenUrl(url: string) {

    }


}