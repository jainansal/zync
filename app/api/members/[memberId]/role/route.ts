import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { memberId: string } }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Not signed in", { status: 401 });
    }

    const { serverId, role } = await req.json();
    if (!serverId || !params.memberId || !role) {
      return new NextResponse("Missing data", { status: 400 });
    }

    const server = await db.server.update({
      where: {
        id: serverId,
        profileId: profile.id
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
              profileId: {
                not: profile.id
              }
            },
            data: {
              role
            }
          },
        }
      },
      include: {
        members: {
          include: {
            profile: true
          },
          orderBy: {
            role: "asc"
          }
        }
      }
    });

    return NextResponse.json(server);

  } catch (err) {
    console.log("[MEMBER_ID_ROLE]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}