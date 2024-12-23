'use client';

import React, { useState, useRef } from 'react';
import SurveyCard from './SurveyCard';
import ProductMixFlow from './ProductMixFlow';

const steps = [
  {
    id: 'store-info',
    title: 'Store Information',
    fields: [
      { name: 'storeName', label: 'Store Name', type: 'text', required: true },
      { name: 'storeManagerName', label: 'Store Manager/Owner Name', type: 'text', required: false },
      { name: 'email', label: 'Email Address', type: 'email', required: false },
      { name: 'storePhone', label: 'Store Phone Number', type: 'tel', required: false },
      { name: 'cellPhone', label: 'Cell Phone (if different)', type: 'tel', required: false },
      { name: 'streetAddress', label: 'Street Address', type: 'text', required: false },
      { name: 'city', label: 'City', type: 'text', required: false },
      { name: 'state', label: 'State', type: 'text', required: false },
      { name: 'zipCode', label: 'ZIP Code', type: 'text', required: false },
      { name: 'storeSize', label: 'Store Size (sq ft)', type: 'number', required: true }
    ]
  },
  {
    id: 'customer-types',
    title: 'Customers',
    fields: [
      {
        name: 'customer_segments',
        label: 'What percentage of your customers fall into these categories?',
        type: 'segmentSliders',
        segments: [
          { id: 'commuters', label: 'Commuters' },
          { id: 'locals', label: 'Local Residents' },
          { id: 'students', label: 'Students' },
          { id: 'professionals', label: 'Working Professionals' },
          { id: 'tourists', label: 'Tourists/Visitors' }
        ],
        required: true
      },
      { 
        name: 'priceSensitivity', 
        label: 'Customer Value Drivers', 
        type: 'range',
        min: 1,
        max: 5,
        minLabel: 'Price Driven',
        maxLabel: 'Premium Focus',
        description: 'What drives purchasing decisions for your typical customer?',
        markers: [
          'Highly Price Sensitive',
          'Price Conscious',
          'Value Balanced',
          'Quality Focused',
          'Premium Oriented'
        ],
        required: true 
      },
      { 
        name: 'healthFocus', 
        label: 'Health Focus Level', 
        type: 'range',
        min: 1,
        max: 5,
        minLabel: 'Traditional Mix',
        maxLabel: 'Health Forward',
        description: 'How important are health-conscious options to your customer base?',
        markers: [
          'Traditional Focus',
          'Limited Health Options',
          'Balanced Selection',
          'Health Conscious',
          'Wellness Driven'
        ],
        required: true 
      },
      { 
        name: 'averageOrder', 
        label: 'Average Customer Spend Per Visit (non-gas and cigarette/vape)', 
        type: 'radio',
        options: [
          'Under $8',
          '$8 - $15',
          '$16 - $25',
          '$26 - $50',
          'Over $50'
        ],
        description: 'Select the range that best represents your typical transaction value (excluding gas and tobacco products)',
        required: true 
      }
    ]
  },
  {
    id: 'daily-patterns',
    title: 'Daily Patterns',
    fields: [
      {
        name: 'morning_rush',
        label: 'Morning Rush',
        type: 'timeSegment',
        subfields: [
          {
            name: 'morning_traffic',
            label: 'Customer Traffic (6AM-10AM)',
            type: 'range',
            min: 1,
            max: 10,
            minLabel: 'Low',
            maxLabel: 'High'
          },
          {
            name: 'morning_age_groups',
            label: 'Most Common Age Groups',
            type: 'multiSelect',
            options: ['18-24', '25-34', '35-44', '45-54', '55+']
          }
        ],
        required: true
      },
      {
        name: 'midday',
        label: 'Midday',
        type: 'timeSegment',
        subfields: [
          {
            name: 'midday_traffic',
            label: 'Customer Traffic (10AM-3PM)',
            type: 'range',
            min: 1,
            max: 10,
            minLabel: 'Low',
            maxLabel: 'High'
          },
          {
            name: 'midday_age_groups',
            label: 'Most Common Age Groups',
            type: 'multiSelect',
            options: ['18-24', '25-34', '35-44', '45-54', '55+']
          }
        ],
        required: true
      },
      {
        name: 'afternoon_rush',
        label: 'Afternoon Rush',
        type: 'timeSegment',
        subfields: [
          {
            name: 'afternoon_traffic',
            label: 'Customer Traffic (3PM-7PM)',
            type: 'range',
            min: 1,
            max: 10,
            minLabel: 'Low',
            maxLabel: 'High'
          },
          {
            name: 'afternoon_age_groups',
            label: 'Most Common Age Groups',
            type: 'multiSelect',
            options: ['18-24', '25-34', '35-44', '45-54', '55+']
          }
        ],
        required: true
      },
      {
        name: 'evening',
        label: 'Evening',
        type: 'timeSegment',
        subfields: [
          {
            name: 'evening_traffic',
            label: 'Customer Traffic (7PM-Close)',
            type: 'range',
            min: 1,
            max: 10,
            minLabel: 'Low',
            maxLabel: 'High'
          },
          {
            name: 'evening_age_groups',
            label: 'Most Common Age Groups',
            type: 'multiSelect',
            options: ['18-24', '25-34', '35-44', '45-54', '55+']
          }
        ],
        required: true
      }
    ]
  },
  {
    id: 'current-mix',
    title: 'Current Product Mix',
    fields: [
      {
        name: 'category_sales',
        label: 'Estimated Monthly Sales by Category (in $US)',
        type: 'segmentSliders',
        segments: [
          { id: 'chips_snacks', label: 'Chips & Salty Snacks' },
          { id: 'candy_chocolate', label: 'Candy & Chocolate' },
          { id: 'protein_bars', label: 'Protein & Energy Bars' },
          { id: 'nuts_trail_mix', label: 'Nuts & Trail Mix' },
          { id: 'jerky_meat_snacks', label: 'Jerky & Meat Snacks' },
          { id: 'cookies_sweets', label: 'Cookies & Sweet Snacks' }
        ],
        description: 'Estimate monthly sales revenue for each snack category',
        minLabel: '$0',
        maxLabel: '$5000+',
        min: 0,
        max: 5000,
        step: 100,
        required: true
      }
    ]
  },
  {
    id: 'preferences',
    title: 'Store Preferences',
    fields: [
      { 
        name: 'topCategories', 
        label: 'Which categories are top priorities for sales growth today?', 
        type: 'multiSelect',
        options: ['Snacks', 'Beverages', 'Candy', 'Health Foods', 'Energy Drinks'],
        description: 'Select the categories where you see the most potential for growth',
        required: true 
      }
    ]
  },
  {
    id: 'analysis',
    title: 'Analysis',
    fields: []
  }
];

interface ProductMixSurveyProps {
  onComplete?: (data: any) => void;
}

export default function ProductMixSurvey({ onComplete }: ProductMixSurveyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    // Store Info
    storeName: '',
    storeManagerName: '',
    email: '',
    storePhone: '',
    cellPhone: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    storeSize: '',
    // New segment data
    customer_segments: {
      commuters: 0,
      locals: 0,
      students: 0,
      professionals: 0,
      tourists: 0
    },
    // Time-based data
    morning_traffic: 5,
    morning_age_groups: [],
    midday_traffic: 5,
    midday_age_groups: [],
    afternoon_traffic: 5,
    afternoon_age_groups: [],
    evening_traffic: 5,
    evening_age_groups: [],
    // Current Mix
    topCategories: [],
    averageOrder: '',
    category_sales: {
      chips_snacks: 0,
      candy_chocolate: 0,
      protein_bars: 0,
      nuts_trail_mix: 0,
      jerky_meat_snacks: 0,
      cookies_sweets: 0
    },
    // Preferences
    healthFocus: 5,
    priceSensitivity: 3,
  });
  const [activeField, setActiveField] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleMultiSelect = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: Array.isArray(prev[name]) && prev[name].includes(value)
        ? prev[name].filter((v: string) => v !== value)
        : [...(Array.isArray(prev[name]) ? prev[name] : []), value]
    }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const scrollToTop = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    scrollToTop();
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    scrollToTop();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (onComplete) {
      onComplete(formData);
    }
  };

  const handleSegmentSlider = (segmentId: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      category_sales: {
        ...prev.category_sales,
        [segmentId]: value
      }
    }));
  };

  const scrollToField = (fieldName: string) => {
    const fieldElement = document.getElementById(`field-${fieldName}`);
    if (fieldElement) {
      fieldElement.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
      });
      setActiveField(fieldName);
    }
  };

  const renderField = (field: any) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
        return (
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-white 
              placeholder-zinc-500 focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required={field.required}
            placeholder={field.required ? 'Required' : 'Optional'}
          />
        );
      case 'range':
        return (
          <div className="flex flex-col space-y-2">
            {field.description && (
              <p className="text-xs text-zinc-400">{field.description}</p>
            )}
            <div className="flex items-center space-x-2">
              <input
                type="range"
                name={field.name}
                min={field.min}
                max={field.max}
                value={formData[field.name]}
                onChange={handleInputChange}
                className="w-full accent-emerald-500"
                required={field.required}
              />
              {field.markers ? (
                <span className="text-sm text-white min-w-[120px] text-right">
                  {field.markers[formData[field.name] - 1]}
                </span>
              ) : (
                <span className="text-sm text-white min-w-[30px] text-right">
                  {formData[field.name]}
                </span>
              )}
            </div>
            {(field.minLabel && field.maxLabel) && (
              <div className="flex justify-between text-xs text-zinc-400">
                <span>{field.minLabel}</span>
                <span>{field.maxLabel}</span>
              </div>
            )}
          </div>
        );
      case 'radio':
        return (
          <div className="space-y-2">
            {field.options.map((option: string) => (
              <label key={option} className="flex items-center space-x-2 text-white">
                <input
                  type="radio"
                  name={field.name}
                  value={option}
                  checked={formData[field.name] === option}
                  onChange={() => handleRadioChange(field.name, option)}
                  className="text-emerald-500 border-zinc-700 focus:ring-emerald-500"
                  required={field.required}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name]}
            onChange={handleInputChange}
            className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-white 
              focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            required={field.required}
          >
            {field.options.map((option: string) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        );
      case 'multiSelect':
        return (
          <div className="space-y-2">
            {field.options.map((option: string) => (
              <label key={option} className="flex items-center space-x-2 text-white">
                <input
                  type="checkbox"
                  checked={Array.isArray(formData[field.name]) && formData[field.name].includes(option)}
                  onChange={() => handleMultiSelect(field.name, option)}
                  className="rounded border-zinc-700 text-emerald-500 focus:ring-emerald-500"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        );
      case 'segmentSliders':
        return (
          <div className="space-y-4">
            {field.name === 'customer_segments' && (
              <div className="mb-6 space-y-3">
                <p className="text-sm text-zinc-300">
                  Move the sliders to indicate the relative mix of your customer types. 
                  Think of it as building your customer profile - the values will be automatically balanced to 100%.
                </p>
                <div className="flex items-center text-xs text-zinc-400">
                  <span className="bg-amber-500/20 text-amber-500 px-2 py-1 rounded-md">
                    Tip: Focus on relative proportions rather than exact percentages
                  </span>
                </div>
              </div>
            )}
            {field.segments.map((segment: any) => {
              // Check if this is the customer segments question
              const isCustomerSegments = field.name === 'customer_segments';
              const value = isCustomerSegments 
                ? formData.customer_segments?.[segment.id] || 0
                : formData.category_sales?.[segment.id] || 0;
              
              return (
                <div key={segment.id} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-sm font-medium text-white">{segment.label}</label>
                    <span className={`text-sm min-w-[80px] text-right ${
                      isCustomerSegments ? 'text-emerald-500' : 'text-zinc-400'
                    }`}>
                      {isCustomerSegments 
                        ? value > 0 ? 'Active' : 'None'
                        : `$${value.toLocaleString()}${value >= (field.max || 5000) ? '+' : ''}`
                      }
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="range"
                      min={field.min || 0}
                      max={isCustomerSegments ? 100 : (field.max || 5000)}
                      step={isCustomerSegments ? 5 : (field.step || 100)}
                      value={value}
                      onChange={(e) => {
                        if (isCustomerSegments) {
                          setFormData(prev => ({
                            ...prev,
                            customer_segments: {
                              ...prev.customer_segments,
                              [segment.id]: Number(e.target.value)
                            }
                          }));
                        } else {
                          handleSegmentSlider(segment.id, Number(e.target.value));
                        }
                      }}
                      className="w-full accent-emerald-500"
                    />
                    <div className="flex justify-between text-xs text-zinc-400 mt-1">
                      <span>{isCustomerSegments ? 'Less' : field.minLabel}</span>
                      <span>{isCustomerSegments ? 'More' : field.maxLabel}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            {field.name === 'customer_segments' && (
              <div className="flex items-center justify-end mt-2">
                <div className="text-sm text-zinc-400">
                  Total contribution will be normalized to 100%
                </div>
              </div>
            )}
          </div>
        );
      case 'timeSegment':
        return (
          <div className="space-y-4 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
            {field.subfields.map((subfield: any) => (
              <div key={subfield.name} className="space-y-2">
                {subfield.type === 'range' ? (
                  <>
                    <h4 className="font-medium text-white mb-2">{subfield.label}</h4>
                    {renderField(subfield)}
                  </>
                ) : (
                  <>
                    <label className="block text-sm font-medium text-zinc-300">
                      {subfield.label}
                    </label>
                    {renderField(subfield)}
                  </>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4" ref={formRef}>
      <ProductMixFlow currentStep={currentStep} />
      <SurveyCard>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep < steps.length - 1 ? (
            <>
              <div className="grid grid-cols-1 gap-8">
                {steps[currentStep].fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <label className="block text-sm font-medium text-white">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-4">
              <h3 className="text-lg font-semibold text-white mb-2">Ready to Generate Recommendations</h3>
              <p className="text-zinc-400">Click the button below to analyze your store data and generate product mix recommendations.</p>
            </div>
          )}
          
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className="px-4 py-2 text-sm font-medium text-zinc-300 bg-zinc-800 border border-zinc-700 
                rounded-md hover:bg-zinc-700 disabled:opacity-50 disabled:hover:bg-zinc-800"
            >
              Back
            </button>
            {currentStep === steps.length - 1 ? (
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md 
                  hover:bg-emerald-500 transition-colors"
              >
                Generate Mix
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-md 
                  hover:bg-emerald-500 transition-colors"
              >
                Next
              </button>
            )}
          </div>
        </form>
      </SurveyCard>
    </div>
  );
} 