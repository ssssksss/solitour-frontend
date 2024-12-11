interface ReportIconProps {
  className?: string;
}

const ReportIcon = ({ className }: ReportIconProps) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      stroke="#A3A3A3"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.75"
        y="12.3214"
        width="16.5"
        height="4.92857"
        rx="2.46429"
        stroke="inherit"
        stroke-width="1.5"
      />
      <mask id="path-2-inside-1_3274_14472" fill="white">
        <path d="M2.25 6.75C2.25 3.02208 5.27208 0 9 0C12.7279 0 15.75 3.02208 15.75 6.75V11.8571C15.75 12.4094 15.3023 12.8571 14.75 12.8571H3.25C2.69772 12.8571 2.25 12.4094 2.25 11.8571V6.75Z" />
      </mask>
      <path
        d="M2.25 6.75C2.25 3.02208 5.27208 0 9 0C12.7279 0 15.75 3.02208 15.75 6.75V11.8571C15.75 12.4094 15.3023 12.8571 14.75 12.8571H3.25C2.69772 12.8571 2.25 12.4094 2.25 11.8571V6.75Z"
        stroke="inherit"
        stroke-width="3"
        mask="url(#path-2-inside-1_3274_14472)"
      />
      <path
        d="M8.43799 4.49989C7.91303 4.6117 6.75049 5.14279 6.18802 7.07126"
        stroke="inherit"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default ReportIcon;
