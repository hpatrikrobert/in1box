import { NextResponse } from "next/server";
import connectDB from "@/libs/db";
import Email from "@/models/email";

export async function POST(request) {
    try {
        const { sender, title, content } = await request.json();
        await connectDB();
        await Email.create({ sender, title, content });
        return NextResponse.json({ message: "Email Created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const emails = await Email.find();
        return NextResponse.json({ emails }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}