import type { SVGProps } from "react";
const SvgEarth = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4.25203 10C4.08751 10.6392 4 11.3094 4 12C4 16.0796 7.05369 19.446 11 19.9381V17H10C9.44772 17 9 16.5523 9 16V14H6V10H4.25203ZM18 17.2916C19.2447 15.8814 20 14.0289 20 12C20 8.64262 17.9318 5.76829 15 4.58152V6C15 6.55228 14.5523 7 14 7H11V9C11 9.55228 10.5523 10 10 10H9V12H14V15H18V17.2916Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgEarth;
