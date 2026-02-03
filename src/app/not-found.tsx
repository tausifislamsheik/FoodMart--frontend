import Link from 'next/link'
 
export default function NotFound() {
  return (
     <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        {/* Large Decorative 404 */}
        <h1 className="text-9xl font-extrabold text-orange-500 opacity-20">
          404
        </h1>
        
        <div className="relative -mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lost in the Clouds?
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            The page you are looking for doesn't exist or has been moved. 
            Let's get you back on the right track.
          </p>
          
          <Link href="/">
            <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200 cursor-pointer">
              Back to Home
            </button>
          </Link>
        </div>
        {/* Optional Illustration/Icon Placeholder */}
        <div className="mt-12 flex justify-center">
          <svg 
            className="h-24 w-24 text-orange-200" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="MapIconPath..." // Replace with a Lucide or Heroicon path
            />
          </svg>
        </div>
      </div>
    </div>
  )
}