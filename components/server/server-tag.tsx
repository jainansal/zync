interface ServerTagProps {
  name: string;
  color: string;
}

const ServerTag = ({ name, color }: ServerTagProps) => {
  return <div className="rounded-xl py-1 px-2 text-sm">{name}</div>;
};

export default ServerTag;
