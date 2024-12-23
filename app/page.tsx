"use client";

import React, { useState } from 'react';
import ProductMixSurvey from '../components/survey/ProductMixSurvey';
import SurveyCard from '../components/survey/SurveyCard';
import { Store, Sparkles, BarChart3 } from 'lucide-react';

export default function Home() {
  const [showSurvey, setShowSurvey] = useState(false);

  const features = [
    {
      icon: <Store className="w-6 h-6" />,
      title: "Store-Specific Analysis",
      description: "Tailored recommendations based on your unique store profile"
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "AI-Powered Insights",
      description: "Advanced AI technology to optimize your product mix"
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Data-Driven Decisions",
      description: "Make informed choices backed by market analysis"
    }
  ];
  
  if (!showSurvey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <SurveyCard className="relative overflow-hidden">
              {/* Background Accent */}
              <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
              
              <div className="relative space-y-8 py-6">
                {/* Header Section */}
                <div className="text-center space-y-4">
                  <div className="text-emerald-500 font-medium">WELCOME TO 1Z BRANDS</div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    Product Mix Generator
                  </h1>
                  <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                    Get AI-powered product recommendations tailored to your store's unique needs
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                  {features.map((feature, index) => (
                    <div key={index} className="flex flex-col items-center text-center p-4 space-y-3 
                      rounded-lg bg-zinc-800/50 border border-zinc-700/50 hover:border-emerald-500/50 
                      transition-colors duration-300">
                      <div className="p-3 bg-emerald-500/10 rounded-full text-emerald-500">
                        {feature.icon}
                      </div>
                      <h3 className="font-semibold text-lg text-white">{feature.title}</h3>
                      <p className="text-zinc-400 text-sm">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="text-center">
                  <button
                    onClick={() => setShowSurvey(true)}
                    className="group relative inline-flex items-center justify-center px-8 py-3 
                      text-lg font-medium text-white bg-emerald-600 rounded-md overflow-hidden
                      hover:bg-emerald-500 transition-colors duration-300"
                  >
                    <span className="relative">
                      Start Store Survey
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30 transform scale-x-0 
                        group-hover:scale-x-100 transition-transform duration-300" />
                    </span>
                  </button>
                </div>
              </div>
            </SurveyCard>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowSurvey(false)}
            className="text-sm text-zinc-400 hover:text-white px-4 py-2 rounded-md 
              hover:bg-zinc-800/50 transition-colors duration-200"
          >
            Back to Welcome
          </button>
        </div>
        <ProductMixSurvey 
          onComplete={(data) => {
            console.log('Survey completed:', data);
            // TODO: Handle survey completion
          }}
        />
      </div>
    </div>
  );
}