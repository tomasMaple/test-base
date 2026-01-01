import type { SVGProps } from "react";
const SvgMailFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6 3C3.23858 3 1 5.23858 1 8V16C1 18.7614 3.23858 21 6 21H18C20.7614 21 23 18.7614 23 16V8C23 5.23858 20.7614 3 18 3H6ZM3.33068 6.6294C3.64786 6.01292 4.17233 5.52056 4.812 5.24441L12 10.7411L19.188 5.24441C19.8277 5.52056 20.3521 6.01292 20.6693 6.6294L12.6075 12.7944C12.2489 13.0685 11.7511 13.0685 11.3926 12.7944L3.33068 6.6294Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgMailFill;
