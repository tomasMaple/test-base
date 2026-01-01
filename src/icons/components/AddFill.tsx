import type { SVGProps } from "react";
const SvgAddFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 5.75C12.6904 5.75 13.25 6.30964 13.25 7V17C13.25 17.6904 12.6904 18.25 12 18.25C11.3096 18.25 10.75 17.6904 10.75 17V7C10.75 6.30964 11.3096 5.75 12 5.75Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18.25 12C18.25 12.6904 17.6904 13.25 17 13.25L7 13.25C6.30964 13.25 5.75 12.6904 5.75 12C5.75 11.3096 6.30964 10.75 7 10.75L17 10.75C17.6904 10.75 18.25 11.3096 18.25 12Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgAddFill;
