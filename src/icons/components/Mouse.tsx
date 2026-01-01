import type { SVGProps } from "react";
const SvgMouse = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V9C11 9.55228 11.4477 10 12 10C12.5523 10 13 9.55228 13 9V7Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11 2C7.68629 2 5 4.68629 5 8V16C5 19.3137 7.68629 22 11 22H13C16.3137 22 19 19.3137 19 16V8C19 4.68629 16.3137 2 13 2H11ZM7 8C7 5.79086 8.79086 4 11 4H13C15.2091 4 17 5.79086 17 8V16C17 18.2091 15.2091 20 13 20H11C8.79086 20 7 18.2091 7 16V8Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgMouse;
