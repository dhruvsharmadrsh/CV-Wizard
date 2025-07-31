import React from 'react'

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

interface ATSProps {
  score: number;
  suggestions: Suggestion[];
}

const ATS: React.FC<ATSProps> = ({ score, suggestions }) => {
  // Determine gradient and colors based on score
  const scoreConfig = score > 69
    ? {
        gradient: 'from-emerald-400/20 via-green-400/20 to-teal-400/20',
        scoreGradient: 'from-emerald-400 to-green-400',
        ringColor: 'stroke-emerald-400',
        glowColor: 'shadow-emerald-500/20',
        iconColor: 'text-emerald-400',
        subtitle: 'Excellent ATS Performance!',
        description: 'Your resume is highly optimized for Applicant Tracking Systems'
      }
    : score > 49
      ? {
          gradient: 'from-amber-400/20 via-yellow-400/20 to-orange-400/20',
          scoreGradient: 'from-amber-400 to-yellow-400',
          ringColor: 'stroke-amber-400',
          glowColor: 'shadow-amber-500/20',
          iconColor: 'text-amber-400',
          subtitle: 'Good ATS Compatibility',
          description: 'Your resume shows solid ATS optimization with room for improvement'
        }
      : {
          gradient: 'from-red-400/20 via-orange-400/20 to-pink-400/20',
          scoreGradient: 'from-red-400 to-orange-400',
          ringColor: 'stroke-red-400',
          glowColor: 'shadow-red-500/20',
          iconColor: 'text-red-400',
          subtitle: 'ATS Optimization Needed',
          description: 'Your resume needs significant improvements for better ATS performance'
        };

  return (
    <div className="relative group animate-fade-in">
      {/* Background glow effect */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${scoreConfig.gradient} rounded-2xl opacity-60 blur-sm group-hover:opacity-100 transition-all duration-500`}></div>
      
      <div className="relative backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500">
        <div className="bg-gray-900/40 border border-white/5 rounded-2xl p-8">
          
          {/* Header section */}
          <div className="flex items-center justify-between mb-8 animate-slide-in-left">
            <div className="flex items-center gap-4">
              <div className={`p-3 bg-gradient-to-r ${scoreConfig.scoreGradient} rounded-xl animate-pulse-glow`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1">ATS Compatibility</h2>
                <p className="text-gray-400">Applicant Tracking System Analysis</p>
              </div>
            </div>
            
            {/* Score indicator with animated ring */}
            <div className="relative animate-slide-in-right">
              <div className="relative w-24 h-24">
                {/* Background circle */}
                <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-gray-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={`${2.51 * score} 251.2`}
                    className={`${scoreConfig.ringColor} transition-all duration-1000 ease-out animate-draw-circle`}
                    strokeLinecap="round"
                  />
                </svg>
                {/* Score text */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className={`text-2xl font-black bg-gradient-to-r ${scoreConfig.scoreGradient} bg-clip-text text-transparent`}>
                      {score}
                    </span>
                    <div className="text-xs text-gray-400 font-medium">/ 100</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Status section */}
          <div className="mb-8 animate-slide-up animation-delay-500">
            <div className={`relative p-6 bg-gradient-to-r ${scoreConfig.gradient} rounded-xl border border-white/10 backdrop-blur-sm`}>
              <div className="flex items-center gap-4">
                <div className={`p-2 bg-gradient-to-r ${scoreConfig.scoreGradient} rounded-lg`}>
                  {score > 69 ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : score > 49 ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{scoreConfig.subtitle}</h3>
                  <p className="text-gray-300 text-sm">{scoreConfig.description}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Suggestions section */}
          <div className="mb-8 animate-slide-up animation-delay-800">
            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 to-violet-400 rounded-full"></div>
              Optimization Insights
            </h4>
            <div className="space-y-4">
              {suggestions.map((suggestion, index) => (
                <div 
                  key={index} 
                  className="group/suggestion flex items-start gap-4 p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 animate-slide-in-left"
                  style={{ animationDelay: `${index * 100 + 1000}ms` }}
                >
                  <div className={`p-2 rounded-lg transition-transform duration-300 group-hover/suggestion:scale-110 ${
                    suggestion.type === "good" 
                      ? "bg-gradient-to-r from-emerald-400 to-green-400" 
                      : "bg-gradient-to-r from-amber-400 to-orange-400"
                  }`}>
                    {suggestion.type === "good" ? (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className={`font-medium transition-colors duration-300 ${
                      suggestion.type === "good" 
                        ? "text-emerald-300 group-hover/suggestion:text-emerald-200" 
                        : "text-amber-300 group-hover/suggestion:text-amber-200"
                    }`}>
                      {suggestion.tip}
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full opacity-0 group-hover/suggestion:opacity-100 transition-opacity duration-300 ${
                    suggestion.type === "good" ? "bg-emerald-400" : "bg-amber-400"
                  }`}></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Footer encouragement */}
          <div className="animate-fade-in animation-delay-1200">
            <div className="relative p-6 bg-gradient-to-r from-violet-400/10 via-cyan-400/10 to-emerald-400/10 rounded-xl border border-white/10 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-xl animate-pulse-glow">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-white font-semibold mb-1">Keep Optimizing!</h5>
                  <p className="text-gray-300 text-sm">
                    Continuous improvement in ATS compatibility increases your chances of getting past automated filters and reaching human recruiters.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <style jsx>{`
        @keyframes draw-circle {
          from {
            stroke-dasharray: 0 251.2;
          }
          to {
            stroke-dasharray: ${2.51 * score} 251.2;
          }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-in-left {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes slide-in-right {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.8; 
            box-shadow: 0 0 5px currentColor; 
          }
          50% { 
            opacity: 1; 
            box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; 
          }
        }
        
        .animate-draw-circle {
          animation: draw-circle 2s ease-out both;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out both;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out both;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-1200 { animation-delay: 1.2s; }
      `}</style>
    </div>
  )
}

export default ATS