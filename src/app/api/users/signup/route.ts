import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// Connect to database
connect();

// Function to post a signup request
export async function POST(request: NextRequest) {
  // Try to handle the request
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    console.log("reqBody", reqBody);

    // Check if user already exists
    const user = await User.findOne({ email });

    if (user) {
      // User already exists, show as 400 bad request
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to database
    const savedUser = await newUser.save();

    console.log("savedUser: ", savedUser);

    // Return success response
    return NextResponse.json(
      { message: "User created successfully", success: true, savedUser },
      { status: 200 }
    );
  } catch (error: any) {
    // Error occurred, show as 500 internal server error and print error
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
