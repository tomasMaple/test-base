import type { SVGProps } from "react";
const SvgBarcodeFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6 2C3.23858 2 1 4.23858 1 7V17C1 19.7614 3.23858 22 6 22H18C20.7614 22 23 19.7614 23 17V7C23 4.23858 20.7614 2 18 2H6ZM17 17V7H19V17H17ZM14 7H16V17H14V7ZM12 7H13V17H12V7ZM10 7H11V17H10V7ZM7 7H9V17H7V7ZM5 7H6V17H5V7Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgBarcodeFill;
