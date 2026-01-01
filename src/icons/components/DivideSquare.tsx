import type { SVGProps } from "react";
const SvgDivideSquare = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13 9C13 8.44772 12.5523 8 12 8C11.4477 8 11 8.44782 11 9.0001C11 9.55238 11.4477 10.0001 12 10.0001C12.5523 10.0001 13 9.55228 13 9Z"
      fill="currentColor"
    />
    <path
      d="M13 15C13 14.4477 12.5523 14 12 14C11.4477 14 11 14.4478 11 15.0001C11 15.5524 11.4477 16.0001 12 16.0001C12.5523 16.0001 13 15.5523 13 15Z"
      fill="currentColor"
    />
    <path
      d="M8 12C8 11.4477 8.44772 11 9 11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H9C8.44772 13 8 12.5523 8 12Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM4 7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgDivideSquare;
