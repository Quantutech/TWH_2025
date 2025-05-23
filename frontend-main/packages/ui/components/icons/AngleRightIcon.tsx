const AngleRightIcon = ({
  svg,
  path,
}: {
  svg?: React.SVGProps<SVGSVGElement>;
  path?: React.SVGProps<SVGPathElement>;
}) => {
  return (
    <svg
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}
    >
      <path
        d="M6 12.5L10 8.5L6 4.5"
        stroke="#BDBDBD"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
    </svg>
  );
};

export default AngleRightIcon;
