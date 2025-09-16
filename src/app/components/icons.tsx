import type { SVGProps } from 'react';

export function AppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 4.5v15m-8-7.5h16" />
      <path d="M4.1 7.5 3 12l1.1 4.5" />
      <path d="M20.9 7.5 22 12l-1.1 4.5" />
      <path d="m15 4.5-3 15-3-15" />
    </svg>
  );
}
