import { type NextRequest, NextResponse } from "next/server"
import { schemaRedirectUrl } from "@/lib/zod-schema"
import { redirectUrl } from "@/controller/url"

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
    const paramsCode = {code:params.slug}
    try {
        const isValidate = schemaRedirectUrl.safeParse(paramsCode)
        if (!isValidate.success) {
            return NextResponse.json(
                { message: "debe ingresar un code valido",error:isValidate.error.errors },
                { status: 400 }
            )
        }
        //agregar schema para validar si hay una url valida
        const url = await redirectUrl(paramsCode.code)
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
