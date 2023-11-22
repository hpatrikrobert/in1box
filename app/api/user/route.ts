import { NextResponse } from "next/server";
import connectDB from "@/libs/db";
import User from "@/models/user";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    await connectDB();
    await User.create({ firstName, lastName, email, password });
    return NextResponse.json({ message: "User created" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const users = await User.find();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server error" }, { status: 500 });
  }
}
