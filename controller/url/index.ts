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

export async function generateAndSaveUrl(url: string) {
    const cleanUrl = Url.cleanUrl(url)
    try {
        const newUrl = new Url(cleanUrl)
        const verifyCode = await Url.checkCode(newUrl.code)
        if (verifyCode) {
            throw new Error("el codigo ya fue generado.")
        }
        const shortUrl = Url.createShortUrl(BASE_URL, newUrl.code)
        const insertData = await Url.savedData(url, shortUrl, newUrl.code)
        return insertData
    } catch (error: any) {
        console.error("No se pudo guardar los datos en Supabase:", error.message)
        throw new Error(error.message)
    }
}

export async function deleteById(id: string) {
    try {
        const dataId = await Url.checkId(id)
        const deleteId = await Url.deleteUrl(id)
        return deleteId
    } catch (error: any) {
        console.error("no se pudo eliminar el registro", error.message)
        throw new Error(error.message)
    }
}

export async function redirectUrl(code: string) {
    try {
        const verifyCode = await Url.checkCode(code)
        const originalUrl = verifyCode.url
        return originalUrl
    } catch (error: any) {
        console.error("no se pudo redirigir a la url solicitada:", error.message)
        throw new Error(error.message)
    }
}