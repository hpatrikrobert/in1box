import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/libs/db";
import Email from "@/models/email";


export async function GET(request: NextRequest, { params }: {params: { id: string }}) {
    try {
        const { id } = params;
        await connectDB();
        const email = await Email.findById(id);
        return NextResponse.json({ email });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}