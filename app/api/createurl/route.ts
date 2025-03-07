import { type NextRequest, NextResponse } from "next/server"
import { schemaCreateUrl } from "@/lib/zod-schema"
import { generateAndSaveUrl } from "@/controller/url"

interface RequestBody {
    url: string
}

export async function POST(req: NextRequest) {
    const body: RequestBody = await req.json()

    console.log("body", body)
    try {
        const isValidate = schemaCreateUrl.safeParse(body)
        if (!isValidate.success) {
            return NextResponse.json(
                { message: "no se pudo validar la url", error: isValidate.error.errors},
                { status: 400 }
            )
        }
        await generateAndSaveUrl(body.url)
        return NextResponse.json(
            { message: "datos ingresados correctamente", success: true },
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json(
            { message: "hubo un error al ingresar los datos", error: error.message, success: false },
            { status: 500 }
        )
    }
}
