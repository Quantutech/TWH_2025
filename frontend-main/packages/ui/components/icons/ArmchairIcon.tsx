const ArmchairIcon = ({
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
        d="M4.16667 15.1633V17.5"
        stroke={"#3D3D3D"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
      <path
        d="M15.8334 15.1633V17.5"
        stroke={"#3D3D3D"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
      <path
        d="M16.6666 9.16667V6.66667C16.6666 5.74619 15.9205 5 15 5H4.99998C4.07951 5 3.33331 5.74619 3.33331 6.66667V9.16667"
        stroke={"#3D3D3D"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.3334 12.5H6.66669C5.74621 12.5 5.00002 11.7538 5.00002 10.8333V10.8333C5.00002 9.91282 4.25383 9.16663 3.33335 9.16663V9.16663C2.41288 9.16663 1.66669 9.91282 1.66669 10.8333V10.8333C1.66669 13.5947 3.90526 15.8333 6.66669 15.8333H13.3334C16.0948 15.8333 18.3334 13.5947 18.3334 10.8333V10.8333C18.3334 9.91282 17.5872 9.16663 16.6667 9.16663V9.16663C15.7462 9.16663 15 9.91282 15 10.8333V10.8333C15 11.7538 14.2538 12.5 13.3334 12.5Z"
        stroke={"#3D3D3D"}
        stroke-width="1.2"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
    </svg>
  );
};

export default ArmchairIcon;
