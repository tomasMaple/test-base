import type { SVGProps } from "react";
const SvgDragLineFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M1.75 12C1.75 11.3096 2.30964 10.75 3 10.75H21C21.6904 10.75 22.25 11.3096 22.25 12C22.25 12.6904 21.6904 13.25 21 13.25H3C2.30964 13.25 1.75 12.6904 1.75 12Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.75 8C1.75 7.30964 2.30964 6.75 3 6.75H21C21.6904 6.75 22.25 7.30964 22.25 8C22.25 8.69036 21.6904 9.25 21 9.25H3C2.30964 9.25 1.75 8.69036 1.75 8Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.75 16C1.75 15.3096 2.30964 14.75 3 14.75H21C21.6904 14.75 22.25 15.3096 22.25 16C22.25 16.6904 21.6904 17.25 21 17.25H3C2.30964 17.25 1.75 16.6904 1.75 16Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgDragLineFill;
