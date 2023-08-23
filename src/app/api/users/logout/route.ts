import { NextResponse } from "next/server";

// Function to logout the user
export async function GET() {
  try {
    // Try to logout the user
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });

    // Clear the token cookie
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    // Error handling
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
