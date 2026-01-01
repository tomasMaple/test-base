import type { SVGProps } from "react";
const SvgTextFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.965 9.33499L10.96 12.57H12.98L11.965 9.33499Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 7C2 4.23858 4.23858 2 7 2H17C19.7614 2 22 4.23858 22 7V17C22 19.7614 19.7614 22 17 22H7C4.23858 22 2 19.7614 2 17V7ZM7 16L10.45 7H13.55L17 16H14.03L13.57 14.515H10.345L9.89499 16H7Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgTextFill;
