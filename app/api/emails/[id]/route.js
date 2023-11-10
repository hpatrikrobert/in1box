import { NextResponse } from "next/server";
import connectDB from "@/libs/db";
import Email from "@/models/email";


export async function GET(request, { params }) {
    try {
        const { id } = params;
        await connectDB();
        const email = await Email.findById(id);
        return NextResponse.json({ email });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}