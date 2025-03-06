import { Url } from "@/model/url"
enum Environment {
    Development = "development",
    Production = "production",
    Test = "test"
}
const currentEnvironment = process.env.NODE_ENV
let BASE_URL: string

if (currentEnvironment === Environment.Development) {
    BASE_URL = "https://localhost:3000"
} else if (currentEnvironment === Environment.Production) {
    BASE_URL = "https://google.com.ar"
} else if (currentEnvironment === Environment.Test) {
    BASE_URL = "https://testapi.com"
}

export async function generateAndSaveUrl (url: string) {
    const cleanUrl = Url.cleanUrl(url)
    try {
        const newUrl = new Url(cleanUrl)
        const verifyCode = await Url.checkCode(newUrl.code)
        if (verifyCode) {
            throw new Error("el codigo ya fue generado.")
        }
        const insertData = await Url.savedData(url, newUrl.short_url, newUrl.code)
        return insertData
    } catch (error: any) {
        console.error("No se pudo guardar los datos en Supabase:", error.message)
        throw Error
    }
}
