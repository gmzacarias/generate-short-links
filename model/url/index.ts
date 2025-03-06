import { Database } from "@/types/supabase-types"
import { supabase } from "@/lib/supabase-db"

export class Url {
    id?: string;
    url: string;
    short_url?: string | null = null;
    created_at?: Date;
    constructor(url: string) {
        if (!url) {
            throw new Error("Ingresar una url valida")
        }
        this.url = url;
    }


    static async checkCode(code: string): Promise<Boolean> {
        try {
            const { data, error } = await supabase
                .from("urls")
                .select("code")
                .eq("code", code)
                .single()
                if(error){
                    throw new Error(error.message)
                }
            return !!data
        } catch (error: any) {
            console.error("Hubo un problema al comparar los codigos: ", error.message)
            throw new Error ("Error al verificar el codigo: ",error.message)
        }
    }


    static async shortenUrl(url: string) {

    }


}