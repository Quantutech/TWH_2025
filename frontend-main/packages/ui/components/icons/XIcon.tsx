const XIcon = ({
  svg,
  path,
}: {
  svg?: React.SVGProps<SVGSVGElement>;
  path?: React.SVGProps<SVGPathElement>;
}) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.2879 19.1667L8.66337 12.5751L2.87405 19.1667H0.424805L7.57674 11.026L0.424805 0.833374H6.71309L11.0717 7.04589L16.5327 0.833374H18.982L12.1619 8.59711L19.5762 19.1667H13.2879ZM16.0154 17.3084H14.3665L3.93176 2.69171H5.58092L9.7601 8.54434L10.4828 9.55993L16.0154 17.3084Z"
        fill="#589CB8"
        {...path}
      />
    </svg>
  );
};

export default XIcon;
