import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new Response("Unauthorized access", { status: 401 });
    }

    if (!params.serverId) {
      return new Response("Server ID missing", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: params.serverId
      },
      data: {
        inviteCode: uuidv4()
      }
    });

    return NextResponse.json(server);
  } catch (err) {
    console.log("[INVITE_CODE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}