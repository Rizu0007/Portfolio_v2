type Props = {
  href: string;
  targetBlank?: boolean;
  outline?: boolean;
  className?: string;
  children: React.ReactNode;
};

const LinkButton: React.FC<Props> = ({
  href,
  targetBlank = false,
  outline = false,
  className = "",
  children,
}) => {
  return (
    <a
      role="button"
      className={`${
        outline
          ? "border border-carrigreen hover:bg-carrigreen text-carrigreen hover:text-carddark transition"
          : "bg-carrigreen hover:bg-carrilight active:bg-carridark text-bgdark"
      } py-2 px-3 rounded lg:text-xl ${className} outline-carrigreen focus-visible:outline-double outline-offset-2`}
      href={href}
      target={`${targetBlank ? "_blank" : "_self"}`}
    >
      {children}
    </a>
  );
};

export default LinkButton;
