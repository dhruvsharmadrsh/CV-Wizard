import { useEffect, useRef, useState } from "react";

const ScoreGauge = ({ score = 75 }: { score: number }) => {
    const [pathLength, setPathLength] = useState(0);
    const pathRef = useRef<SVGPathElement>(null);

    const percentage = score / 100;

    useEffect(() => {
        if (pathRef.current) {
            setPathLength(pathRef.current.getTotalLength());
        }
    }, []);

    // Dynamic gradient colors based on score
    const getGradientColors = (score: number) => {
        if (score >= 80) return { start: '#10b981', middle: '#06b6d4', end: '#14b8a6' }; // emerald to cyan to teal
        if (score >= 60) return { start: '#f59e0b', middle: '#eab308', end: '#f97316' }; // amber to yellow to orange
        if (score >= 40) return { start: '#f97316', middle: '#ef4444', end: '#ec4899' }; // orange to red to pink
        return { start: '#ef4444', middle: '#f43f5e', end: '#d946ef' }; // red to rose to fuchsia
    };

    const colors = getGradientColors(score);

    return (
        <div className="flex flex-col items-center">
            <div className="relative group">
                {/* Outer glow effect */}
                <div className="absolute -inset-4 opacity-30 group-hover:opacity-50 transition-all duration-700">
                    <div 
                        className="w-full h-full rounded-2xl blur-xl animate-pulse-glow"
                        style={{
                            background: `linear-gradient(135deg, ${colors.start}, ${colors.middle}, ${colors.end})`
                        }}
                    ></div>
                </div>

                {/* Main container with glassmorphism */}
                <div className="relative w-40 h-20 backdrop-blur-xl bg-black/40 border border-white/10 rounded-2xl shadow-2xl hover:shadow-2xl transition-all duration-700 hover:scale-105 transform-gpu p-2">
                    {/* Animated gradient border */}
                    <div 
                        className="absolute -inset-0.5 rounded-2xl opacity-60 blur-sm animate-gradient-rotate group-hover:opacity-80 transition-all duration-700"
                        style={{
                            background: `linear-gradient(135deg, ${colors.start}, ${colors.middle}, ${colors.end})`
                        }}
                    ></div>
                    
                    {/* Inner container */}
                    <div className="relative w-full h-full bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90 backdrop-blur-xl rounded-2xl border border-white/5 overflow-hidden">
                        {/* Floating particles */}
                        <div className="absolute inset-0 opacity-40">
                            <div 
                                className="absolute top-2 left-4 w-1 h-1 rounded-full animate-ping animation-delay-500"
                                style={{ backgroundColor: colors.start }}
                            ></div>
                            <div 
                                className="absolute top-1 right-6 w-0.5 h-0.5 rounded-full animate-pulse animation-delay-1000"
                                style={{ backgroundColor: colors.middle }}
                            ></div>
                            <div 
                                className="absolute bottom-1 left-8 w-0.5 h-0.5 rounded-full animate-ping animation-delay-1500"
                                style={{ backgroundColor: colors.end }}
                            ></div>
                            <div 
                                className="absolute bottom-2 right-3 w-1 h-1 rounded-full animate-pulse animation-delay-2000"
                                style={{ backgroundColor: colors.middle }}
                            ></div>
                        </div>

                        <svg viewBox="0 0 100 50" className="w-full h-full relative z-10">
                            <defs>
                                {/* Enhanced background gradient */}
                                <linearGradient
                                    id="bgGaugeGradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
                                    <stop offset="0%" stopColor="#374151" stopOpacity="0.3" />
                                    <stop offset="50%" stopColor="#1f2937" stopOpacity="0.5" />
                                    <stop offset="100%" stopColor="#374151" stopOpacity="0.3" />
                                </linearGradient>

                                {/* Dynamic progress gradient */}
                                <linearGradient
                                    id="gaugeGradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
                                    <stop offset="0%" stopColor={colors.start} />
                                    <stop offset="50%" stopColor={colors.middle} />
                                    <stop offset="100%" stopColor={colors.end} />
                                </linearGradient>

                                {/* Animated shimmer effect */}
                                <linearGradient
                                    id="gaugeShimmer"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
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

                                {/* Glow filter */}
                                <filter id="glow">
                                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                                    <feMerge> 
                                        <feMergeNode in="coloredBlur"/>
                                        <feMergeNode in="SourceGraphic"/>
                                    </feMerge>
                                </filter>
                            </defs>

                            {/* Background arc with enhanced styling */}
                            <path
                                d="M10,50 A40,40 0 0,1 90,50"
                                fill="none"
                                stroke="url(#bgGaugeGradient)"
                                strokeWidth="10"
                                strokeLinecap="round"
                            />

                            {/* Progress arc with animation and glow */}
                            <path
                                ref={pathRef}
                                d="M10,50 A40,40 0 0,1 90,50"
                                fill="none"
                                stroke="url(#gaugeGradient)"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={pathLength}
                                strokeDashoffset={pathLength * (1 - percentage)}
                                filter="url(#glow)"
                                className="transition-all duration-2000 ease-out"
                            >
                                <animate
                                    attributeName="stroke-dashoffset"
                                    values={`${pathLength};${pathLength * (1 - percentage)}`}
                                    dur="2.5s"
                                    fill="freeze"
                                    begin="0.5s"
                                />
                            </path>

                            {/* Shimmer overlay on progress */}
                            <path
                                d="M10,50 A40,40 0 0,1 90,50"
                                fill="none"
                                stroke="url(#gaugeShimmer)"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray={pathLength}
                                strokeDashoffset={pathLength * (1 - percentage)}
                                className="opacity-60"
                            />

                            {/* Progress indicator dot */}
                            {percentage > 0 && (
                                <circle
                                    cx={10 + 80 * percentage}
                                    cy={50 - 40 * Math.sin(Math.PI * percentage)}
                                    r="4"
                                    className="animate-pulse-glow opacity-90"
                                    style={{ fill: colors.middle }}
                                >
                                    <animate
                                        attributeName="r"
                                        values="3;5;3"
                                        dur="2s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            )}
                        </svg>

                        {/* Enhanced score display */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center pt-2">
                            <div className="relative z-10 animate-scale-in animation-delay-1500">
                                <div 
                                    className="text-xl font-bold pt-4 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_100%]"
                                    style={{
                                        backgroundImage: `linear-gradient(135deg, ${colors.start}, ${colors.middle}, ${colors.end})`
                                    }}
                                >
                                    {score}/100
                                </div>
                                
                                {/* Score label */}
                                <div className="text-xs text-gray-400 font-medium text-center mt-1 opacity-80">
                                    {score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Work'}
                                </div>
                            </div>
                        </div>

                        {/* Interactive hover glow */}
                        <div 
                            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-15 transition-all duration-700 animate-pulse"
                            style={{
                                background: `linear-gradient(135deg, ${colors.start}, ${colors.middle}, ${colors.end})`
                            }}
                        ></div>

                        {/* Subtle pulse ring */}
                        <div className="absolute inset-0 rounded-2xl border border-white/5 animate-ping opacity-20 animation-delay-3000"></div>
                    </div>
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
                .animation-delay-3000 { animation-delay: 3s; }
            `}</style>
        </div>
    );
};

export default ScoreGauge;