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

async function generateLink(url: string) {




}
