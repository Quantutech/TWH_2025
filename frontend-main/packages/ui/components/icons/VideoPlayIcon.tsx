const VideoPlayIcon = ({
  svg,
  path,
}: {
  svg?: React.SVGProps<SVGSVGElement>;
  path?: React.SVGProps<SVGPathElement>;
}) => {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svg}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M24 48.0001C37.2548 48.0001 48 37.2549 48 24.0001C48 10.7452 37.2548 6.10352e-05 24 6.10352e-05C10.7452 6.10352e-05 0 10.7452 0 24.0001C0 37.2549 10.7452 48.0001 24 48.0001ZM20.25 32.8033L33.75 25.2577C34.75 24.6987 34.75 23.3014 33.75 22.7425L20.25 15.1968C19.25 14.6378 18 15.3365 18 16.4544V31.5457C18 32.6636 19.25 33.3623 20.25 32.8033Z"
        fill={"#FFFFFF"}
        fill-opacity="0.3"
        {...path}
      />
    </svg>
  );
};

export default VideoPlayIcon;
