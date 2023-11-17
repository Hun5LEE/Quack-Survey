import Link from "next/link";
import { HTMLAttributes } from "react";

interface ILinkInfoProps extends HTMLAttributes<HTMLSpanElement> {
  infoDescription: string;
  linkDescription: string;
  url: string;
}

const LinkInfo = ({
  infoDescription,
  linkDescription,
  url,
}: ILinkInfoProps) => {
  return (
    <div className="mt-[15px] flex justify-end">
      <span className="text-sm text-n-dark-gray">
        {infoDescription}
        <Link className="ml-1.5 hover:text-n-light-black" href={url || "#"}>
          {linkDescription}
        </Link>
      </span>
    </div>
  );
};

export default LinkInfo;
