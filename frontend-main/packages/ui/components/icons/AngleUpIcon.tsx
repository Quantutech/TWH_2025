const AngleUpIcon = ({
  svg,
  path,
}: {
  svg?: React.SVGProps<SVGSVGElement>;
  path?: React.SVGProps<SVGPathElement>;
}) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}
    >
      <path
        d="M3.22003 10.0333L7.5667 5.68666C8.08003 5.17332 8.92003 5.17332 9.43336 5.68666L13.78 10.0333"
        stroke={"#292929"}
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...path}
      />
    </svg>
  );
};

export default AngleUpIcon;
