import {Link} from "react-router";

const Navbar = () => {
    return (
        <>
            {/* Enhanced navbar with consistent theming */}
            <nav className="relative z-50 backdrop-blur-xl bg-black/20 border-b border-white/10 animate-fade-in">
                {/* Animated background orbs for consistency */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 rounded-full mix-blend-screen filter blur-2xl opacity-10 animate-float"></div>
                    <div className="absolute -top-5 -right-5 w-32 h-32 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 rounded-full mix-blend-screen filter blur-2xl opacity-8 animate-float-reverse"></div>
                </div>

                <div className="relative px-6 py-4 flex items-center justify-between">
                    {/* Enhanced logo */}
                    <Link to="/" className="group relative">
                        <div className="relative">
                            {/* Glow effect behind logo */}
                            <div className="absolute -inset-2 bg-gradient-to-r from-emerald-400/30 via-cyan-400/30 to-violet-400/30 rounded-xl opacity-0 blur-lg group-hover:opacity-100 transition-all duration-500 animate-gradient-rotate"></div>
                            
                            <div className="relative flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-black/40 to-black/20 backdrop-blur-sm rounded-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
                                {/* Logo icon */}
                                <div className="relative">
                                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-emerald-500/30 transition-shadow duration-300">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    {/* Pulsing dot indicator */}
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full animate-pulse-glow"></div>
                                </div>

                                {/* Brand text */}
                                <div className="flex flex-col">
                                    <h1 className="text-2xl font-black bg-gradient-to-r from-emerald-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent animate-gradient-flow bg-[length:200%_100%] group-hover:scale-105 transition-transform duration-300">
                                        CV Wizard
                                    </h1>
                                    <div className="h-0.5 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-expand-contract"></div>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Enhanced upload button */}
                    <Link to="/upload" className="group relative">
                        {/* Animated glow effect */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-xl opacity-60 blur-lg group-hover:opacity-100 transition-all duration-500 animate-gradient-rotate"></div>
                        
                        <div className="relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 backdrop-blur-sm rounded-xl border border-white/20 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 transform-gpu">
                            {/* Upload icon with animation */}
                            <div className="relative">
                                <div className="p-1.5 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-lg group-hover:shadow-lg group-hover:shadow-emerald-500/30 transition-shadow duration-300">
                                    <svg className="w-4 h-4 text-white transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                
                                {/* Floating particles */}
                                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-emerald-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce-slow transition-opacity duration-300"></div>
                                <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping-slow transition-opacity duration-300"></div>
                            </div>

                            <span className="font-semibold text-gray-200 group-hover:text-white transition-colors duration-300">
                                Upload Resume
                            </span>

                            {/* Arrow indicator */}
                            <svg className="w-4 h-4 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                </div>

                {/* Animated bottom border */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 via-cyan-400/50 via-violet-400/50 to-transparent animate-gradient-flow"></div>
            </nav>

            {/* Consistent CSS animations */}
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
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                    25% { transform: translateY(-10px) translateX(5px) rotate(1deg); }
                    50% { transform: translateY(-20px) translateX(-3px) rotate(-1deg); }
                    75% { transform: translateY(-5px) translateX(-8px) rotate(0.5deg); }
                }
                
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                    25% { transform: translateY(8px) translateX(-5px) rotate(-1deg); }
                    50% { transform: translateY(15px) translateX(4px) rotate(1deg); }
                    75% { transform: translateY(3px) translateX(6px) rotate(-0.5deg); }
                }
                
                @keyframes expand-contract {
                    0%, 100% { width: 100%; opacity: 0.6; }
                    50% { width: 120%; opacity: 1; }
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
                
                @keyframes fade-in {
                    0% { opacity: 0; transform: translateY(-10px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                
                .animate-gradient-flow {
                    animation: gradient-flow 3s ease-in-out infinite;
                }
                
                .animate-gradient-rotate {
                    animation: gradient-rotate 6s linear infinite;
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                
                .animate-float-reverse {
                    animation: float-reverse 5s ease-in-out infinite;
                }
                
                .animate-expand-contract {
                    animation: expand-contract 2s ease-in-out infinite;
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
                
                .animate-fade-in {
                    animation: fade-in 0.8s ease-out both;
                }
            `}</style>
        </>
    )
}

export default Navbar