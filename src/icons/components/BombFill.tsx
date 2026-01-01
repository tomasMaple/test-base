import type { SVGProps } from "react";
const SvgBombFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M14.5 3C13.6716 3 13 3.67157 13 4.5V6.06189C16.9463 6.55399 20 9.92038 20 14C20 18.4183 16.4183 22 12 22C7.58172 22 4 18.4183 4 14C4 9.92038 7.05369 6.55399 11 6.06189V4.5C11 2.567 12.567 1 14.5 1C16.433 1 18 2.567 18 4.5V5H19C19.5523 5 20 5.44772 20 6C20 6.55228 19.5523 7 19 7H18C16.8954 7 16 6.10457 16 5V4.5C16 3.67157 15.3284 3 14.5 3ZM10 14C10 12.8954 10.8954 12 12 12C12.5523 12 13 11.5523 13 11C13 10.4477 12.5523 10 12 10C9.79086 10 8 11.7909 8 14C8 14.5523 8.44772 15 9 15C9.55228 15 10 14.5523 10 14Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgBombFill;
