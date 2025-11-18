type Props = {
  name: string;
  picture?: string;
};

const Avatar = ({ name, picture }: Props) => {
  // Extract initials or use first part of name for minimal tag
  const getTag = () => {
    const parts = name.split(' ');
    if (parts.length > 1) {
      return parts.map(p => p[0]).join('').toUpperCase().slice(0, 2);
    }
    return name.slice(0, 2).toUpperCase();
  };

  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center px-2 py-1 text-xs font-mono border border-green-500/30 bg-green-500/10 text-green-400">
        <span className="text-green-500 mr-1">#</span>
        {getTag()}
      </span>
      <span className="text-xs text-green-500/60 hidden sm:inline">
        {name}
      </span>
    </div>
  );
};

export default Avatar;
