import type { SVGProps } from "react";
const SvgCreditCardSimpleFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M1 6C1 4.34315 2.34315 3 4 3H20C21.6569 3 23 4.34315 23 6V9H21H3H1V6Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M20 21C21.6569 21 23 19.6569 23 18V11H21H3H1V18C1 19.6569 2.34315 21 4 21H20Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgCreditCardSimpleFill;
