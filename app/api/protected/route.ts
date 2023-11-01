import { getServerSession } from "@/auth"
import { NextRequest } from "next/server"

export const GET = async (req: NextRequest) => {
  const session = await getServerSession();

  if (session) {
    return Response.json({ data: "Protected data" })
  }

  return Response.json({ message: "Not authenticated" }, { status: 401 })
}
