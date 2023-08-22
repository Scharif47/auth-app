import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// Connect to database
connect();

// Function to post a login request
export async function POST(request: NextRequest) {
  // Try to handle the request
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log("reqBody", reqBody);

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      // User does not exist, show as 400 bad request
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      // Password is incorrect, show as 400 bad request
      return NextResponse.json(
        { error: "Password is incorrect" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    // Error occurred, show as 500 internal server error and print error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
