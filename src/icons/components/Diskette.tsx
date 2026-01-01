import type { SVGProps } from "react";
const SvgDiskette = (props: SVGProps<SVGSVGElement>) => (
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
      d="M8 12C7.44772 12 7 12.4477 7 13C7 13.5523 7.44772 14 8 14H16C16.5523 14 17 13.5523 17 13C17 12.4477 16.5523 12 16 12H8Z"
      fill="currentColor"
    />
    <path
      d="M7 17C7 16.4477 7.44772 16 8 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H8C7.44772 18 7 17.5523 7 17Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V8C22 7.77293 21.9227 7.55262 21.7809 7.37531L17.7809 2.3753C17.5911 2.13809 17.3038 2 17 2H7ZM7 4C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H17C18.6569 20 20 18.6569 20 17V8.35078L17 4.60078V9C17 9.55228 16.5523 10 16 10H8C7.44772 10 7 9.55228 7 9V4ZM15 4H9V8H15V4Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgDiskette;
