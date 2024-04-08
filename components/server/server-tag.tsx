interface ServerTagProps {
  name: string;
  color: string;
}

const ServerTag = ({ name, color }: ServerTagProps) => {
  // TODO: Make color a little transparent
  return (
    <div
      className="rounded-xl py-1 px-2 text-sm"
      style={{
        backgroundColor: color,
      }}
    >
      {name}
    </div>
  );
};

export default ServerTag;
