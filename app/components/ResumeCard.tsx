import {Link} from "react-router"; 
import ScoreCircle from "~/components/ScoreCircle"; 
import {useEffect, useState} from "react"; 
import {usePuterStore} from "~/lib/puter";  

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {     
    const { fs } = usePuterStore();     
    const [resumeUrl, setResumeUrl] = useState('');      

    useEffect(() => {         
        const loadResume = async () => {             
            const blob = await fs.read(imagePath);             
            if(!blob) return;             
            let url = URL.createObjectURL(blob);             
            setResumeUrl(url);         
        }          

        loadResume();     
    }, [imagePath]);      

    return (         
        <>
            <Link to={`/resume/${id}`} className="group relative block animate-fade-in-up">
                {/* Animated glow effect container */}
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/30 via-cyan-400/30 to-violet-400/30 rounded-3xl opacity-0 blur-lg group-hover:opacity-100 transition-all duration-700 animate-gradient-rotate"></div>
                
                {/* Main card container */}
                <div className="relative backdrop-blur-xl bg-black/40 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-[1.02] transform-gpu group-hover:border-white/20">
                    
                    {/* Floating background orbs */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full mix-blend-screen filter blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-1000 animate-float"></div>
                        <div className="absolute -bottom-5 -left-5 w-24 h-24 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full mix-blend-screen filter blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-1000 animate-float-reverse"></div>
                    </div>

                    {/* Enhanced header section */}
                    <div className="relative p-6 bg-gradient-to-r from-gray-900/60 to-black/40 border-b border-white/5">
                        <div className="flex items-start justify-between gap-4">
                            
                            {/* Company and job info */}
                            <div className="flex flex-col gap-2 flex-1 min-w-0">
                                {companyName && (
                                    <div className="relative">
                                        <h2 className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:via-cyan-200 group-hover:to-violet-300 transition-all duration-500 break-words">
                                            {companyName}
                                        </h2>
                                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
                                    </div>
                                )}
                                
                                {jobTitle && (
                                    <h3 className="text-base text-gray-400 group-hover:text-gray-300 transition-colors duration-300 break-words flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse-glow"></div>
                                        {jobTitle}
                                    </h3>
                                )}
                                
                                {!companyName && !jobTitle && (
                                    <div className="relative">
                                        <h2 className="text-xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-200 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:via-cyan-200 group-hover:to-violet-300 transition-all duration-500">
                                            Resume
                                        </h2>
                                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-cyan-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
                                    </div>
                                )}

                                {/* Status indicators */}
                                <div className="flex items-center gap-3 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse-glow"></div>
                                        <span className="text-xs text-emerald-300 font-medium">AI Analyzed</span>
                                    </div>
                                    <div className="w-px h-3 bg-gray-600"></div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse-glow animation-delay-300"></div>
                                        <span className="text-xs text-cyan-300 font-medium">Ready</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Enhanced score circle */}
                            <div className="flex-shrink-0 relative">
                                <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/20 to-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
                                <div className="relative transform group-hover:scale-110 transition-transform duration-300">
                                    <ScoreCircle score={feedback.overallScore} />
                                </div>
                                
                                {/* Floating particles around score */}
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce-slow transition-opacity duration-300"></div>
                                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow transition-opacity duration-300"></div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced image section */}
                    {resumeUrl && (
                        <div className="relative overflow-hidden bg-gray-900/30">
                            {/* Gradient overlay for better integration */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 z-10"></div>
                            
                            {/* Enhanced image container */}
                            <div className="relative group/image">
                                <img
                                    src={resumeUrl}
                                    alt="resume"
                                    className="w-full h-[350px] max-sm:h-[200px] object-cover object-top transition-transform duration-700 group-hover:scale-105 filter group-hover:brightness-110"
                                />
                                
                                {/* Hover overlay with preview text */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6 z-20">
                                    <div className="flex items-center gap-2 text-white font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                        <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        <span>View Analysis</span>
                                    </div>
                                </div>

                                {/* Shimmer effect on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer"></div>
                                </div>
                            </div>

                            {/* Bottom gradient border */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400/0 via-emerald-400/50 via-cyan-400/50 via-violet-400/50 to-violet-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>
                    )}

                    {/* Interactive corner elements */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-6 h-6 border-t-2 border-r-2 border-emerald-400/50 transform rotate-45"></div>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <div className="w-6 h-6 border-b-2 border-l-2 border-cyan-400/50 transform rotate-45"></div>
                    </div>
                </div>
            </Link>

            {/* Consistent CSS animations */}
            <style jsx>{`
                @keyframes gradient-rotate {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.05); }
                    100% { transform: rotate(360deg) scale(1); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                    25% { transform: translateY(-15px) translateX(8px) rotate(1deg); }
                    50% { transform: translateY(-30px) translateX(-5px) rotate(-1deg); }
                    75% { transform: translateY(-8px) translateX(-12px) rotate(0.5deg); }
                }
                
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                    25% { transform: translateY(10px) translateX(-8px) rotate(-1deg); }
                    50% { transform: translateY(20px) translateX(6px) rotate(1deg); }
                    75% { transform: translateY(4px) translateX(10px) rotate(-0.5deg); }
                }
                
                @keyframes pulse-glow {
                    0%, 100% { 
                        opacity: 0.6; 
                        box-shadow: 0 0 5px currentColor; 
                    }
                    50% { 
                        opacity: 1; 
                        box-shadow: 0 0 15px currentColor, 0 0 25px currentColor; 
                    }
                }
                
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-8px); }
                }
                
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 1; }
                    75%, 100% { transform: scale(1.5); opacity: 0; }
                }
                
                @keyframes fade-in-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%) skewX(-12deg); }
                    100% { transform: translateX(200%) skewX(-12deg); }
                }
                
                .animate-gradient-rotate {
                    animation: gradient-rotate 8s linear infinite;
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-float-reverse {
                    animation: float-reverse 8s ease-in-out infinite;
                }
                
                .animate-pulse-glow {
                    animation: pulse-glow 2s ease-in-out infinite;
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
                
                .animate-ping-slow {
                    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out both;
                }
                
                .animate-shimmer {
                    animation: shimmer 2s ease-in-out infinite;
                }
                
                .animation-delay-300 { animation-delay: 0.3s; }
            `}</style>
        </>
    ) 
} 

export default ResumeCard