import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";
import cn from "classnames";

type Props = {
  preview?: boolean;
};

const Alert = ({ preview }: Props) => {
  if (!preview) return null;
  
  return (
    <div className="border-b border-green-500/30 bg-black">
      <Container>
        <div className="py-2 text-center text-sm text-green-500">
          <span className="text-green-400">[PREVIEW MODE]</span> This page is a preview.{" "}
          <a
            href="/api/exit-preview"
            className="text-green-400 hover:text-green-300 duration-200 transition-colors"
          >
            Click here
          </a>{" "}
          to exit preview mode.
        </div>
      </Container>
    </div>
  );
};

export default Alert;
