import type { SVGProps } from "react";
const SvgPanelHeaderDivided = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17 2C19.7614 2 22 4.23858 22 7L22 17C22 19.7614 19.7614 22 17 22L7 22C4.23858 22 2 19.7614 2 17L2 7C2 4.23858 4.23858 2 7 2L17 2ZM13 10L13 20L17 20C18.6569 20 20 18.6569 20 17L20 10L13 10ZM11 10L11 20L7 20C5.34314 20 4 18.6569 4 17L4 10L11 10ZM7 4C5.34315 4 4 5.34315 4 7L4 8L20 8L20 7C20 5.34315 18.6569 4 17 4L7 4Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgPanelHeaderDivided;
