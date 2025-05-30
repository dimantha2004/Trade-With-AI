import React from 'react';
import { Clock, TrendingUp, TrendingDown } from 'lucide-react';
import { AnalysisHistory } from '../types';

interface HistorySectionProps {
  history: AnalysisHistory[];
  onSelectHistory: (item: AnalysisHistory) => void;
}

const HistorySection: React.FC<HistorySectionProps> = ({ history, onSelectHistory }) => {
  if (!history.length) return null;

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-gray-500 dark:text-gray-400" />
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Previous Analyses</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {history.map((item) => {
          const isUptrend = item.result.direction === 'up';
          const date = new Date(item.result.timestamp);
          const formattedTime = date.toLocaleTimeString(undefined, { 
            hour: '2-digit', 
            minute: '2-digit' 
          });
          
          return (
            <div 
              key={item.id}
              onClick={() => onSelectHistory(item)}
              className="cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="aspect-video bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
                <img 
                  src={item.imageUrl} 
                  alt="Chart analysis" 
                  className="w-full h-full object-cover"
                />
                <div 
                  className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium text-white ${
                    isUptrend ? 'bg-green-500' : 'bg-red-500'
                  }`}
                >
                  {isUptrend ? 'BUY' : 'SELL'}
                </div>
              </div>
              
              <div className="p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {isUptrend ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {item.result.confidence}% confidence
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{formattedTime}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistorySection;