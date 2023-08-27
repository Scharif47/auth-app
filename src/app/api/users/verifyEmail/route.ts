import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";

// Connect to database
connect();

export async function POST(request: NextRequest) {
  try {
    // Get request body
    const reqBody = await request.json();

    // Get token from request body
    const { token } = reqBody;

    // Find user by token
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() }, // Check if expiry date is greater than current date
    });

    // If user not found
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    // Update user
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error: any) {
    // Error handling
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
