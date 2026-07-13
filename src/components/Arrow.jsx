// Minimal inline arrow — avoids pulling in an icon library.
export default function Arrow({ className = '' }) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h9" />
      <path d="M8.5 4l4 4-4 4" />
    </svg>
  )
}
