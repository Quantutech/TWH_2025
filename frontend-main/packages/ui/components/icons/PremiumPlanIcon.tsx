const PremiumPlanIcon = ({
  svg,
  path,
}: {
  svg?: React.SVGProps<SVGSVGElement>;
  path?: React.SVGProps<SVGPathElement>;
}) => {
  return (
    <svg
      width="52"
      height="52"
      viewBox="0 0 52 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}
    >
      <g filter="url(#filter0_d_1311_44914)">
        <path
          d="M2.5 11C2.5 5.75329 6.75329 1.5 12 1.5H40C45.2467 1.5 49.5 5.75329 49.5 11V39C49.5 44.2467 45.2467 48.5 40 48.5H12C6.75329 48.5 2.5 44.2467 2.5 39V11Z"
          stroke="#DBECF2"
          shape-rendering="crispEdges"
          {...path}
        />
        <path
          d="M16 25L25.6422 29.8211C25.7734 29.8867 25.839 29.9195 25.9078 29.9324C25.9687 29.9438 26.0313 29.9438 26.0922 29.9324C26.161 29.9195 26.2266 29.8867 26.3578 29.8211L36 25M16 30L25.6422 34.8211C25.7734 34.8867 25.839 34.9195 25.9078 34.9324C25.9687 34.9438 26.0313 34.9438 26.0922 34.9324C26.161 34.9195 26.2266 34.8867 26.3578 34.8211L36 30M16 20L25.6422 15.1789C25.7734 15.1133 25.839 15.0805 25.9078 15.0676C25.9687 15.0562 26.0313 15.0562 26.0922 15.0676C26.161 15.0805 26.2266 15.1133 26.3578 15.1789L36 20L26.3578 24.8211C26.2266 24.8867 26.161 24.9195 26.0922 24.9324C26.0313 24.9438 25.9687 24.9438 25.9078 24.9324C25.839 24.9195 25.7734 24.8867 25.6422 24.8211L16 20Z"
          stroke="#30576E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          {...path}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1311_44914"
          x="0"
          y="0"
          width="52"
          height="52"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.0627451 0 0 0 0 0.0941176 0 0 0 0 0.156863 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1311_44914"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1311_44914"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default PremiumPlanIcon;
