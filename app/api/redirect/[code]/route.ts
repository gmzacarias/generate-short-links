import { type NextRequest, NextResponse } from "next/server"
import { redirectUrl } from "@/controller/url"

export async function GET(req: NextRequest, { params }: { params: { code: string } }) {
    const code = (await params).code
    try {
        if (!code) {
            return NextResponse.json(
                { message: "debe ingresar un code valido", success: false },
                { status: 400 }
            )
        }
        const url = await redirectUrl(code)
        if (!url) {
            return NextResponse.json(
                { message: "no se encontro una url valida", success: false },
                { status: 404 }
            )
        }
        return NextResponse.redirect(url, 301)
    } catch (error: any) {
        return NextResponse.json(
            { message: "hubo un error al redireccionar", error: error.message, success: false },
            { status: 500 }
        )
    }
}
