import type { SVGProps } from "react";
const SvgPluginContentFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13 15C14.1046 15 15 14.1046 15 13V11H14H10H9V13C9 14.1046 9.89543 15 11 15H12H13Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM7 13C7 15.2091 8.79086 17 11 17V20H13V17C15.2091 17 17 15.2091 17 13V11C17 9.89543 16.1046 9 15 9V7.5C15 6.94772 14.5523 6.5 14 6.5C13.4477 6.5 13 6.94772 13 7.5V9H11V7.5C11 6.94772 10.5523 6.5 10 6.5C9.44772 6.5 9 6.94772 9 7.5V9C7.89543 9 7 9.89543 7 11V13Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgPluginContentFill;
