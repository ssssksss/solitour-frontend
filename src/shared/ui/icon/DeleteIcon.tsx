interface DeleteIconProps {
  className?: string;
}

export const DeleteIcon = ({ className }: DeleteIconProps) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.07422 3.06006H16.9271"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.02734 13.9497L6.02734 6.03011"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M9 13.9497L9 6.03011" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M11.9727 13.9497L11.9727 6.03011"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.03711 1.59033H10.9636C11.2397 1.59033 11.4636 1.81419 11.4636 2.09033V2.55013H6.53711V2.09033C6.53711 1.81419 6.76097 1.59033 7.03711 1.59033ZM5.03711 2.09033C5.03711 0.985761 5.93254 0.090332 7.03711 0.090332H10.9636C12.0681 0.090332 12.9636 0.985763 12.9636 2.09033V2.55013V3.06018H5.03711V2.55013V2.09033Z"
        strokeWidth="0.1"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.06445 5.04008V13.9094C2.06445 16.1186 3.85531 17.9094 6.06445 17.9094H11.9358C14.1449 17.9094 15.9358 16.1186 15.9358 13.9094V5.04008H14.4358V13.9094C14.4358 15.2901 13.3165 16.4094 11.9358 16.4094H6.06445C4.68374 16.4094 3.56445 15.2901 3.56445 13.9094V5.04008H2.06445Z"
        strokeWidth="0.1"
      />
    </svg>
  );
};
