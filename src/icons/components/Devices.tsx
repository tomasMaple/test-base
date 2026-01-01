import type { SVGProps } from "react";
const SvgDevices = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7C22 7.55228 21.5523 8 21 8C20.4477 8 20 7.55228 20 7C20 5.34315 18.6569 4 17 4H7C5.34315 4 4 5.34315 4 7V14C4 15.6569 5.34315 17 7 17H12C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19H7C4.23858 19 2 16.7614 2 14V7Z"
      fill="currentColor"
    />
    <path
      d="M3 21C3 20.4477 3.44772 20 4 20H12C12.5523 20 13 20.4477 13 21C13 21.5523 12.5523 22 12 22H4C3.44772 22 3 21.5523 3 21Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 9C15.3431 9 14 10.3431 14 12V19C14 20.6569 15.3431 22 17 22H20C21.6569 22 23 20.6569 23 19V12C23 10.3431 21.6569 9 20 9H17ZM16 12C16 11.4477 16.4477 11 17 11H20C20.5523 11 21 11.4477 21 12V19C21 19.5523 20.5523 20 20 20H17C16.4477 20 16 19.5523 16 19V12Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgDevices;
