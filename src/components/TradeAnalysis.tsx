import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';
import { AnalysisResult } from '../types';

interface TradeAnalysisProps {
  result: AnalysisResult | null;
  isLoading: boolean;
}

const TradeAnalysis: React.FC<TradeAnalysisProps> = ({ result, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full max-w-3xl mx-auto mt-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg">Analyzing chart pattern...</p>
          <p className="mt-2 text-gray-500 dark:text-gray-400 text-sm">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  if (!result) return null;

  const { direction, confidence, reasons, timeframe } = result;
  const isUptrend = direction === 'up';

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 overflow-hidden">
      <div 
        className={`w-full p-6 rounded-lg shadow-md border animate-fadeIn ${
          isUptrend 
            ? 'bg-gradient-to-br from-green-50 to-white dark:from-green-950/40 dark:to-gray-800 border-green-200 dark:border-green-900' 
            : 'bg-gradient-to-br from-red-50 to-white dark:from-red-950/40 dark:to-gray-800 border-red-200 dark:border-red-900'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {isUptrend ? (
              <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/60">
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            ) : (
              <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/60">
                <TrendingDown className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Price will go {isUptrend ? 'UP' : 'DOWN'}
              </h2>
              <p className={`text-lg font-medium ${
                isUptrend 
                  ? 'text-green-600 dark:text-green-400' 
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {isUptrend ? 'Buy Signal' : 'Sell Signal'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500 dark:text-gray-400">Timeframe</div>
            <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">{timeframe}</div>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence Level</h3>
            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{confidence}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
            <div 
              className={`h-3 rounded-full ${isUptrend ? 'bg-green-500' : 'bg-red-500'}`} 
              style={{ width: `${confidence}%` }}
            ></div>
          </div>
        </div>
        
        <div>
          <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-3">Technical Analysis</h3>
          <ul className="space-y-2">
            {reasons.map((reason, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertCircle className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  isUptrend ? 'text-green-500' : 'text-red-500'
                }`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">{reason}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            This analysis is based on technical indicators visible in the chart image. Trading involves risk. Always do your own research before making investment decisions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TradeAnalysis;