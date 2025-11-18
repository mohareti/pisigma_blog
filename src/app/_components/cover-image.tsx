import cn from "classnames";
import Link from "next/link";
import Image from "next/image";

type Props = {
  title: string;
  src: string;
  slug?: string;
};

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      className={cn("w-full h-full object-cover", {
        "hover:opacity-90 transition-opacity duration-200": slug,
      })}
      width={400}
      height={192}
      style={{ objectFit: 'cover' }}
    />
  );
  return (
    <div className="w-full h-full">
      {slug ? (
        <Link href={`/posts/${slug}`} aria-label={title} className="block w-full h-full">
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
};

export default CoverImage;
