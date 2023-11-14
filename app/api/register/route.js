import connectDB from "@/libs/db";
import User from "@/models/user";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
    try {
        const user = await req.json();

        const hashPassword = await bcrypt.hash(user.password, 10);
        user.password = hashPassword;
        await connectDB();
        await User.create(user);

        return NextResponse.json({ message: "User Registered." }, { status: 201 });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to register user." }, { status: 500 });
    }
}