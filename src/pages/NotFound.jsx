import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f3f0]">
      <div className="text-center max-w-md px-4">
        <h1 className="text-9xl font-black text-gray-900 mb-2">404</h1>
        <p className="text-2xl font-bold text-gray-800 mb-2">Page Not Found</p>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold rounded-full bg-[#c4ff4d] text-gray-900 hover:bg-[#b8f542] hover:scale-[1.03] transition-all duration-200 active:scale-95 shadow-md"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;