import type { SVGProps } from "react";
const SvgShoppingBag = (props: SVGProps<SVGSVGElement>) => (
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
      d="M12 3C10.8954 3 10 3.89543 10 5V10C10 10.5523 9.55229 11 9 11C8.44772 11 8 10.5523 8 10V5C8 2.79086 9.79086 1 12 1C14.2091 1 16 2.79086 16 5V10C16 10.5523 15.5523 11 15 11C14.4477 11 14 10.5523 14 10V5C14 3.89543 13.1046 3 12 3Z"
      fill="currentColor"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.87111 8C6.34464 8 5.90834 8.40818 5.87332 8.93348L5.13999 19.9335C5.10151 20.5107 5.55931 21 6.13777 21H17.8622C18.4407 21 18.8985 20.5107 18.86 19.9335L18.1267 8.93348C18.0917 8.40818 17.6554 8 17.1289 8H6.87111ZM3.87775 8.80044C3.98281 7.22455 5.29172 6 6.87111 6H17.1289C18.7083 6 20.0172 7.22455 20.1222 8.80044L20.8556 19.8004C20.971 21.532 19.5976 23 17.8622 23H6.13777C4.40238 23 3.02898 21.532 3.14442 19.8004L3.87775 8.80044Z"
      fill="currentColor"
    />
  </svg>
);
export default SvgShoppingBag;
