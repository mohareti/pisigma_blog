type Props = {
  name: string;
  picture: string;
};

const Avatar = ({ name, picture }: Props) => {
  return (
    <div className="flex items-center">
      {picture && (
        <img src={picture} className="w-12 h-12 rounded-full mr-4 border-2 border-green-500" alt={name} />
      )}
      <div className="text-xl font-bold text-green-400">
        <span className="text-green-500 mr-2">@</span>{name}
      </div>
    </div>
  );
};

export default Avatar;
