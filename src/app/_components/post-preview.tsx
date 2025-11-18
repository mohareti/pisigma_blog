import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <div className="border border-green-500/30 p-3 sm:p-4 bg-green-500/5 hover:bg-green-500/10 transition-colors h-full flex flex-col">
      <div className="mb-3 sm:mb-4 relative w-full h-40 sm:h-44 md:h-48 overflow-hidden bg-green-500/10 border border-green-500/30">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-base sm:text-lg mb-2 leading-snug text-green-400 line-clamp-2">
        <span className="text-green-500 mr-2">$</span>
        <Link href={`/posts/${slug}`} className="hover:text-green-300 transition-colors">
          {title}
        </Link>
      </h3>
      <div className="text-xs sm:text-sm mb-2 sm:mb-3 text-green-500/70">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 text-green-500/80 line-clamp-3 flex-1">{excerpt}</p>
      <div className="mt-auto pt-2 border-t border-green-500/20">
        <Avatar name={author.name} picture={author.picture} />
      </div>
    </div>
  );
}
