'use client';

import React from 'react';
import SurveyCard from './SurveyCard';

export interface ProductMixFlowProps {
  currentStep?: number;
}

const steps = [
  {
    id: 1,
    title: 'Store Profile',
    description: 'Basic store information'
  },
  {
    id: 2,
    title: 'Customers',
    description: 'Customer segments and demographics'
  },
  {
    id: 3,
    title: 'Daily Patterns',
    description: 'Traffic and timing analysis'
  },
  {
    id: 4,
    title: 'Current Mix',
    description: 'Product categories and sales'
  },
  {
    id: 5,
    title: 'Preferences',
    description: 'Store preferences and goals'
  },
  {
    id: 6,
    title: 'Analysis',
    description: 'AI-powered recommendation generation'
  }
];

const ProductMixFlow = ({ currentStep = 0 }: ProductMixFlowProps) => {
  // Ensure currentStep is within bounds
  const safeCurrentStep = Math.min(Math.max(0, currentStep), steps.length - 1);
  const currentStepData = steps[safeCurrentStep];

  return (
    <div className="mb-6">
      <div className="flex items-start justify-between px-2">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center min-w-[80px]">
              {/* Step Circle - Now in a fixed height container */}
              <div className="h-8 mb-2">
                <div 
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm
                    ${index === safeCurrentStep ? 'bg-emerald-500 text-black' : 
                      index < safeCurrentStep ? 'bg-emerald-700 text-white' : 'bg-zinc-800 text-zinc-400'}
                    transition-colors duration-200 border border-zinc-700
                  `}
                >
                  {step.id}
                </div>
              </div>
              
              {/* Title and Description - Now below with consistent spacing */}
              <div className="hidden md:flex flex-col items-center">
                <div className={`text-sm font-medium ${
                  index === safeCurrentStep ? 'text-emerald-500' : 
                  index < safeCurrentStep ? 'text-emerald-700' : 'text-zinc-400'
                }`}>
                  {step.title}
                </div>
                <div className="text-xs text-zinc-500 text-center max-w-[120px]">
                  {step.description}
                </div>
              </div>
            </div>

            {/* Connector Line - Now aligned with circles */}
            {index < steps.length - 1 && (
              <div className="flex-1 mx-2 mt-4">
                <div className={`h-0.5 ${
                  index < safeCurrentStep ? 'bg-emerald-700' : 'bg-zinc-800'
                } border-t border-zinc-700`} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Mobile Title - Unchanged */}
      <div className="md:hidden text-center mt-3">
        <div className="text-sm font-medium text-emerald-500">
          {currentStepData.title}
        </div>
        <div className="text-xs text-zinc-500">
          {currentStepData.description}
        </div>
      </div>
    </div>
  );
};

export default ProductMixFlow; 