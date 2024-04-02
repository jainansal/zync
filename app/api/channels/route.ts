import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();

    if (!profile) {
      return new Response("Not signed in", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!serverId) {
      return new Response("Server ID missing", { status: 400 });
    }

    const { name, type, permissions } = await req.json();

    if (!name || !type || !permissions) {
      return new Response("Missing data", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: [
            {
              profileId: profile.id,
              name,
              type,
              permissions,
            },
          ],
        },
      },
    });

    return NextResponse.json(server);
  } catch (error) {
    console.log("[CHANNEL_CREATE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
