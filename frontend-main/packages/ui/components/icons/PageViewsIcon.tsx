const PageViewsIcon = ({
  svg,
  path,
}: {
  svg?: React.SVGProps<SVGSVGElement>;
  path?: React.SVGProps<SVGPathElement>;
}) => {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.3306 6.66114L15.4981 3.95168C15.8149 3.55651 16.2935 3.32642 16.8003 3.32642H23.2013C23.7082 3.32642 24.1868 3.55651 24.5036 3.95168L26.6695 6.66114V6.66114V8.3285C26.6695 9.24888 25.9225 9.99586 25.0021 9.99586H14.9979C14.0775 9.99586 13.3306 9.24888 13.3306 8.3285V6.66114V6.66114Z"
        stroke="#3F96B4"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
      <path
        d="M33.3389 20V9.99586C33.3389 8.15342 31.8466 6.66113 30.0042 6.66113H26.6694"
        stroke="#3F96B4"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
      <path
        d="M13.3306 6.66113H9.99586C8.15342 6.66113 6.66113 8.15342 6.66113 9.99586V31.6716C6.66113 33.514 8.15342 35.0063 9.99586 35.0063H20"
        stroke="#3F96B4"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24.6136 31.1563C24.1568 30.4627 24.1568 29.549 24.6136 28.8553C26.0276 26.7161 28.2485 25.0021 30.4711 25.0021C32.6937 25.0021 34.9129 26.7161 36.3285 28.8537C36.787 29.5473 36.787 30.4627 36.3285 31.1546C34.9113 33.2922 32.692 35.0062 30.4711 35.0062C28.2485 35.0079 26.0276 33.2939 24.6136 31.1563Z"
        stroke="#3F96B4"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
      <path
        d="M30.636 29.8391C30.7294 29.9325 30.7294 30.0809 30.636 30.1742C30.5426 30.2676 30.3942 30.2676 30.3009 30.1742C30.2075 30.0809 30.2075 29.9325 30.3009 29.8391C30.3959 29.7457 30.546 29.7457 30.636 29.8391"
        stroke="#3F96B4"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
      <path
        d="M13.3306 18.3327H26.6695"
        stroke="#3F96B4"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
      <path
        d="M13.3306 26.6695H16.6653"
        stroke="#3F96B4"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        {...path}
      />
    </svg>
  );
};

export default PageViewsIcon;
