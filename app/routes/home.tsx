import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "CV Wizard" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
      {/* Consistent animated background effects */}
      <div className="absolute inset-0">
        {/* Primary aurora orb */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-float"></div>
        
        {/* Secondary aurora orb */}
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-float-reverse"></div>
        
        {/* Tertiary aurora orb */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 rounded-full mix-blend-screen filter blur-3xl opacity-12 animate-pulse-slow"></div>
        
        {/* Additional floating elements */}
        <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full mix-blend-screen filter blur-2xl opacity-25 animate-drift"></div>
        
        {/* Animated geometric shapes */}
        <div className="absolute top-32 left-20 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-60 animate-bounce-slow"></div>
        <div className="absolute top-1/3 right-32 w-3 h-3 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full opacity-40 animate-ping-slow"></div>
        <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-50 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-30 animate-bounce animation-delay-3000"></div>
        
        {/* Flowing particles */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-10 w-1 h-20 bg-gradient-to-b from-emerald-400 to-transparent animate-flow-up"></div>
          <div className="absolute top-1/2 right-16 w-1 h-16 bg-gradient-to-b from-violet-400 to-transparent animate-flow-up animation-delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1 h-24 bg-gradient-to-b from-orange-400 to-transparent animate-flow-up animation-delay-2000"></div>
        </div>
      </div>

      {/* Content with backdrop blur */}
      <div className="relative z-10 backdrop-blur-sm">
        <Navbar />
        
        <section className="relative px-6 lg:px-12 py-8">
          {/* Enhanced page heading */}
          <div className="text-center py-16 animate-fade-in">
            <div className="relative inline-block">
              <h1 className="text-5xl lg:text-6xl font-black bg-gradient-to-r from-emerald-400 via-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent animate-gradient-flow bg-[length:300%_100%] mb-6">
                Track Your Applications & Resume Ratings
              </h1>
              {/* Animated underline */}
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full animate-expand-contract"></div>
            </div>
            
            {!loadingResumes && resumes?.length === 0 ? (
              <h2 className="text-2xl text-gray-300 font-semibold mt-8 animate-slide-up animation-delay-500 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                No resumes found. Upload your first resume to get feedback.
              </h2>
            ) : (
              <h2 className="text-2xl text-gray-300 font-semibold mt-8 animate-slide-up animation-delay-500 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                Review your submissions and check AI-powered feedback.
              </h2>
            )}
            
            {/* Status indicators */}
            <div className="flex justify-center items-center gap-6 mt-8 animate-fade-in animation-delay-1000">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow"></div>
                <span className="text-sm text-emerald-300 font-medium">AI Powered</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow animation-delay-500"></div>
                <span className="text-sm text-cyan-300 font-medium">Real-time Analysis</span>
              </div>
              <div className="w-px h-4 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse-glow animation-delay-1000"></div>
                <span className="text-sm text-violet-300 font-medium">Smart Feedback</span>
              </div>
            </div>
          </div>

          {/* Loading state with enhanced animation */}
          {loadingResumes && (
            <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
              <div className="relative">
                {/* Enhanced loading container */}
                <div className="relative backdrop-blur-xl bg-black/20 border border-white/10 rounded-3xl p-12 shadow-2xl">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-3xl opacity-60 blur-lg animate-gradient-rotate"></div>
                  <div className="relative bg-gray-900/50 rounded-3xl p-8 border border-white/5">
                    <img src="/images/resume-scan-2.gif" className="w-[200px] mx-auto rounded-2xl shadow-lg" />
                    <div className="mt-6 text-center">
                      <p className="text-xl font-semibold text-gray-300 mb-2">Analyzing your resumes...</p>
                      <div className="flex justify-center gap-1">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce animation-delay-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Resume cards section with staggered animations */}
          {!loadingResumes && resumes.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 animate-fade-in animation-delay-500">
              {resumes.map((resume, index) => (
                <div 
                  key={resume.id} 
                  className="animate-slide-up transform-gpu hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative group">
                    {/* Card glow effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-violet-400/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500"></div>
                    <div className="relative backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
                      <ResumeCard resume={resume} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Enhanced upload section for empty state */}
          {!loadingResumes && resumes?.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-16 gap-8 animate-fade-in animation-delay-800">
              <div className="relative">
                {/* Upload illustration container */}
                <div className="relative backdrop-blur-xl bg-black/20 border border-white/10 rounded-3xl p-12 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-700 hover:scale-105 transform-gpu">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-3xl opacity-40 blur-lg animate-gradient-rotate"></div>
                  <div className="relative bg-gray-900/40 rounded-3xl p-8 border border-white/5">
                    {/* Upload icon */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full mb-6 animate-pulse-glow">
                        <svg className="w-12 h-12 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-200 mb-4">Ready to get started?</h3>
                      <p className="text-gray-400 mb-8 max-w-md">Upload your first resume and get AI-powered feedback to improve your job application success rate.</p>
                    </div>
                    
                    <Link 
                      to="/upload" 
                      className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-violet-400 rounded-2xl font-bold text-white text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden"
                    >
                      {/* Button effects */}
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
                      <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out skew-x-12"></div>
                      
                      <div className="relative flex items-center gap-3">
                        <svg className="w-6 h-6 transition-all duration-500 group-hover:translate-y-[-2px] group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        <span>Upload Resume</span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
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
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expand-contract {
          0%, 100% { width: 32px; opacity: 0.8; }
          50% { width: 64px; opacity: 1; }
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
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.25; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 1; }
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        
        .animate-gradient-flow {
          animation: gradient-flow 4s ease-in-out infinite;
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
        
        .animate-drift {
          animation: drift 10s ease-in-out infinite;
        }
        
        .animate-flow-up {
          animation: flow-up 4s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }
        
        .animate-expand-contract {
          animation: expand-contract 2s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
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
        
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-800 { animation-delay: 0.8s; }
        .animation-delay-1000 { animation-delay: 1s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
      `}</style>
    </main>
  )
}