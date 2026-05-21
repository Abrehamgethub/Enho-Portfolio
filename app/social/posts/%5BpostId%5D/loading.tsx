export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-4 animate-pulse">
      <div className="h-6 w-24 bg-gray-200 rounded"></div>
      <div className="bg-white border border-gray-100 rounded-2xl p-4 space-y-4 h-64">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-4 w-32 bg-gray-200 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="h-4 w-full bg-gray-200 rounded"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}
