import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = process.env.SUPABASE_URL!
const supabaseKey: string = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)


export async function insertData() {
    try {
        const { data, error } = await supabase
            .from("countries")
            .insert({ id: 3, name: "brasil" })

        if (error) {
            throw new Error(error.message)
        }
        console.log("data", data)
        return data

    } catch (error: any) {
        console.error(`Hubo un problema al insertar los datos:${error.message}`)
        throw error
    }
}

