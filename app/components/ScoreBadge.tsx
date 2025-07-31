import React from 'react';

const ScoreCircle = ({ score = 75 }: { score: number }) => {
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const progress = score / 100;
    const strokeDashoffset = circumference * (1 - progress);

    // Dynamic color based on score
    const getScoreColor = (score: number) => {
        if (score >= 80) return 'from-emerald-400 via-cyan-400 to-teal-400';
        if (score >= 60) return 'from-amber-400 via-yellow-400 to-orange-400';
        if (score >= 40) return 'from-orange-400 via-red-400 to-pink-400';
        return 'from-red-400 via-rose-400 to-fuchsia-400';
    };

    const getGlowColor = (score: number) => {
        if (score >= 80) return 'shadow-emerald-500/30';
        if (score >= 60) return 'shadow-amber-500/30';
        if (score >= 40) return 'shadow-orange-500/30';
        return 'shadow-red-500/30';
    };

    return (
        <div className="relative group">
            {/* Outer glow effect */}
            <div className={`absolute inset-0 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-all duration-700 bg-gradient-to-r ${getScoreColor(score)} animate-pulse-glow`}></div>
            
            {/* Main container */}
            <div className="relative w-[100px] h-[100px] backdrop-blur-xl bg-black/40 border border-white/10 rounded-full shadow-2xl hover:shadow-2xl transition-all duration-700 hover:scale-110 transform-gpu">
                {/* Animated border gradient */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${getScoreColor(score)} rounded-full opacity-60 blur-sm animate-gradient-rotate group-hover:opacity-80 transition-all duration-700`}></div>
                
                {/* Inner container */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90 backdrop-blur-xl rounded-full border border-white/5">
                    {/* SVG Circle */}
                    <svg
                        height="100%"
                        width="100%"
                        viewBox="0 0 100 100"
                        className="transform -rotate-90 absolute inset-0"
                    >
                        <defs>
                            {/* Background circle gradient */}
                            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#374151" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#1f2937" stopOpacity="0.5" />
                            </linearGradient>
                            
                            {/* Progress circle gradient */}
                            <linearGradient id={`progressGrad-${score}`} x1="0%" y1="0%" x2="100%" y2="100%">
                                {score >= 80 ? (
                                    <>
                                        <stop offset="0%" stopColor="#10b981" />
                                        <stop offset="50%" stopColor="#06b6d4" />
                                        <stop offset="100%" stopColor="#14b8a6" />
                                    </>
                                ) : score >= 60 ? (
                                    <>
                                        <stop offset="0%" stopColor="#f59e0b" />
                                        <stop offset="50%" stopColor="#eab308" />
                                        <stop offset="100%" stopColor="#f97316" />
                                    </>
                                ) : score >= 40 ? (
                                    <>
                                        <stop offset="0%" stopColor="#f97316" />
                                        <stop offset="50%" stopColor="#ef4444" />
                                        <stop offset="100%" stopColor="#ec4899" />
                                    </>
                                ) : (
                                    <>
                                        <stop offset="0%" stopColor="#ef4444" />
                                        <stop offset="50%" stopColor="#f43f5e" />
                                        <stop offset="100%" stopColor="#d946ef" />
                                    </>
                                )}
                            </linearGradient>
                            
                            {/* Animated gradient for shimmer effect */}
                            <linearGradient id={`shimmer-${score}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="rgba(255,255,255,0.4)" />
                                <stop offset="100%" stopColor="transparent" />
                                <animateTransform
                                    attributeName="gradientTransform"
                                    type="translate"
                                    values="-100 0;100 0;-100 0"
                                    dur="3s"
                                    repeatCount="indefinite"
                                />
                            </linearGradient>
                        </defs>
                        
                        {/* Background circle */}
                        <circle
                            cx="50"
                            cy="50"
                            r={normalizedRadius}
                            stroke="url(#bgGrad)"
                            strokeWidth={stroke}
                            fill="transparent"
                            className="opacity-60"
                        />
                        
                        {/* Progress circle with animation */}
                        <circle
                            cx="50"
                            cy="50"
                            r={normalizedRadius}
                            stroke={`url(#progressGrad-${score})`}
                            strokeWidth={stroke}
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out animate-draw-circle"
                            style={{
                                filter: 'drop-shadow(0 0 8px currentColor)',
                            }}
                        >
                            <animate
                                attributeName="stroke-dashoffset"
                                values={`${circumference};${strokeDashoffset}`}
                                dur="2s"
                                fill="freeze"
                                begin="0s"
                            />
                        </circle>
                        
                        {/* Shimmer overlay */}
                        <circle
                            cx="50"
                            cy="50"
                            r={normalizedRadius}
                            stroke={`url(#shimmer-${score})`}
                            strokeWidth={stroke}
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="opacity-70"
                        />
                    </svg>

                    {/* Score content with enhanced styling */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {/* Animated particles around score */}
                        <div className="absolute inset-0 opacity-60">
                            <div className="absolute top-3 left-6 w-1 h-1 bg-emerald-400 rounded-full animate-ping animation-delay-500"></div>
                            <div className="absolute top-6 right-4 w-0.5 h-0.5 bg-cyan-400 rounded-full animate-pulse animation-delay-1000"></div>
                            <div className="absolute bottom-4 left-4 w-0.5 h-0.5 bg-violet-400 rounded-full animate-ping animation-delay-1500"></div>
                            <div className="absolute bottom-6 right-6 w-1 h-1 bg-fuchsia-400 rounded-full animate-pulse animation-delay-2000"></div>
                        </div>

                        {/* Score display */}
                        <div className="relative z-10 text-center animate-scale-in animation-delay-1000">
                            <div className={`font-bold text-lg bg-gradient-to-r ${getScoreColor(score)} bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_100%]`}>
                                {score}
                            </div>
                            <div className="text-xs text-gray-400 font-medium mt-0.5 opacity-80">
                                /100
                            </div>
                        </div>

                        {/* Pulse indicator */}
                        <div className={`absolute inset-0 rounded-full border-2 border-white/10 animate-ping opacity-20 animation-delay-2000`}></div>
                    </div>

                    {/* Interactive glow on hover */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${getScoreColor(score)} opacity-0 group-hover:opacity-20 transition-all duration-700 animate-pulse`}></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradient-flow {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes gradient-rotate {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.05); }
                    100% { transform: rotate(360deg) scale(1); }
                }
                
                @keyframes pulse-glow {
                    0%, 100% { 
                        opacity: 0.4; 
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.6; 
                        transform: scale(1.1);
                    }
                }
                
                @keyframes scale-in {
                    0% { 
                        opacity: 0; 
                        transform: scale(0.5); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: scale(1); 
                    }
                }
                
                @keyframes draw-circle {
                    0% { 
                        stroke-dashoffset: ${circumference}; 
                        opacity: 0;
                    }
                    50% {
                        opacity: 0.5;
                    }
                    100% { 
                        stroke-dashoffset: ${strokeDashoffset}; 
                        opacity: 1;
                    }
                }
                
                .animate-gradient-flow {
                    animation: gradient-flow 3s ease-in-out infinite;
                }
                
                .animate-gradient-rotate {
                    animation: gradient-rotate 4s linear infinite;
                }
                
                .animate-pulse-glow {
                    animation: pulse-glow 2s ease-in-out infinite;
                }
                
                .animate-scale-in {
                    animation: scale-in 1s ease-out both;
                }
                
                .animate-draw-circle {
                    animation: draw-circle 2s ease-out both;
                }
                
                .animation-delay-500 { animation-delay: 0.5s; }
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-1500 { animation-delay: 1.5s; }
                .animation-delay-2000 { animation-delay: 2s; }
            `}</style>
        </div>
    );
};

export default ScoreCircle;