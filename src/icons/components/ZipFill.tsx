import type { SVGProps } from "react";
const SvgZipFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM12.0001 14L12 12H14.0001V10H12V8H14.0001V6H12.0001V4H10V6H12.0001L12 8H10V10H12V12H10V14H12.0001ZM12.0001 14H14.0001V16H12L12.0001 14Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgZipFill;
