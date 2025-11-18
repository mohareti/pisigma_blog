type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => {
  return <div className="container mx-auto px-4 sm:px-5 max-w-7xl w-full">{children}</div>;
};

export default Container;
