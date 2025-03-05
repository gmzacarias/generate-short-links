import { type NextRequest, NextResponse } from "next/server"
import { insertData } from "@/lib/supabase-db"

export async function POST(req: NextRequest) {
    try {
        const createData = await insertData()

        return NextResponse.json(
            { message:"dato agregado", success: true },
            { status: 200 }
        )
    } catch (error: any) {
        console.error("Error en la API: ", error.message)
        return NextResponse.json(
            { message: "hubo un error al ingresar los datos", error: error.message, success: false },
            { status: 500 }
        )
    }
}
