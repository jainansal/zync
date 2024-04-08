import { NextResponse } from "next/server";
import { MemberRole } from "@prisma/client";

import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const TAGS_COUNT = 5;
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");
    if (!name) {
      return new NextResponse("Name query must be passed", { status: 401 });
    }

    const data = await db.tag.findMany({
      where: {
        name: {
          contains: name,
        },
      },
      take: TAGS_COUNT,
    });

    return NextResponse.json({ tags: data });
  } catch (error) {
    console.log(`[GET_TAGS]`, error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new Response("Unauthorized access", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    const name = searchParams.get("name");
    if (!name || !serverId) {
      return new Response("Search Params missing", { status: 400 });
    }

    const server = await db.server.findFirst({
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
    });
    if (!server) {
      return new Response("Server not found", { status: 404 });
    }

    const tag = await db.tag.upsert({
      where: {
        name,
      },
      create: {
        name,
        color: "green",
      },
      update: {},
    });

    await db.serverTag.upsert({
      where: {
        serverId_tagId: {
          serverId,
          tagId: tag.id,
        },
      },
      create: {
        serverId,
        tagId: tag.id,
      },
      update: {},
    });

    return NextResponse.json({ server });
  } catch (error) {
    console.log(`[ADD_SERVER_TAG]`, error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
