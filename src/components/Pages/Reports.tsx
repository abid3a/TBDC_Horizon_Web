import React from 'react';
import ReportCard from '../Common/ReportCard';
import { FileText } from 'lucide-react';
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
          <ReportCard key={report.id} report={report} onDownload={handleDownload} />
        ))}
      </div>
    </div>
  );
};

export default Reports;