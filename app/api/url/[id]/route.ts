import { type NextRequest, NextResponse } from "next/server"
import {schemaDeleteId} from "@/lib/zod-schema"
import { deleteById } from "@/controller/url"

export async function DELETE(req: NextRequest, { params }: { params:Promise<{ id: string }>}) {
    const paramsId= await params
    try {
        const isValidate=schemaDeleteId.safeParse(paramsId)
        if (!isValidate.success) {
            return NextResponse.json(
                { message: "debe ingresar una id valida",error:isValidate.error.errors},
                { status: 400 }
            )
        }
        await deleteById(paramsId.id)
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
