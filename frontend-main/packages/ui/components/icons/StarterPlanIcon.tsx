const StarterPlanIcon = ({
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
      <g filter="url(#filter0_d_1311_44910)">
        <path
          d="M2.5 11C2.5 5.75329 6.75329 1.5 12 1.5H40C45.2467 1.5 49.5 5.75329 49.5 11V39C49.5 44.2467 45.2467 48.5 40 48.5H12C6.75329 48.5 2.5 44.2467 2.5 39V11Z"
          stroke="#DBECF2"
          shape-rendering="crispEdges"
          {...path}
        />
        <path
          d="M16 27.5L25.6422 32.3211C25.7734 32.3867 25.839 32.4195 25.9078 32.4324C25.9687 32.4438 26.0313 32.4438 26.0922 32.4324C26.161 32.4195 26.2266 32.3867 26.3578 32.3211L36 27.5M16 22.5L25.6422 17.6789C25.7734 17.6133 25.839 17.5805 25.9078 17.5676C25.9687 17.5562 26.0313 17.5562 26.0922 17.5676C26.161 17.5805 26.2266 17.6133 26.3578 17.6789L36 22.5L26.3578 27.3211C26.2266 27.3867 26.161 27.4195 26.0922 27.4324C26.0313 27.4438 25.9687 27.4438 25.9078 27.4324C25.839 27.4195 25.7734 27.3867 25.6422 27.3211L16 22.5Z"
          stroke="#30576E"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          {...path}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1311_44910"
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
            result="effect1_dropShadow_1311_44910"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1311_44910"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default StarterPlanIcon;
