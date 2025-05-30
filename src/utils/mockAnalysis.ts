import { AnalysisResult } from '../types';

// Generate a simple hash from image data
const generateImageHash = async (file: File): Promise<number> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const buffer = e.target?.result as ArrayBuffer;
      const array = new Uint8Array(buffer);
      let hash = 0;
      
      // Simple hash function
      for (let i = 0; i < array.length; i++) {
        hash = ((hash << 5) - hash) + array[i];
        hash = hash & hash;
      }
      
      resolve(Math.abs(hash));
    };
    
    reader.readAsArrayBuffer(file);
  });
};

// Deterministic random number generator
const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

// This simulates an AI service analyzing a crypto chart image
export const analyzeTradeImage = async (image: File): Promise<AnalysisResult> => {
  const imageHash = await generateImageHash(image);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      // Use image hash to generate consistent results
      const random = seededRandom(imageHash);
      const isUptrend = random > 0.5;
      
      const upReasons = [
        'Bullish engulfing pattern detected',
        'RSI showing oversold conditions',
        'MACD showing bullish crossover',
        'Price above 200-day moving average',
        'Volume increasing on green candles'
      ];
      
      const downReasons = [
        'Bearish engulfing pattern detected',
        'RSI showing overbought conditions',
        'MACD showing bearish crossover',
        'Price below 200-day moving average',
        'Volume increasing on red candles'
      ];
      
      // Generate consistent number of reasons
      const reasonCount = Math.floor(seededRandom(imageHash + 1) * 2) + 2;
      const reasonPool = isUptrend ? upReasons : downReasons;
      const selectedReasons: string[] = [];
      
      // Select reasons consistently
      for (let i = 0; i < reasonPool.length && selectedReasons.length < reasonCount; i++) {
        if (seededRandom(imageHash + i + 2) > 0.5) {
          selectedReasons.push(reasonPool[i]);
        }
      }
      
      // Ensure we have minimum number of reasons
      while (selectedReasons.length < reasonCount) {
        const index = selectedReasons.length % reasonPool.length;
        if (!selectedReasons.includes(reasonPool[index])) {
          selectedReasons.push(reasonPool[index]);
        }
      }
      
      // Generate consistent timeframe
      const timeframes = ['1H', '4H', '1D', '1W'];
      const timeframeIndex = Math.floor(seededRandom(imageHash + 100) * timeframes.length);
      const timeframe = timeframes[timeframeIndex];
      
      // Generate consistent confidence level
      const confidence = Math.floor(seededRandom(imageHash + 200) * 30) + 70; // 70-99%
      
      resolve({
        direction: isUptrend ? 'up' : 'down',
        confidence,
        reasons: selectedReasons,
        timeframe,
        timestamp: Date.now()
      });
    }, 2000);
  });
};