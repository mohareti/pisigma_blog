import Link from "next/link";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-black/95 border-b border-green-500/30 backdrop-blur-md shadow-lg shadow-green-500/10">
      <div className="container mx-auto px-5 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-green-500 mr-2 text-xl">$</span>
          <Link href="/" className="text-xl md:text-2xl font-bold text-green-400 hover:text-green-300 transition-colors">
            Blog
          </Link>
          <span className="animate-pulse ml-1 text-xl">_</span>
        </div>
        <a
          href="https://www.pisigma.io/contact"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500/10 hover:bg-green-500/20 border border-green-500 text-green-400 font-bold py-2 px-4 md:px-6 transition-colors duration-200 text-sm md:text-base"
        >
          [ Contact Us ]
        </a>
      </div>
    </header>
  );
};

export default Header;
