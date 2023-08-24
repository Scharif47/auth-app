import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface TokenData {
  id: string; // Change this type to match your _id type
  username: string;
  email: string;
}

export default async function getDataFromToken(request: NextRequest) {
  try {
    // Get the token from the cookie or empty string
    const token = request.cookies.get("token")?.value || "";

    // Get the decoded token if valid
    const decodedToken = jwt.verify(
      token,
      process.env.TOKEN_SECRET!
    ) as TokenData;

    return decodedToken.id;
    
  } catch (error: any) {
    // Error occurred, throw error
    throw new Error(error.message);
  }
}
