import { NextRequest, NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import connectDB from "@/libs/db";
import Mailbox from "@/models/mailbox";


export async function POST(request: NextRequest) {
    try {
        const { name, address, user_id } = await request.json();

        await connectDB();
        await Mailbox.create({ name, address, user_id });
        return NextResponse.json({ message: "Mailbox Created" }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const mailboxes = await Mailbox.find();
        return NextResponse.json({ mailboxes }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}