import connectDB from "@/libs/db";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

// export async function POST(req) {
//     try {
//         const user = await req.json();

//         const hashPassword = await bcrypt.hash(user.password, 10);
//         user.password = hashPassword;
//         await connectDB();
//         await User.create(user);

//         return NextResponse.json({ message: "User Registered." }, { status: 201 });
//     } catch (error) {
//         console.log(error);
//         return NextResponse.json({ message: "Failed to register user." }, { status: 500 });
//     }
// }

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
