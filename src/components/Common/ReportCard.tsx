import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

interface ReportCardProps {
  report: any;
  onDownload: (report: any) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, onDownload }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
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
          onClick={() => onDownload(report)}
          className="flex items-center space-x-2 text-amber-600 hover:text-amber-700 font-medium text-sm"
        >
          <Download className="w-4 h-4" />
          <span>Download</span>
        </button>
      </div>
    </div>
  );
};

export default ReportCard; 