import type { SVGProps } from "react";
const SvgEditInline = (props: SVGProps<SVGSVGElement>) => (
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
      d="M17.2541 4.44618C16.6137 3.84346 15.6148 3.84346 14.9744 4.44618L4.88457 13.9425L4.29017 16.7397L7.38475 16.1572L17.2541 6.86836C17.9518 6.2117 17.9518 5.10284 17.2541 4.44618ZM13.6037 2.98978C15.0142 1.66226 17.2144 1.66226 18.6249 2.98978C20.1616 4.43612 20.1616 6.87843 18.6249 8.32476L8.54251 17.814C8.40344 17.9449 8.22981 18.0333 8.04213 18.0686L4.66014 18.7052C3.25706 18.9693 2.03709 17.7205 2.33385 16.324L2.99327 13.2208C3.0356 13.0216 3.13776 12.8401 3.28606 12.7005L13.6037 2.98978Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 21.0001C2 20.4478 2.44772 20.0001 3 20.0001H19C19.5523 20.0001 20 20.4478 20 21.0001C20 21.5524 19.5523 22.0001 19 22.0001H3C2.44772 22.0001 2 21.5524 2 21.0001Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgEditInline;
