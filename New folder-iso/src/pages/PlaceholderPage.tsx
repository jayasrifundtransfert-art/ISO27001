export function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-50 shrink-0">
        <svg className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-gray-900">{title} Overview</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-sm">
        This section aggregates {title.toLowerCase()} across all employees to provide a top-level administrative overview. Data is managed primarily through individual employee profiles.
      </p>
    </div>
  );
}
