import type { SVGProps } from "react";
const SvgStop = (props: SVGProps<SVGSVGElement>) => (
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
      d="M9 5C6.79086 5 5 6.79086 5 9V15C5 17.2091 6.79086 19 9 19H15C17.2091 19 19 17.2091 19 15V9C19 6.79086 17.2091 5 15 5H9ZM7 9C7 7.89543 7.89543 7 9 7H15C16.1046 7 17 7.89543 17 9V15C17 16.1046 16.1046 17 15 17H9C7.89543 17 7 16.1046 7 15V9Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgStop;
