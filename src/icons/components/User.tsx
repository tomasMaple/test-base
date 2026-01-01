import type { SVGProps } from "react";
const SvgUser = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4ZM7 7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7C17 9.76142 14.7614 12 12 12C9.23858 12 7 9.76142 7 7Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M5.58829 15.5216C6.59425 14.5172 7.96237 14 9.42079 14H14.5792C17.7405 14 20 17.0197 20 20.334V21C20 21.5523 19.5523 22 19 22C18.4477 22 18 21.5523 18 21V20.334C18 17.7564 16.3009 16 14.5792 16H9.42079C8.43774 16 7.59546 16.3438 7.00139 16.9369C6.41159 17.5258 6 18.4272 6 19.668V21C6 21.5523 5.55228 22 5 22C4.44772 22 4 21.5523 4 21V19.668C4 17.9628 4.57807 16.5302 5.58829 15.5216Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgUser;
