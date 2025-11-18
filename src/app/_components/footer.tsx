import Container from "@/app/_components/container";

export function Footer() {
  return (
    <footer className="bg-black border-t border-green-500/30 mt-16">
      <Container>
        <div className="py-12 sm:py-16">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
            <div className="flex-1">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter leading-tight mb-3 text-green-400">
                <span className="text-green-500">$</span> Contact Pi Sigma
              </h3>
              <p className="text-sm sm:text-base text-green-500/70 mb-4">
                Cybersecurity insights, technical deep-dives, and security research
              </p>
              <div className="flex flex-wrap gap-2">
                <a
                  href="mailto:contact@pisigma.io"
                  className="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 transition-colors font-mono"
                >
                  <span className="text-green-500 mr-2">@</span>contact@pisigma.io
                </a>
                <a
                  href="https://www.pisigma.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm border border-green-500/30 bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 transition-colors font-mono"
                >
                  <span className="text-green-500 mr-2">$</span>pisigma.io
                </a>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-xs text-green-500/60 font-mono mb-1">Social Links</span>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/pisigma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors font-mono"
                  >
                    <span className="text-green-500">$</span>
                    <span>github</span>
                  </a>
                  <a
                    href="https://twitter.com/pisigma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors font-mono"
                  >
                    <span className="text-green-500">$</span>
                    <span>twitter</span>
                  </a>
                  <a
                    href="https://linkedin.com/company/pisigma"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors font-mono"
                  >
                    <span className="text-green-500">$</span>
                    <span>linkedin</span>
                  </a>
                  <a
                    href="mailto:contact@pisigma.io"
                    className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors font-mono"
                  >
                    <span className="text-green-500">$</span>
                    <span>mail</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 pt-6 border-t border-green-500/20">
            <p className="text-xs text-green-500/50 text-center font-mono">
              <span className="text-green-500">#</span> Pi Sigma Team © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
