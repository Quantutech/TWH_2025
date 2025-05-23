const HamburgerIcon = ({
  svg,
  path,
}: {
  svg?: React.SVGProps<SVGSVGElement>;
  path?: React.SVGProps<SVGPathElement>;
}) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}
    >
      <path
        d="M28 10.3333H4C3.45333 10.3333 3 9.88001 3 9.33334C3 8.78668 3.45333 8.33334 4 8.33334H28C28.5467 8.33334 29 8.78668 29 9.33334C29 9.88001 28.5467 10.3333 28 10.3333Z"
        fill={"#182734"}
        {...path}
      />
      <path
        d="M28 17H4C3.45333 17 3 16.5467 3 16C3 15.4533 3.45333 15 4 15H28C28.5467 15 29 15.4533 29 16C29 16.5467 28.5467 17 28 17Z"
        fill={"#182734"}
        {...path}
      />
      <path
        d="M28 23.6667H4C3.45333 23.6667 3 23.2133 3 22.6667C3 22.12 3.45333 21.6667 4 21.6667H28C28.5467 21.6667 29 22.12 29 22.6667C29 23.2133 28.5467 23.6667 28 23.6667Z"
        fill={"#182734"}
        {...path}
      />
    </svg>
  );
};

export default HamburgerIcon;
