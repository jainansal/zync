import { db } from "@/lib/db";
import { NextResponse } from "next/server";

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
