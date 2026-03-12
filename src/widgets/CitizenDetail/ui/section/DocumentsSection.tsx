export const DocumentsSection = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">📎 Документы</h2>
        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          + Загрузить документ
        </button>
      </div>
      <div className="p-12 text-center">
        <p className="text-gray-500 text-lg mb-4">Документы не загружены</p>
        <p className="text-sm text-gray-400">Загрузите сканы паспорта, дипломов и других документов</p>
      </div>
    </div>
  );
};
