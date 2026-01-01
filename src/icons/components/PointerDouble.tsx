import type { SVGProps } from "react";
const SvgPointerDouble = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.9605 5.47036C12.4877 4.84321 11.5123 4.84321 11.0395 5.47036L8.22611 9.20244C7.66075 9.9524 8.22051 11 9.18659 11H14.8134C15.7795 11 16.3392 9.9524 15.7739 9.20244L12.9605 5.47036Z"
      fill="currentColor"
    />
    <path
      d="M12.9605 18.5296C12.4877 19.1568 11.5123 19.1568 11.0395 18.5296L8.22611 14.7976C7.66075 14.0476 8.22051 13 9.18659 13H14.8134C15.7795 13 16.3392 14.0476 15.7739 14.7976L12.9605 18.5296Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgPointerDouble;
