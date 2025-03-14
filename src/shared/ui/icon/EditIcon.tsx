interface EditIconProps {
  className?: string;
}

export const EditIcon = ({ className }: EditIconProps) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 19 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.02 1.4437C13.5084 0.955757 14.3002 0.955757 14.7886 1.4437L17.5638 4.2165C18.0521 4.70444 18.0521 5.49556 17.5638 5.9835L7.54448 15.9941C7.34273 16.1957 7.07806 16.3223 6.79439 16.3529L3.68347 16.6883C2.88993 16.7738 2.22034 16.1048 2.30598 15.312L2.64169 12.2038C2.6723 11.9203 2.79899 11.6559 3.00074 11.4543L13.02 1.4437Z"
        stroke-width="1.5"
      />
      <rect
        x="0.350303"
        width="3.46633"
        height="0.495189"
        transform="matrix(0.707413 0.7068 0.707413 -0.7068 12.0244 4.20211)"
        fill="white"
        stroke-width="0.495189"
      />
    </svg>
  );
};
