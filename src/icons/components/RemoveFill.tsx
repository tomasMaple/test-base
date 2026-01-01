import type { SVGProps } from "react";
const SvgRemoveFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M18.25 12C18.25 12.6904 17.6904 13.25 17 13.25L7 13.25C6.30964 13.25 5.75 12.6904 5.75 12C5.75 11.3096 6.30964 10.75 7 10.75L17 10.75C17.6904 10.75 18.25 11.3096 18.25 12Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgRemoveFill;
