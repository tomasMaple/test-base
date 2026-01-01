import type { SVGProps } from "react";
const SvgPlugin = (props: SVGProps<SVGSVGElement>) => (
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
      d="M5 12C5 9.23858 7.23858 7 10 7H14C16.7614 7 19 9.23858 19 12V14C19 16.7614 16.7614 19 14 19H10C7.23858 19 5 16.7614 5 14V12ZM10 9C8.34315 9 7 10.3431 7 12V14C7 15.6569 8.34315 17 10 17H14C15.6569 17 17 15.6569 17 14V12C17 10.3431 15.6569 9 14 9H10Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 2C8.55228 2 9 2.44772 9 3V8C9 8.55228 8.55228 9 8 9C7.44772 9 7 8.55228 7 8V3C7 2.44772 7.44772 2 8 2Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16 2C16.5523 2 17 2.44772 17 3V8C17 8.55228 16.5523 9 16 9C15.4477 9 15 8.55228 15 8V3C15 2.44772 15.4477 2 16 2Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 18C12.5523 18 13 18.4477 13 19V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V19C11 18.4477 11.4477 18 12 18Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgPlugin;
