import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new Response("Unauthorized access", { status: 401 });
    }

    if (!params.channelId) {
      return new Response("Channel ID missing", { status: 400 });
    }

    if (!serverId) {
      return new Response("Server ID missing", { status: 400 });
    }

    const channel = await db.channel.delete({
      where: {
        id: params.channelId,
        name: {
          not: "general"
        },
        server: {
          id: serverId,
          members: {
            some: {
              profileId: profile.id,
              role: {
                in: [MemberRole.ADMIN, MemberRole.MODERATOR]
              }
            }
          }
        }
      }
    })

    return new Response("Channel deleted successfully", { status: 200 });
  } catch (err) {
    console.log("[DELETE_CHANNEL]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentProfile();
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");

    if (!profile) {
      return new Response("Unauthorized access", { status: 401 });
    }

    if (!params.channelId) {
      return new Response("Channel ID missing", { status: 400 });
    }

    if (!serverId) {
      return new Response("Server ID missing", { status: 400 });
    }

    const { name, type } = await req.json();

    if (!name || !type) {
      return new Response("Data missing", { status: 400 });
    }

    const channel = await db.channel.update({
      where: {
        id: params.channelId,
        name: {
          not: "general"
        },
        server: {
          id: serverId,
          members: {
            some: {
              profileId: profile.id,
              role: {
                in: [MemberRole.ADMIN, MemberRole.MODERATOR]
              }
            }
          }
        }
      },
      data: {
        name,
        type
      }
    })

    return NextResponse.json(channel);
  } catch (err) {
    console.log("[EDIT_CHANNEL]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}