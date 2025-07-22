import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import mockData from '../../data/mockData.json';

const Reports: React.FC = () => {
  const { reports } = mockData;

  const handleDownload = (report: any) => {
    console.log(`Downloading report: ${report.title}`);
    alert(`Would download: ${report.title}`);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
        <p className="text-gray-600 mt-1">Access your business reports and analytics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1">{report.title}</h3>
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                    {report.type}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 leading-relaxed">{report.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-2" />
                {report.date}
              </div>
              <button
                onClick={() => handleDownload(report)}
                className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State for more reports */}
      <div className="mt-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">More reports coming soon</h3>
        <p className="text-gray-500">Additional analytics and performance reports will be available here.</p>
      </div>
    </div>
  );
};

export default Reports;