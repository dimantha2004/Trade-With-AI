export interface AnalysisResult {
  direction: 'up' | 'down';
  confidence: number;
  reasons: string[];
  timeframe: string;
  timestamp: number;
}

export interface AnalysisHistory {
  id: string;
  imageUrl: string;
  result: AnalysisResult;
}