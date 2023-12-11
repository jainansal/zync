interface MemberIdPageProps {
  params: {
    serverId: string;
    memberId: string;
  };
}

const MemberIdPage = async ({ params }: MemberIdPageProps) => {
  return <div>MemberIdPage</div>;
};

export default MemberIdPage;
