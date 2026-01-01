import type { SVGProps } from "react";
const SvgSwitch = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2 12C2 8.13401 5.13401 5 9 5H15C18.866 5 22 8.13401 22 12C22 15.866 18.866 19 15 19H9C5.13401 19 2 15.866 2 12ZM9 7C6.23858 7 4 9.23858 4 12C4 14.7614 6.23858 17 9 17H15C17.7614 17 20 14.7614 20 12C20 9.23858 17.7614 7 15 7H9Z"
      fill="currentColor"
    />
    <path
      d="M19 12C19 14.2091 17.2091 16 15 16C12.7909 16 11 14.2091 11 12C11 9.79086 12.7909 8 15 8C17.2091 8 19 9.79086 19 12Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgSwitch;
