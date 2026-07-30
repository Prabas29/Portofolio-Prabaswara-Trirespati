import { parseBoldSegments } from '../content/contentModel.js'

// Renders text that may contain **bold** markers (or the original segment
// array format) with emphasis in the primary text colour.
export default function RichText({ text }) {
  return parseBoldSegments(text).map((seg, i) =>
    seg.b ? (
      <strong key={i} className="font-semibold text-paper">
        {seg.t}
      </strong>
    ) : (
      <span key={i}>{seg.t}</span>
    ),
  )
}
