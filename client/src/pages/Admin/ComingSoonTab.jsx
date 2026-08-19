export default function ComingSoonTab({ label }) {
  return (
    <div className="bg-white rounded-2xl shadow-card p-10 flex flex-col items-center text-center">
      <div className="w-14 h-14 rounded-2xl bg-bg flex items-center justify-center text-2xl mb-3">
        🚧
      </div>
      <p className="font-semibold text-primary mb-1">{label}</p>
      <p className="text-sm text-gray-500 max-w-xs">This section is coming soon.</p>
    </div>
  )
}
