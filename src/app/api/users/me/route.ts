import getDataFromToken from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    // Try to request user id
    const userId = await getDataFromToken(request);

    // Find user by id and select all fields except password
    const user = await User.findOne({ _id: userId }).select("-password").select("-__v");

    return NextResponse.json({
      message: "User found",
      data: user,
      success: true,
    });
  } catch (error: any) {
    // Error handling
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
