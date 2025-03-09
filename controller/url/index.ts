import { Url } from "@/model/url"
enum Environment {
    Development = "development",
    Production = "production",
    Test = "test"
}
const currentEnvironment = process.env.NODE_ENV
let BASE_URL: string

if (currentEnvironment === Environment.Development) {
    BASE_URL = "http://localhost:3000"
} else if (currentEnvironment === Environment.Production) {
    BASE_URL = "https://google.com.ar"
} else if (currentEnvironment === Environment.Test) {
    BASE_URL = "https://testapi.com"
}

export async function generateAndSaveUrl(url: string) {
    const cleanUrl = Url.cleanUrl(url)
    try {
        const newUrl = new Url(cleanUrl)
        const shortUrl = Url.createShortUrl(`${BASE_URL}/api/redirect`, newUrl.code)
        let duplicateCode = true
        let finalCode: string = newUrl.code
        while (duplicateCode) {
            try {
                await Url.checkCode(finalCode)
                finalCode = Url.generateShortCode()    
            } catch (error) {
                duplicateCode=false
            }
        }
        const insertData = await Url.savedData(url, shortUrl, finalCode)
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
        await Url.countVisits(verifyCode.id)
        const originalUrl = verifyCode.url
        return originalUrl
    } catch (error: any) {
        console.error("no se pudo redirigir a la url solicitada:", error.message)
        throw new Error(error.message)
    }
}