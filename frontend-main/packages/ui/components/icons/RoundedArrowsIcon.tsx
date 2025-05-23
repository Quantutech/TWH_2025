const RoundedArrowsIcon = ({
  svg,
  path,
}: {
  svg?: React.SVGProps<SVGSVGElement>;
  path?: React.SVGProps<SVGPathElement>;
}) => {
  return (
    <svg
      width="20"
      height="19"
      viewBox="0 0 20 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}
    >
      <path
        d="M18.3332 9.50008C18.3332 14.1001 14.5998 17.8334 9.99984 17.8334C5.39984 17.8334 2.5915 13.2001 2.5915 13.2001M2.5915 13.2001H6.35817M2.5915 13.2001V17.3667M1.6665 9.50008C1.6665 4.90008 5.3665 1.16675 9.99984 1.16675C15.5582 1.16675 18.3332 5.80008 18.3332 5.80008M18.3332 5.80008V1.63341M18.3332 5.80008H14.6332"
        stroke="#4A90E2"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
    </svg>
  );
};

export default RoundedArrowsIcon;
