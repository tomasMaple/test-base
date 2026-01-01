import type { SVGProps } from "react";
const SvgArrowLeftward = (props: SVGProps<SVGSVGElement>) => (
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
      d="M11.7196 6.30562C12.1031 6.70306 12.0918 7.33612 11.6943 7.71961L6.22204 13L11.6943 18.2804C12.0918 18.6639 12.1031 19.2969 11.7196 19.6944C11.3361 20.0918 10.703 20.1031 10.3056 19.7196L4.46249 14.0814C3.84746 13.4929 3.84746 12.5071 4.46249 11.9186L10.3056 6.28039C10.703 5.89689 11.3361 5.90819 11.7196 6.30562Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M19 4C19.5523 4 20 4.44772 20 5V9C20 11.7614 17.7614 14 15 14H6C5.44772 14 5 13.5523 5 13C5 12.4477 5.44772 12 6 12H15C16.6569 12 18 10.6569 18 9V5C18 4.44772 18.4477 4 19 4Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgArrowLeftward;
