import type { SVGProps } from "react";
const SvgFileFill = (props: SVGProps<SVGSVGElement>) => (
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
      d="M3 6C3 3.79086 4.79086 2 7 2H12V8C12 9.10457 12.8954 10 14 10H21V18C21 20.2091 19.2091 22 17 22H7C4.79086 22 3 20.2091 3 18V6Z"
      fill="currentColor"
    />
    <path
      d="M20.1537 7.22202C20.3775 7.45286 20.5607 7.7159 20.6986 8H14V2.00539C14.7458 2.05015 15.4507 2.37207 15.9739 2.91156L20.1537 7.22202Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgFileFill;
