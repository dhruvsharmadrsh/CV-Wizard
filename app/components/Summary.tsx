import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    // Dynamic color system matching the theme
    const getScoreColors = (score: number) => {
        if (score > 70) return {
            textClass: 'text-emerald-400',
            gradientClass: 'from-emerald-400 via-cyan-400 to-teal-400',
            glowColor: 'rgba(16, 185, 129, 0.3)'
        };
        if (score > 49) return {
            textClass: 'text-amber-400',
            gradientClass: 'from-amber-400 via-yellow-400 to-orange-400',
            glowColor: 'rgba(245, 158, 11, 0.3)'
        };
        return {
            textClass: 'text-red-400',
            gradientClass: 'from-red-400 via-rose-400 to-pink-400',
            glowColor: 'rgba(239, 68, 68, 0.3)'
        };
    };

    const colors = getScoreColors(score);

    return (
        <div className="group relative">
            {/* Subtle glow effect */}
            <div 
                className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-30 transition-all duration-500 blur-lg"
                style={{ backgroundColor: colors.glowColor }}
            ></div>
            
            <div className="relative backdrop-blur-xl bg-black/20 border border-white/10 rounded-2xl p-6 hover:bg-black/30 transition-all duration-500 hover:scale-[1.02] transform-gpu">
                {/* Animated gradient border */}
                <div 
                    className={`absolute -inset-0.5 bg-gradient-to-r ${colors.gradientClass} rounded-2xl opacity-0 group-hover:opacity-20 blur-sm transition-all duration-500`}
                ></div>
                
                <div className="relative">
                    {/* Floating particles */}
                    <div className="absolute inset-0 opacity-30">
                        <div 
                            className="absolute top-2 right-4 w-1 h-1 rounded-full animate-ping animation-delay-500"
                            style={{ backgroundColor: colors.textClass.replace('text-', '#') }}
                        ></div>
                        <div 
                            className="absolute bottom-2 left-6 w-0.5 h-0.5 rounded-full animate-pulse animation-delay-1000"
                            style={{ backgroundColor: colors.textClass.replace('text-', '#') }}
                        ></div>
                    </div>

                    <div className="flex flex-row gap-4 items-center justify-between">
                        <div className="flex flex-row gap-3 items-center">
                            <h3 className="text-xl font-semibold text-gray-200 group-hover:text-white transition-colors duration-300">
                                {title}
                            </h3>
                            <div className="animate-scale-in animation-delay-500">
                                <ScoreBadge score={score} />
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <span 
                                className={`text-2xl font-bold ${colors.textClass} bg-gradient-to-r ${colors.gradientClass} bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_100%]`}
                            >
                                {score}
                            </span>
                            <span className="text-xl text-gray-400 font-medium">/100</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Summary = ({ feedback }: { feedback: any }) => {
    // Dynamic overall score colors
    const getOverallScoreColors = (score: number) => {
        if (score >= 80) return 'from-emerald-400 via-cyan-400 to-teal-400';
        if (score >= 60) return 'from-amber-400 via-yellow-400 to-orange-400';
        if (score >= 40) return 'from-orange-400 via-red-400 to-pink-400';
        return 'from-red-400 via-rose-400 to-fuchsia-400';
    };

    const overallGradient = getOverallScoreColors(feedback.overallScore);

    return (
        <div className="relative group">
            {/* Outer aurora glow */}
            <div className="absolute -inset-2 opacity-20 group-hover:opacity-30 transition-all duration-700">
                <div className={`w-full h-full bg-gradient-to-br ${overallGradient} rounded-3xl blur-2xl animate-pulse-glow`}></div>
            </div>

            {/* Main container with glassmorphism */}
            <div className="relative backdrop-blur-2xl bg-black/40 border border-white/10 rounded-3xl shadow-2xl hover:shadow-2xl transition-all duration-700 overflow-hidden">
                {/* Animated gradient border */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${overallGradient} rounded-3xl opacity-60 blur-sm animate-gradient-rotate group-hover:opacity-80 transition-all duration-700`}></div>
                
                {/* Inner container */}
                <div className="relative bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90 backdrop-blur-xl rounded-3xl border border-white/5">
                    {/* Header section */}
                    <div className="relative p-8">
                        {/* Background particles */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-4 left-8 w-2 h-2 bg-emerald-400 rounded-full animate-ping animation-delay-500"></div>
                            <div className="absolute top-6 right-12 w-1 h-1 bg-cyan-400 rounded-full animate-pulse animation-delay-1000"></div>
                            <div className="absolute bottom-8 left-16 w-1.5 h-1.5 bg-violet-400 rounded-full animate-ping animation-delay-1500"></div>
                            <div className="absolute bottom-4 right-8 w-1 h-1 bg-fuchsia-400 rounded-full animate-pulse animation-delay-2000"></div>
                        </div>

                        <div className="relative flex flex-row items-center gap-8">
                            <div className="animate-scale-in">
                                <ScoreGauge score={feedback.overallScore} />
                            </div>

                            <div className="flex flex-col gap-4 animate-slide-up animation-delay-500">
                                <h2 className={`text-3xl font-black bg-gradient-to-r ${overallGradient} bg-clip-text text-transparent animate-gradient-flow bg-[length:300%_100%]`}>
                                    Your Resume Score
                                </h2>
                                
                                <p className="text-gray-300 text-base leading-relaxed max-w-md">
                                    This score is calculated based on the variables listed below.
                                    <span className="inline-block w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full ml-2 animate-pulse"></span>
                                </p>

                                {/* Score indicators */}
                                <div className="flex items-center gap-4 mt-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow"></div>
                                        <span className="text-xs text-emerald-300 font-medium">Analyzed</span>
                                    </div>
                                    <div className="w-px h-3 bg-gray-600"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow animation-delay-500"></div>
                                        <span className="text-xs text-cyan-300 font-medium">AI Powered</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories section */}
                    <div className="px-8 pb-8 space-y-4">
                        <div className="animate-slide-up animation-delay-700">
                            <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                        </div>
                        <div className="animate-slide-up animation-delay-900">
                            <Category title="Content" score={feedback.content.score} />
                        </div>
                        <div className="animate-slide-up animation-delay-1100">
                            <Category title="Structure" score={feedback.structure.score} />
                        </div>
                        <div className="animate-slide-up animation-delay-1300">
                            <Category title="Skills" score={feedback.skills.score} />
                        </div>
                    </div>

                    {/* Interactive hover overlay */}
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${overallGradient} opacity-0 group-hover:opacity-5 transition-all duration-700`}></div>
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
                        opacity: 0.2; 
                        transform: scale(1);
                    }
                    50% { 
                        opacity: 0.3; 
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
                
                @keyframes slide-up {
                    0% { 
                        opacity: 0; 
                        transform: translateY(20px); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: translateY(0); 
                    }
                }
                
                .animate-gradient-flow {
                    animation: gradient-flow 4s ease-in-out infinite;
                }
                
                .animate-gradient-rotate {
                    animation: gradient-rotate 8s linear infinite;
                }
                
                .animate-pulse-glow {
                    animation: pulse-glow 2s ease-in-out infinite;
                }
                
                .animate-scale-in {
                    animation: scale-in 1s ease-out both;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out both;
                }
                
                .animation-delay-500 { animation-delay: 0.5s; }
                .animation-delay-700 { animation-delay: 0.7s; }
                .animation-delay-900 { animation-delay: 0.9s; }
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-1100 { animation-delay: 1.1s; }
                .animation-delay-1300 { animation-delay: 1.3s; }
                .animation-delay-1500 { animation-delay: 1.5s; }
                .animation-delay-2000 { animation-delay: 2s; }
            `}</style>
        </div>
    );
};

export default Summary;