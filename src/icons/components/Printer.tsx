import type { SVGProps } from "react";
const SvgPrinter = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18 10C17.4477 10 17 10.4477 17 11C17 11.5523 17.4478 12 18.0001 12C18.5524 12 19.0001 11.5523 19.0001 11C19.0001 10.4477 18.5523 10 18 10Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6 1C6 0.447715 6.44772 0 7 0H17C17.5523 0 18 0.447715 18 1V6C20.7614 6 23 8.23858 23 11V15C23 17.7614 20.7614 20 18 20C18 21.1046 17.1046 22 16 22H8C6.89543 22 6 21.1046 6 20C3.23858 20 1 17.7614 1 15V11C1 8.23858 3.23858 6 6 6V1ZM3 11C3 9.34315 4.34315 8 6 8H18C19.6569 8 21 9.34315 21 11V15C21 16.6569 19.6569 18 18 18V15C18 13.8954 17.1046 13 16 13H8C6.89543 13 6 13.8954 6 15V18C4.34315 18 3 16.6569 3 15V11ZM16 2V6H8V2H16ZM8 15H16V20H8V15Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgPrinter;
