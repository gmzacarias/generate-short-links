import { type NextRequest, NextResponse } from "next/server"
import { generateAndSaveUrl } from "@/controller/url"

export async function Delete(req: NextRequest,{params}:{params:{id:string}}) {
    const id = await params.id
    try {
        
    } catch (error: any) {
        return NextResponse.json(
            { message: "hubo un error al eliminar los datos", error: error.message, success: false },
            { status: 500 }
        )
    }
}
