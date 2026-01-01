import type { SVGProps } from "react";
const SvgRhombus = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12.5785 1.29289C12.259 0.902369 11.741 0.902369 11.4215 1.29289L3.23964 11.2929C2.92012 11.6834 2.92012 12.3166 3.23964 12.7071L11.4215 22.7071C11.741 23.0976 12.259 23.0976 12.5785 22.7071L20.7604 12.7071C21.0799 12.3166 21.0799 11.6834 20.7604 11.2929L12.5785 1.29289ZM12 20.5858L4.97527 12L12 3.41421L19.0247 12L12 20.5858Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgRhombus;
