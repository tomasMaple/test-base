import type { SVGProps } from "react";
const SvgStarSquare = (props: SVGProps<SVGSVGElement>) => (
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
      d="M13.7634 9.57295L12 6L10.2366 9.57295L6.29366 10.1459L9.14683 12.9271L8.47329 16.8541L12 15L15.5267 16.8541L14.8532 12.9271L17.7063 10.1459L13.7634 9.57295Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7 2C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2H7ZM4 7C4 5.34315 5.34315 4 7 4H17C18.6569 4 20 5.34315 20 7V17C20 18.6569 18.6569 20 17 20H7C5.34315 20 4 18.6569 4 17V7Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgStarSquare;
