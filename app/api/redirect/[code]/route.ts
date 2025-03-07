import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest, { params }: { params: { code: string } }) {
    const code = (await params).code
    try {
        if (!code) {
            return NextResponse.json(
                { message: "debe ingresar un code valido", success: false },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { success: true },
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json(
            { message: "hubo un error al redireccionar", error: error.message, success: false },
            { status: 500 }
        )
    }
}
