export const FamilySection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">Члены семьи</h2>
        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          + Добавить члена семьи
        </button>
      </div>
      <div className="p-12 text-center">
        <p className="text-gray-500 text-lg mb-4">Члены семьи не добавлены</p>
        <p className="text-sm text-gray-400">Добавьте информацию о супругах, детях и других родственниках</p>
      </div>
    </div>
  );
};
