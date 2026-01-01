import type { SVGProps } from "react";
const SvgCollectionFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M6 3C6 2.44772 6.44772 2 7 2H17C17.5523 2 18 2.44772 18 3C18 3.55228 17.5523 4 17 4H7C6.44772 4 6 3.55228 6 3Z"
      fill="currentColor"
    />
    <path
      d="M5 5C4.44772 5 4 5.44772 4 6C4 6.55228 4.44772 7 5 7H19C19.5523 7 20 6.55228 20 6C20 5.44772 19.5523 5 19 5H5Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5 8C3.34315 8 2 9.34315 2 11V19C2 20.6569 3.34315 22 5 22H19C20.6569 22 22 20.6569 22 19V11C22 9.34315 20.6569 8 19 8H5Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgCollectionFill;
