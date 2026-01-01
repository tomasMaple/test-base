import type { SVGProps } from "react";
const SvgKanbanViewFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M2 5C2 3.34315 3.34315 2 5 2H8C9.65685 2 11 3.34315 11 5V14C11 15.6569 9.65685 17 8 17H5C3.34315 17 2 15.6569 2 14V5Z"
      fill="currentColor"
    />
    <path
      d="M13 5C13 3.34315 14.3431 2 16 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H16C14.3431 22 13 20.6569 13 19V5Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgKanbanViewFill;
