import connectDB from "@/libs/db";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request) {
    try {
        await connectDB();
        const res = await request.json();
        const email = res.email;
        const userCheck = await User.findOne({ email }).select("_id");
        return NextResponse.json({ userCheck });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "There is an error checking the users email" });
    }
}