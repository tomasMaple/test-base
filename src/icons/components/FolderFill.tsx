import type { SVGProps } from "react";
const SvgFolderFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M4 1C2.34315 1 1 2.34315 1 4V17C1 18.6569 2.34315 20 4 20H20C21.6569 20 23 18.6569 23 17V7C23 5.34315 21.6569 4 20 4H10C10 2.34315 8.65685 1 7 1H4Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgFolderFill;
