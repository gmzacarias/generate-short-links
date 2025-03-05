import { Database } from "@/types/supabase-types"


export class Url {
    id?: string;
    url: string;
    shortUrl?: string | null = null;
    createdAt?: Date;
    constructor(id: string, url: string, shortUrl: string, createdAt: Date) {
        if (!url) {
            throw new Error("Ingresar una url valida")
        }
        this.url = url;
        this.createdAt = new Date;
    }

    static async shortenUrl(url: string) {

    }


}