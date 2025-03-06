import { type NextRequest, NextResponse } from "next/server"
import { generateAndSaveUrl } from "@/controller/url"

export async function POST(req: NextRequest) {
    const { url } = await req.json() as any
    try {
        await generateAndSaveUrl(url)
        if (!url) {
            return NextResponse.json(
                { message: "debe ingresar una url valida", success: false },
                { status: 400 }
            )
        }
        return NextResponse.json(
            { message: "dato agregado", success: true },
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json(
            { message: "hubo un error al ingresar los datos", error: error.message, success: false },
            { status: 500 }
        )
    }
}
