const Slug = ({ 
  slug, 
  setSlug, 
  slugAvailable, 
  checkingSlug, 
  slugError,
  saving,
  isNavigating
}) => {
  const handleSlugChange = (e) => {
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '');
    setSlug(value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <p className="text-gray-600 text-center">
          Your personal weblinqo URL will be:
        </p>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 ml-2 flex items-center pointer-events-none">
            <span className="text-gray-500">weblinqo.com/u/</span>
          </div>
          <input
            placeholder="yourname"
            value={slug}
            onChange={handleSlugChange}
            disabled={saving || isNavigating}
            className={`w-full pl-32 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#c4ff4d] focus:border-[#c4ff4d] transition bg-gray-50 ${
              saving || isNavigating ? "opacity-70 cursor-not-allowed" : ""
            } ${slugError ? "border-red-300" : ""}`}
          />
        </div>
        
        <div className="h-6 text-center">
          {checkingSlug && slug && (
            <p className="text-sm text-gray-500">Checking availability...</p>
          )}
          {slugError && (
            <p className="text-sm text-[#c62828] flex items-center justify-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {slugError}
            </p>
          )}
          {slugAvailable && slug && !checkingSlug && (
            <p className="text-sm text-[#2a5a00] flex items-center justify-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Available!
            </p>
          )}
          {!slug && (
            <p className="text-sm text-gray-500">
              3-20 characters (letters, numbers, -, _)
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Slug;