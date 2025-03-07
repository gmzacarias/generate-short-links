import { type NextRequest, NextResponse } from "next/server"
import { deleteById } from "@/controller/url"

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
    const id= (await params).id
    try {
        if (!id) {
            return NextResponse.json(
                { message: "debe ingresar una id valida", success: false },
                { status: 400 }
            )
        }
        await deleteById(id)
        return NextResponse.json(
            { message: "datos eliminados correctamente", success: true },
            { status: 200 }
        )
    } catch (error: any) {
        return NextResponse.json(
            { message: "hubo un error al eliminar los datos", error: error.message, success: false },
            { status: 500 }
        )
    }
}
