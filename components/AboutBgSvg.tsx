import Image from "next/image";

import dotsDark from "../public/extra/dots-dark.svg";
import arrow from "../public/extra/arrow.svg";

const AboutBgSvg: React.FC = () => {
  return (
    <>
      <span
        aria-hidden="true"
        className="bg-svg absolute bottom-12 -left-12 hidden lg:inline-block"
      >
        <Image src={dotsDark} width={102} height={153} alt="dots background" />
      </span>
      <span
        aria-hidden="true"
        className="bg-svg absolute bottom-96 -right-4 hidden lg:inline-block"
      >
        <Image src={dotsDark} width={102} height={153} alt="dots background" />
      </span>
      <span
        aria-hidden="true"
        className="bg-svg hidden lg:inline-block absolute bottom-24 right-44"
      >
        <Image src={arrow} width={19} height={60} alt="up arrow" />
      </span>
    </>
  );
};

export default AboutBgSvg;
