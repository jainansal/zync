import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { initalProfile } from "@/lib/intital-profile";

const SetupPage = async () => {
  const profile = await initalProfile();
  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <div>Create a server</div>;
};

export default SetupPage;
