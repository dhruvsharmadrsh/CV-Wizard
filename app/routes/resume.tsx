import {Link, useNavigate, useParams} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import Summary from "~/components/Summary";
import ATS from "~/components/ATS";
import Details from "~/components/Details";

export const meta = () => ([
    { title: 'CV Wizard' },
    { name: 'description', content: 'Detailed overview of your resume' },
])

const Resume = () => {
    const { auth, isLoading, fs, kv } = usePuterStore();
    const { id } = useParams();
    const [imageUrl, setImageUrl] = useState('');
    const [resumeUrl, setResumeUrl] = useState('');
    const [feedback, setFeedback] = useState<Feedback | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoading && !auth.isAuthenticated) navigate(`/auth?next=/resume/${id}`);
    }, [isLoading])

    useEffect(() => {
        const loadResume = async () => {
            const resume = await kv.get(`resume:${id}`);

            if(!resume) return;

            const data = JSON.parse(resume);

            const resumeBlob = await fs.read(data.resumePath);
            if(!resumeBlob) return;

            const pdfBlob = new Blob([resumeBlob], { type: 'application/pdf' });
            const resumeUrl = URL.createObjectURL(pdfBlob);
            setResumeUrl(resumeUrl);

            const imageBlob = await fs.read(data.imagePath);
            if(!imageBlob) return;
            const imageUrl = URL.createObjectURL(imageBlob);
            setImageUrl(imageUrl);

            setFeedback(data.feedback);
            console.log({resumeUrl, imageUrl, feedback: data.feedback });
        }

        loadResume();
    }, [id]);

    return (
        <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
            {/* Consistent animated background effects */}
            <div className="absolute inset-0">
                {/* Primary aurora orb */}
                <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 rounded-full mix-blend-screen filter blur-3xl opacity-15 animate-float"></div>
                
                {/* Secondary aurora orb */}
                <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 rounded-full mix-blend-screen filter blur-3xl opacity-12 animate-float-reverse"></div>
                
                {/* Tertiary aurora orb */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-400 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-slow"></div>
                
                {/* Additional floating elements */}
                <div className="absolute top-20 right-1/4 w-[300px] h-[300px] bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full mix-blend-screen filter blur-2xl opacity-20 animate-drift"></div>
                
                {/* Animated geometric shapes */}
                <div className="absolute top-32 left-20 w-4 h-4 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-40 animate-bounce-slow"></div>
                <div className="absolute top-1/3 right-32 w-3 h-3 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-full opacity-30 animate-ping-slow"></div>
                <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-35 animate-pulse animation-delay-2000"></div>
                <div className="absolute bottom-20 right-1/3 w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-25 animate-bounce animation-delay-3000"></div>
                
                {/* Flowing particles */}
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-1/4 left-10 w-1 h-20 bg-gradient-to-b from-emerald-400 to-transparent animate-flow-up"></div>
                    <div className="absolute top-1/2 right-16 w-1 h-16 bg-gradient-to-b from-violet-400 to-transparent animate-flow-up animation-delay-1000"></div>
                    <div className="absolute bottom-1/3 left-1/3 w-1 h-24 bg-gradient-to-b from-orange-400 to-transparent animate-flow-up animation-delay-2000"></div>
                </div>
            </div>

            {/* Enhanced navigation */}
            <nav className="relative z-20 backdrop-blur-xl bg-black/20 border-b border-white/10 animate-fade-in">
                <div className="px-6 py-4">
                    <Link 
                        to="/" 
                        className="group inline-flex items-center gap-3 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 rounded-xl border border-white/10 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/20"
                    >
                        <div className="p-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full">
                            <svg className="w-3 h-3 text-white transition-transform duration-300 group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </div>
                        <span className="text-gray-200 font-semibold group-hover:text-white transition-colors duration-300">Back to Homepage</span>
                    </Link>
                </div>
            </nav>

            {/* Main content with backdrop blur */}
            <div className="relative z-10 flex flex-row w-full max-lg:flex-col-reverse backdrop-blur-sm">
                {/* Enhanced resume preview section */}
                <section className="w-1/2 max-lg:w-full h-screen sticky top-0 flex items-center justify-center p-6 animate-slide-in-left">
                    {imageUrl && resumeUrl && (
                        <div className="relative group w-full max-w-md">
                            {/* Glow effect around resume */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/30 via-cyan-400/30 to-violet-400/30 rounded-3xl opacity-80 blur-lg animate-gradient-rotate group-hover:opacity-100 transition-all duration-700"></div>
                            
                            <div className="relative backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-4 shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 hover:scale-[1.02] transform-gpu">
                                <div className="bg-gray-900/40 rounded-2xl border border-white/5 overflow-hidden">
                                    <a 
                                        href={resumeUrl} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="block group/link relative overflow-hidden"
                                    >
                                        <img
                                            src={imageUrl}
                                            className="w-full h-full object-contain rounded-2xl transition-transform duration-500 group-hover/link:scale-105"
                                            title="resume"
                                            alt="Resume preview"
                                        />
                                        
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-center pb-6">
                                            <div className="flex items-center gap-2 text-white font-semibold">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                <span>Open PDF</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Enhanced feedback section */}
                <section className="w-1/2 max-lg:w-full min-h-screen p-6 animate-slide-in-right">
                    <div className="max-w-4xl mx-auto">
                        {/* Enhanced heading */}
                        <div className="mb-12 text-center animate-fade-in">
                            <div className="relative inline-block">
                                <h2 className="text-5xl font-black bg-gradient-to-r from-emerald-400 via-cyan-300 via-violet-300 to-fuchsia-400 bg-clip-text text-transparent animate-gradient-flow bg-[length:300%_100%] mb-4">
                                    Resume Review
                                </h2>
                                {/* Animated underline */}
                                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full animate-expand-contract"></div>
                            </div>
                            
                            {/* Status indicators */}
                            <div className="flex justify-center items-center gap-6 mt-8 animate-fade-in animation-delay-500">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow"></div>
                                    <span className="text-sm text-emerald-300 font-medium">AI Analysis</span>
                                </div>
                                <div className="w-px h-4 bg-gray-600"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow animation-delay-500"></div>
                                    <span className="text-sm text-cyan-300 font-medium">ATS Optimized</span>
                                </div>
                                <div className="w-px h-4 bg-gray-600"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse-glow animation-delay-1000"></div>
                                    <span className="text-sm text-violet-300 font-medium">Detailed Feedback</span>
                                </div>
                            </div>
                        </div>

                        {feedback ? (
                            <div className="flex flex-col gap-8 animate-fade-in animation-delay-800">
                                {/* Enhanced component containers */}
                                <div className="relative group animate-slide-up animation-delay-1000">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-violet-400/20 rounded-2xl opacity-60 blur-sm group-hover:opacity-100 transition-all duration-500"></div>
                                    <div className="relative backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500">
                                        <div className="bg-gray-900/40 border border-white/5 rounded-2xl">
                                            <Summary feedback={feedback} />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group animate-slide-up animation-delay-1200">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 via-violet-400/20 to-fuchsia-400/20 rounded-2xl opacity-60 blur-sm group-hover:opacity-100 transition-all duration-500"></div>
                                    <div className="relative backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-cyan-500/10 transition-all duration-500">
                                        <div className="bg-gray-900/40 border border-white/5 rounded-2xl">
                                            <ATS score={feedback.ATS.score || 0} suggestions={feedback.ATS.tips || []} />
                                        </div>
                                    </div>
                                </div>

                                <div className="relative group animate-slide-up animation-delay-1400">
                                    <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-400/20 via-fuchsia-400/20 to-orange-400/20 rounded-2xl opacity-60 blur-sm group-hover:opacity-100 transition-all duration-500"></div>
                                    <div className="relative backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-violet-500/10 transition-all duration-500">
                                        <div className="bg-gray-900/40 border border-white/5 rounded-2xl">
                                            <Details feedback={feedback} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex justify-center items-center py-16 animate-fade-in animation-delay-1000">
                                <div className="relative">
                                    {/* Enhanced loading container */}
                                    <div className="relative backdrop-blur-xl bg-black/20 border border-white/10 rounded-3xl p-12 shadow-2xl">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-3xl opacity-60 blur-lg animate-gradient-rotate"></div>
                                        <div className="relative bg-gray-900/50 rounded-3xl p-8 border border-white/5">
                                            <img src="/images/resume-scan-2.gif" className="w-full max-w-md mx-auto rounded-2xl shadow-lg" />
                                            <div className="mt-6 text-center">
                                                <p className="text-xl font-semibold text-gray-300 mb-2">Analyzing your resume...</p>
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
                    </div>
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
                
                @keyframes slide-in-left {
                    0% { opacity: 0; transform: translateX(-50px); }
                    100% { opacity: 1; transform: translateX(0); }
                }
                
                @keyframes slide-in-right {
                    0% { opacity: 0; transform: translateX(50px); }
                    100% { opacity: 1; transform: translateX(0); }
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
                    0%, 100% { opacity: 0.10; }
                    50% { opacity: 0.20; }
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
                
                .animate-slide-in-left {
                    animation: slide-in-left 1s ease-out both;
                }
                
                .animate-slide-in-right {
                    animation: slide-in-right 1s ease-out both;
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
                .animation-delay-1200 { animation-delay: 1.2s; }
                .animation-delay-1400 { animation-delay: 1.4s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-3000 { animation-delay: 3s; }
            `}</style>
        </main>
    )
}

export default Resume