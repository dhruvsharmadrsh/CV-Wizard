import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'CV Wizard' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();
    
    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])
    
    return (
        <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Dynamic animated background mesh */}
            <div className="absolute inset-0">
                {/* Primary aurora orb */}
                <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-float"></div>
                
                {/* Secondary aurora orb */}
                <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 rounded-full mix-blend-screen filter blur-3xl opacity-25 animate-float-reverse"></div>
                
                {/* Tertiary aurora orb */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse-slow"></div>
                
                {/* Additional aurora effects */}
                <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full mix-blend-screen filter blur-2xl opacity-35 animate-drift"></div>
                
                {/* Animated geometric shapes */}
                <div className="absolute top-32 left-20 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-80 animate-bounce-slow"></div>
                <div className="absolute top-1/3 right-32 w-3 h-3 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full opacity-60 animate-ping-slow"></div>
                <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-70 animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-50 animate-bounce animation-delay-3000"></div>
                
                {/* Flowing particles */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-1/4 left-10 w-1 h-20 bg-gradient-to-b from-emerald-400 to-transparent animate-flow-up"></div>
                    <div className="absolute top-1/2 right-16 w-1 h-16 bg-gradient-to-b from-violet-400 to-transparent animate-flow-up animation-delay-1000"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-1 h-24 bg-gradient-to-b from-orange-400 to-transparent animate-flow-up animation-delay-2000"></div>
                </div>
            </div>
            
            {/* Main content container */}
            <div className="relative z-10 animate-scale-in">
                {/* Outer glow container */}
                <div className="relative group">
                    {/* Multi-layered gradient border effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-3xl opacity-80 blur-lg animate-gradient-rotate group-hover:opacity-100 transition-all duration-700"></div>
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 rounded-3xl opacity-60 blur-md animate-gradient-rotate-reverse"></div>
                    
                    {/* Glass morphism card */}
                    <section className="relative backdrop-blur-2xl bg-black/40 border border-white/10 rounded-3xl p-1 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-700 hover:scale-[1.02] transform-gpu">
                        <div className="bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90 backdrop-blur-xl rounded-3xl p-12 border border-white/5">
                            <div className="flex flex-col gap-12">
                                {/* Header section with enhanced animations */}
                                <div className="flex flex-col items-center gap-6 text-center">
                                    <div className="relative group">
                                        <h1 className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent animate-gradient-flow bg-[length:300%_100%]">
                                            Welcome
                                        </h1>
                                        {/* Animated underline */}
                                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full animate-expand-contract"></div>
                                        {/* Glowing dots */}
                                        <div className="absolute -top-2 -left-2 w-2 h-2 bg-emerald-400 rounded-full opacity-60 animate-ping animation-delay-500"></div>
                                        <div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-violet-400 rounded-full opacity-80 animate-pulse animation-delay-1000"></div>
                                    </div>
                                    
                                    <h2 className="text-2xl text-gray-300 font-semibold animate-slide-up animation-delay-700 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                                        Log In to Continue Your Job Journey
                                    </h2>
                                    
                                    {/* Enhanced status indicators */}
                                    <div className="flex items-center gap-4 mt-4 animate-fade-in animation-delay-1200">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow"></div>
                                            <span className="text-sm text-emerald-300 font-medium">Secure</span>
                                        </div>
                                        <div className="w-px h-4 bg-gray-600"></div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow animation-delay-500"></div>
                                            <span className="text-sm text-cyan-300 font-medium">Lightning Fast</span>
                                        </div>
                                        <div className="w-px h-4 bg-gray-600"></div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse-glow animation-delay-1000"></div>
                                            <span className="text-sm text-violet-300 font-medium">AI Powered</span>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Enhanced button section */}
                                <div className="animate-slide-up animation-delay-1500">
                                    {isLoading ? (
                                        <button className="group relative w-full py-5 px-10 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 rounded-2xl font-bold text-white transition-all duration-500 overflow-hidden shadow-2xl shadow-cyan-500/25 animate-pulse-button">
                                            {/* Animated background layers */}
                                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-cyan-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-shimmer"></div>
                                            
                                            <div className="relative flex items-center justify-center gap-4">
                                                <div className="relative">
                                                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <div className="absolute inset-0 w-6 h-6 border-3 border-emerald-300 border-t-transparent rounded-full animate-spin animation-delay-500 opacity-50"></div>
                                                </div>
                                                <p className="text-xl font-bold">Signing you in...</p>
                                            </div>
                                        </button>
                                    ) : (
                                        <>
                                            {auth.isAuthenticated ? (
                                                <button 
                                                    className="group relative w-full py-5 px-10 bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500 hover:from-rose-600 hover:via-pink-600 hover:to-fuchsia-600 rounded-2xl font-bold text-white transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 overflow-hidden"
                                                    onClick={auth.signOut}
                                                >
                                                    {/* Multi-layer button effects */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-rose-400 via-pink-400 to-fuchsia-400 opacity-0 group-hover:opacity-30 transition-all duration-500"></div>
                                                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out skew-x-12"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                                                    
                                                    <div className="relative flex items-center justify-center gap-4">
                                                        <svg className="w-6 h-6 transition-all duration-500 group-hover:rotate-180 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        <p className="text-xl font-bold">Log Out</p>
                                                    </div>
                                                </button>
                                            ) : (
                                                <button 
                                                    className="group relative w-full py-5 px-10 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-violet-400 rounded-2xl font-bold text-white transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden"
                                                    onClick={auth.signIn}
                                                >
                                                    {/* Enhanced button effects */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
                                                    <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out skew-x-12"></div>
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-out"></div>
                                                    
                                                    {/* Particle effects on hover */}
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                        <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                                                        <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-emerald-300 rounded-full animate-pulse"></div>
                                                        <div className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-ping animation-delay-300"></div>
                                                    </div>
                                                    
                                                    <div className="relative flex items-center justify-center gap-4">
                                                        <svg className="w-6 h-6 transition-all duration-500 group-hover:translate-x-1 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                        </svg>
                                                        <p className="text-xl font-bold">Log In</p>
                                                    </div>
                                                </button>
                                            )}
                                        </>
                                    )}
                                </div>
                                
                                {/* Enhanced decorative footer */}
                                <div className="flex justify-center items-center gap-6 opacity-70 animate-fade-in animation-delay-2000">
                                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse"></div>
                                    <div className="flex gap-2">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow"></div>
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow animation-delay-300"></div>
                                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse-glow animation-delay-600"></div>
                                    </div>
                                    <div className="w-16 h-px bg-gradient-to-r from-transparent via-violet-400 to-transparent animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </section>
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
                    50% { transform: rotate(180deg) scale(1.1); }
                    100% { transform: rotate(360deg) scale(1); }
                }
                
                @keyframes gradient-rotate-reverse {
                    0% { transform: rotate(360deg) scale(1.05); }
                    50% { transform: rotate(180deg) scale(0.95); }
                    100% { transform: rotate(0deg) scale(1.05); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                    25% { transform: translateY(-20px) translateX(10px) rotate(1deg); }
                    50% { transform: translateY(-40px) translateX(-5px) rotate(-1deg); }
                    75% { transform: translateY(-10px) translateX(-15px) rotate(0.5deg); }
                }
                
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
                    25% { transform: translateY(15px) translateX(-10px) rotate(-1deg); }
                    50% { transform: translateY(30px) translateX(8px) rotate(1deg); }
                    75% { transform: translateY(5px) translateX(12px) rotate(-0.5deg); }
                }
                
                @keyframes drift {
                    0%, 100% { transform: translateX(0px) translateY(0px); }
                    25% { transform: translateX(25px) translateY(-15px); }
                    50% { transform: translateX(-20px) translateY(-30px); }
                    75% { transform: translateX(-35px) translateY(10px); }
                }
                
                @keyframes flow-up {
                    0% { transform: translateY(100px); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100px); opacity: 0; }
                }
                
                @keyframes scale-in {
                    0% { 
                        opacity: 0; 
                        transform: scale(0.8) translateY(40px); 
                    }
                    100% { 
                        opacity: 1; 
                        transform: scale(1) translateY(0px); 
                    }
                }
                
                @keyframes slide-up {
                    0% { opacity: 0; transform: translateY(30px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                
                @keyframes expand-contract {
                    0%, 100% { width: 24px; opacity: 0.8; }
                    50% { width: 48px; opacity: 1; }
                }
                
                @keyframes pulse-glow {
                    0%, 100% { 
                        opacity: 0.4; 
                        box-shadow: 0 0 5px currentColor; 
                    }
                    50% { 
                        opacity: 1; 
                        box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; 
                    }
                }
                
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.2; }
                    50% { opacity: 0.4; }
                }
                
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes ping-slow {
                    0% { transform: scale(1); opacity: 1; }
                    75%, 100% { transform: scale(2); opacity: 0; }
                }
                
                @keyframes pulse-button {
                    0%, 100% { box-shadow: 0 0 20px rgba(34, 197, 194, 0.3); }
                    50% { box-shadow: 0 0 40px rgba(34, 197, 194, 0.6), 0 0 60px rgba(34, 197, 194, 0.3); }
                }
                
                .animate-gradient-flow {
                    animation: gradient-flow 4s ease-in-out infinite;
                }
                
                .animate-gradient-rotate {
                    animation: gradient-rotate 8s linear infinite;
                }
                
                .animate-gradient-rotate-reverse {
                    animation: gradient-rotate-reverse 12s linear infinite;
                }
                
                .animate-float {
                    animation: float 6s ease-in-out infinite;
                }
                
                .animate-float-reverse {
                    animation: float-reverse 8s ease-in-out infinite;
                }
                
                .animate-drift {
                    animation: drift 10s ease-in-out infinite;
                }
                
                .animate-flow-up {
                    animation: flow-up 4s linear infinite;
                }
                
                .animate-scale-in {
                    animation: scale-in 1s ease-out;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.8s ease-out both;
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out both;
                }
                
                .animate-expand-contract {
                    animation: expand-contract 2s ease-in-out infinite;
                }
                
                .animate-pulse-glow {
                    animation: pulse-glow 2s ease-in-out infinite;
                }
                
                .animate-shimmer {
                    animation: shimmer 2s ease-in-out infinite;
                }
                
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 3s ease-in-out infinite;
                }
                
                .animate-ping-slow {
                    animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
                
                .animate-pulse-button {
                    animation: pulse-button 2s ease-in-out infinite;
                }
                
                .animation-delay-300 { animation-delay: 0.3s; }
                .animation-delay-500 { animation-delay: 0.5s; }
                .animation-delay-600 { animation-delay: 0.6s; }
                .animation-delay-700 { animation-delay: 0.7s; }
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-1200 { animation-delay: 1.2s; }
                .animation-delay-1500 { animation-delay: 1.5s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-3000 { animation-delay: 3s; }
            `}</style>
        </main>
    )
}

export default Auth