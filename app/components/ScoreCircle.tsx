import React from 'react';

const ScoreCircle = ({ score = 75 }: { score: number }) => {
    const radius = 40;
    const stroke = 8;
    const normalizedRadius = radius - stroke / 2;
    const circumference = 2 * Math.PI * normalizedRadius;
    const progress = score / 100;
    const strokeDashoffset = circumference * (1 - progress);

    // Dynamic gradient based on score
    const getGradientColors = (score: number) => {
        if (score >= 80) return { start: '#10b981', middle: '#06b6d4', end: '#14b8a6' }; // emerald to cyan to teal
        if (score >= 60) return { start: '#f59e0b', middle: '#eab308', end: '#f97316' }; // amber to yellow to orange
        if (score >= 40) return { start: '#f97316', middle: '#ef4444', end: '#ec4899' }; // orange to red to pink
        return { start: '#ef4444', middle: '#f43f5e', end: '#d946ef' }; // red to rose to fuchsia
    };

    const colors = getGradientColors(score);

    return (
        <div className="relative group">
            {/* Outer animated glow */}
            <div className="absolute -inset-2 opacity-30 group-hover:opacity-50 transition-all duration-700">
                <div 
                    className="w-full h-full rounded-full blur-xl animate-pulse-glow"
                    style={{
                        background: `linear-gradient(45deg, ${colors.start}, ${colors.middle}, ${colors.end})`
                    }}
                ></div>
            </div>

            {/* Main container with glassmorphism */}
            <div className="relative w-[100px] h-[100px] backdrop-blur-xl bg-black/40 border border-white/10 rounded-full shadow-2xl hover:shadow-2xl transition-all duration-700 hover:scale-105 transform-gpu">
                {/* Animated gradient border */}
                <div 
                    className="absolute -inset-0.5 rounded-full opacity-60 blur-sm animate-gradient-rotate group-hover:opacity-80 transition-all duration-700"
                    style={{
                        background: `linear-gradient(45deg, ${colors.start}, ${colors.middle}, ${colors.end})`
                    }}
                ></div>
                
                {/* Inner container */}
                <div className="relative w-full h-full bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90 backdrop-blur-xl rounded-full border border-white/5">
                    <svg
                        height="100%"
                        width="100%"
                        viewBox="0 0 100 100"
                        className="transform -rotate-90"
                    >
                        <defs>
                            {/* Enhanced background gradient */}
                            <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="#374151" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#1f2937" stopOpacity="0.4" />
                            </linearGradient>
                            
                            {/* Dynamic progress gradient */}
                            <linearGradient id="grad" x1="1" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={colors.start} />
                                <stop offset="50%" stopColor={colors.middle} />
                                <stop offset="100%" stopColor={colors.end} />
                            </linearGradient>
                            
                            {/* Animated shimmer effect */}
                            <linearGradient id="shimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="transparent" />
                                <stop offset="50%" stopColor="rgba(255,255,255,0.3)" />
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
                        
                        {/* Background circle with enhanced styling */}
                        <circle
                            cx="50"
                            cy="50"
                            r={normalizedRadius}
                            stroke="url(#bgGrad)"
                            strokeWidth={stroke}
                            fill="transparent"
                        />
                        
                        {/* Progress circle with animation */}
                        <circle
                            cx="50"
                            cy="50"
                            r={normalizedRadius}
                            stroke="url(#grad)"
                            strokeWidth={stroke}
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out"
                            style={{
                                filter: `drop-shadow(0 0 8px ${colors.middle}40)`
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
                        
                        {/* Shimmer overlay on progress */}
                        <circle
                            cx="50"
                            cy="50"
                            r={normalizedRadius}
                            stroke="url(#shimmer)"
                            strokeWidth={stroke}
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="opacity-60"
                        />
                    </svg>

                    {/* Enhanced score display */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        {/* Floating particles */}
                        <div className="absolute inset-0 opacity-40">
                            <div 
                                className="absolute top-3 left-6 w-1 h-1 rounded-full animate-ping animation-delay-500"
                                style={{ backgroundColor: colors.start }}
                            ></div>
                            <div 
                                className="absolute top-6 right-4 w-0.5 h-0.5 rounded-full animate-pulse animation-delay-1000"
                                style={{ backgroundColor: colors.middle }}
                            ></div>
                            <div 
                                className="absolute bottom-4 left-4 w-0.5 h-0.5 rounded-full animate-ping animation-delay-1500"
                                style={{ backgroundColor: colors.end }}
                            ></div>
                            <div 
                                className="absolute bottom-6 right-6 w-1 h-1 rounded-full animate-pulse animation-delay-2000"
                                style={{ backgroundColor: colors.middle }}
                            ></div>
                        </div>

                        {/* Score text with gradient */}
                        <div className="relative z-10 animate-scale-in animation-delay-1000">
                            <span 
                                className="font-bold text-sm bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_100%]"
                                style={{
                                    backgroundImage: `linear-gradient(45deg, ${colors.start}, ${colors.middle}, ${colors.end})`
                                }}
                            >
                                {`${score}/100`}
                            </span>
                        </div>

                        {/* Subtle pulse ring */}
                        <div className="absolute inset-0 rounded-full border border-white/5 animate-ping opacity-20 animation-delay-2000"></div>
                    </div>

                    {/* Interactive hover glow */}
                    <div 
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 transition-all duration-700 animate-pulse"
                        style={{
                            background: `linear-gradient(45deg, ${colors.start}, ${colors.middle}, ${colors.end})`
                        }}
                    ></div>
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
                        opacity: 0.3; 
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.5; 
                        transform: scale(1.1);
                    }
                }
                
                @keyframes scale-in {
                    0% { 
                        opacity: 0; 
                        transform: scale(0.8); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: scale(1); 
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
                
                .animation-delay-500 { animation-delay: 0.5s; }
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-1500 { animation-delay: 1.5s; }
                .animation-delay-2000 { animation-delay: 2s; }
            `}</style>
        </div>
    );
};

export default ScoreCircle;