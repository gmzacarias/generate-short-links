import { type NextRequest, NextResponse } from "next/server"
import { insertData } from "@/lib/supabase-db"

export async function POST(req: NextRequest) {
    const data = req.body
    try {
        if (!data) {
            return NextResponse.json(
                { message: "Debes ingresar una consulta valida", success: false },
                { status: 404 }
            )
        }
        // const  = await insertData()
        return NextResponse.json(
            { message: "Se ejecuto exitosamente el codigo ingresado", success: true },
            { status: 200 }
        )
    } catch (error: any) {
        console.error("Error en la API: ", error.message)
        return NextResponse.json(
            { message: "hubo un error en el servidor", error: error.message, success: false },
            { status: 500 }
        )
    }
}