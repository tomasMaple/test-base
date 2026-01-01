import type { SVGProps } from "react";
const SvgShapeBoundary = (props: SVGProps<SVGSVGElement>) => (
  <svg
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 6C5 5.44772 5.44772 5 6 5H18C18.5523 5 19 5.44772 19 6V18C19 18.5523 18.5523 19 18 19H6C5.44772 19 5 18.5523 5 18V6ZM7 7V17H17V7H7Z"
      fill="currentColor"
    />
    <path d="M5 2H7V4H5V2Z" fill="currentColor" />
    <path d="M5 22V20H7V22H5Z" fill="currentColor" />
    <path d="M17 22V20H19V22H17Z" fill="currentColor" />
    <path d="M17 2H19V4H17V2Z" fill="currentColor" />
    <path d="M22 19H20V17H22V19Z" fill="currentColor" />
    <path d="M20 5H22V7H20V5Z" fill="currentColor" />
    <path d="M4 19H2V17H4V19Z" fill="currentColor" />
    <path d="M2 5H4V7H2V5Z" fill="currentColor" />
  </svg>
);
export default SvgShapeBoundary;
