import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
    const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [files, setFiles] = useState<FSItem[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const loadFiles = async () => {
        const files = (await fs.readDir("./")) as FSItem[];
        setFiles(files);
    };

    useEffect(() => {
        loadFiles();
    }, []);

    useEffect(() => {
        if (!isLoading && !auth.isAuthenticated) {
            navigate("/auth?next=/wipe");
        }
    }, [isLoading]);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            for (const file of files) {
                await fs.delete(file.path);
            }
            await kv.flush();
            await loadFiles();
            setShowConfirm(false);
        } catch (err) {
            console.error("Error deleting files:", err);
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) {
        return (
            <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden flex items-center justify-center">
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-3xl opacity-60 blur-lg animate-gradient-rotate"></div>
                    <div className="relative backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-8">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin"></div>
                            <span className="text-xl text-gray-300 font-semibold">Loading...</span>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden flex items-center justify-center">
                <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-red-400 via-orange-400 to-pink-400 rounded-3xl opacity-60 blur-lg animate-gradient-rotate"></div>
                    <div className="relative backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-red-400 mb-2">Error</h2>
                            <p className="text-gray-300">{error}</p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

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

            {/* Main content */}
            <div className="relative z-10 min-h-screen p-6">
                <div className="max-w-6xl mx-auto">
                    {/* Enhanced heading */}
                    <div className="mb-12 text-center animate-fade-in">
                        <div className="relative inline-block">
                            <h1 className="text-5xl font-black bg-gradient-to-r from-red-400 via-orange-300 via-pink-300 to-rose-400 bg-clip-text text-transparent animate-gradient-flow bg-[length:300%_100%] mb-4">
                                Data Management
                            </h1>
                            {/* Animated underline */}
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-red-400 via-orange-400 to-pink-400 rounded-full animate-expand-contract"></div>
                        </div>
                        
                        {/* User info */}
                        <div className="mt-8 animate-fade-in animation-delay-500">
                            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse-glow"></div>
                                <span className="text-gray-300 font-medium">Authenticated as: </span>
                                <span className="text-emerald-400 font-bold">{auth.user?.username}</span>
                            </div>
                        </div>
                    </div>

                    {/* Files section */}
                    <div className="mb-12 animate-slide-up animation-delay-800">
                        <div className="relative group">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-violet-400/20 rounded-2xl opacity-60 blur-sm group-hover:opacity-100 transition-all duration-500"></div>
                            <div className="relative backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl overflow-hidden shadow-xl">
                                <div className="bg-gray-900/40 border border-white/5 rounded-2xl p-8">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-xl">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white mb-1">Application Files</h2>
                                            <p className="text-gray-400">Manage your stored data and files</p>
                                        </div>
                                    </div>

                                    {files.length > 0 ? (
                                        <div className="space-y-3">
                                            {files.map((file, index) => (
                                                <div 
                                                    key={file.id} 
                                                    className="group/file flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-xl border border-white/5 hover:border-white/10 transition-all duration-300 animate-slide-in-left"
                                                    style={{ animationDelay: `${index * 100 + 1000}ms` }}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-2 bg-gradient-to-r from-violet-400 to-purple-400 rounded-lg group-hover/file:scale-110 transition-transform duration-300">
                                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-medium group-hover/file:text-violet-300 transition-colors duration-300">{file.name}</p>
                                                            <p className="text-gray-500 text-sm">{file.path}</p>
                                                        </div>
                                                    </div>
                                                    <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-0 group-hover/file:opacity-100 transition-opacity duration-300"></div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-12 animate-fade-in animation-delay-1200">
                                            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-500 rounded-full mx-auto mb-4 flex items-center justify-center opacity-50">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-400 text-lg">No files found</p>
                                            <p className="text-gray-500 text-sm mt-2">Your application data will appear here</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action section */}
                    <div className="text-center animate-slide-up animation-delay-1400">
                        <div className="relative group inline-block">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-red-400/30 via-orange-400/30 to-pink-400/30 rounded-2xl opacity-60 blur-sm group-hover:opacity-100 transition-all duration-500"></div>
                            <div className="relative backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl p-8">
                                <div className="bg-gray-900/40 border border-white/5 rounded-2xl p-8">
                                    <div className="mb-6">
                                        <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center animate-pulse-glow">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Wipe Application Data</h3>
                                        <p className="text-gray-400 max-w-md mx-auto">This will permanently delete all your files and clear the key-value store. This action cannot be undone.</p>
                                    </div>

                                    {!showConfirm ? (
                                        <button
                                            onClick={() => setShowConfirm(true)}
                                            disabled={files.length === 0}
                                            className="group/btn px-8 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-500 text-white font-bold rounded-xl border border-white/10 shadow-lg hover:shadow-red-500/20 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                        >
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 group-hover/btn:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                                <span>{files.length === 0 ? 'No Data to Wipe' : 'Wipe App Data'}</span>
                                            </div>
                                        </button>
                                    ) : (
                                        <div className="space-y-4 animate-slide-up">
                                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                                                <p className="text-red-300 font-semibold mb-2">⚠️ Confirmation Required</p>
                                                <p className="text-gray-300 text-sm">Are you sure you want to delete all your data? This action is irreversible.</p>
                                            </div>
                                            <div className="flex gap-4 justify-center">
                                                <button
                                                    onClick={() => setShowConfirm(false)}
                                                    className="px-6 py-3 bg-gray-600 hover:bg-gray-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleDelete}
                                                    disabled={isDeleting}
                                                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 disabled:from-gray-600 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed"
                                                >
                                                    {isDeleting ? (
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                            <span>Deleting...</span>
                                                        </div>
                                                    ) : (
                                                        'Yes, Delete Everything'
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
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
                    0% { opacity: 0; transform: translateX(-30px); }
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
                    animation: slide-in-left 0.8s ease-out both;
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
                
                .animation-delay-500 { animation-delay: 0.5s; }
                .animation-delay-800 { animation-delay: 0.8s; }
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-1200 { animation-delay: 1.2s; }
                .animation-delay-1400 { animation-delay: 1.4s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-3000 { animation-delay: 3s; }
            `}</style>
        </main>
    );
};

export default WipeApp;