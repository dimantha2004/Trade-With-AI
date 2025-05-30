import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import TradeAnalysis from './components/TradeAnalysis';
import HistorySection from './components/HistorySection';
import Footer from './components/Footer';
import { analyzeTradeImage } from './utils/mockAnalysis';
import { AnalysisResult, AnalysisHistory } from './types';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisHistory[]>([]);
  
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  const handleImageSelected = (file: File) => {
    setSelectedImage(file);
    setIsAnalyzing(true);
    setAnalysisResult(null);
    
    analyzeTradeImage(file).then(result => {
      setAnalysisResult(result);
      setIsAnalyzing(false);
      
      // Create a URL for the image
      const imageUrl = URL.createObjectURL(file);
      
      // Add to history
      const historyItem: AnalysisHistory = {
        id: uuidv4(),
        imageUrl,
        result
      };
      
      setHistory(prev => [historyItem, ...prev.slice(0, 5)]);
    });
  };
  
  const handleSelectHistory = (item: AnalysisHistory) => {
    setAnalysisResult(item.result);
  };
  
  // Apply dark mode class to body
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <div className={`flex flex-col min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      
      <main className="flex-grow px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <section className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
              AI Crypto Trade Analyzer
            </h1>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Upload a screenshot of your crypto chart and get instant AI-powered analysis 
              on whether to buy or sell, with technical indicators and confidence level.
            </p>
          </section>
          
          <ImageUploader 
            onImageSelected={handleImageSelected} 
            isAnalyzing={isAnalyzing} 
          />
          
          <TradeAnalysis 
            result={analysisResult} 
            isLoading={isAnalyzing} 
          />
          
          <HistorySection 
            history={history} 
            onSelectHistory={handleSelectHistory} 
          />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;