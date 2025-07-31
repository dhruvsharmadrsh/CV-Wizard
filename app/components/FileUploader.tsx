import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const [isHovering, setIsHovering] = useState(false);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
        setIsHovering(false);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles, fileRejections} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
        onDragEnter: () => setIsHovering(true),
        onDragLeave: () => setIsHovering(false),
    })

    const file = acceptedFiles[0] || null;
    const hasError = fileRejections.length > 0;

    return (
        <div className="w-full animate-fade-in">
            <div className="relative group">
                {/* Dynamic glow effect based on state */}
                <div className={`absolute -inset-1 rounded-3xl opacity-60 blur-lg transition-all duration-500 ${
                    isDragActive || isHovering
                        ? 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 opacity-100 animate-gradient-rotate'
                        : hasError
                        ? 'bg-gradient-to-r from-red-400 via-orange-400 to-pink-400'
                        : file
                        ? 'bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400'
                        : 'bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400'
                }`}></div>
                
                <div 
                    {...getRootProps()} 
                    className={`relative backdrop-blur-xl border rounded-3xl transition-all duration-500 cursor-pointer overflow-hidden ${
                        isDragActive || isHovering
                            ? 'bg-emerald-500/20 border-emerald-400/50 scale-[1.02] shadow-2xl shadow-emerald-500/20'
                            : hasError
                            ? 'bg-red-500/20 border-red-400/30 shadow-lg shadow-red-500/20'
                            : file
                            ? 'bg-green-500/20 border-green-400/30 shadow-lg shadow-green-500/20'
                            : 'bg-black/30 border-white/10 hover:bg-black/40 hover:border-white/20 hover:scale-[1.01] shadow-xl'
                    }`}
                >
                    <input {...getInputProps()} />
                    
                    {/* Background particles effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className={`absolute top-1/4 left-1/4 w-32 h-32 rounded-full mix-blend-screen filter blur-xl opacity-20 transition-all duration-1000 ${
                            isDragActive ? 'animate-float bg-gradient-to-r from-emerald-400 to-cyan-400' : 'bg-gradient-to-r from-violet-400 to-fuchsia-400'
                        }`}></div>
                        <div className={`absolute bottom-1/4 right-1/4 w-24 h-24 rounded-full mix-blend-screen filter blur-xl opacity-15 transition-all duration-1000 ${
                            isDragActive ? 'animate-float-reverse bg-gradient-to-r from-cyan-400 to-violet-400' : 'bg-gradient-to-r from-orange-400 to-pink-400'
                        }`}></div>
                    </div>

                    <div className="relative z-10 p-8">
                        {file ? (
                            // File selected state
                            <div 
                                className="flex items-center justify-between p-6 bg-gray-900/50 rounded-2xl border border-white/10 backdrop-blur-sm animate-slide-up"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="relative group/icon">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl opacity-60 blur-sm group-hover/icon:opacity-100 transition-all duration-300"></div>
                                        <div className="relative p-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-xl animate-pulse-glow">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-lg font-bold text-white mb-1 truncate max-w-xs">
                                            {file.name}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-400">
                                                {formatSize(file.size)}
                                            </span>
                                            <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                                            <span className="text-sm text-green-400 font-medium">Ready to upload</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <button 
                                    className="group/btn p-3 bg-red-500/20 hover:bg-red-500/30 border border-red-400/30 hover:border-red-400/50 rounded-xl transition-all duration-300 hover:scale-110 animate-pulse-glow"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onFileSelect?.(null);
                                    }}
                                >
                                    <svg className="w-5 h-5 text-red-400 group-hover/btn:text-red-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        ) : (
                            // Upload state
                            <div className="text-center space-y-6 py-8">
                                {/* Animated upload icon */}
                                <div className="relative mx-auto w-24 h-24 animate-bounce-slow">
                                    <div className={`absolute -inset-2 rounded-full opacity-60 blur-lg transition-all duration-500 ${
                                        isDragActive 
                                            ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse-glow' 
                                            : 'bg-gradient-to-r from-violet-400 to-fuchsia-400'
                                    }`}></div>
                                    <div className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${
                                        isDragActive 
                                            ? 'bg-gradient-to-r from-emerald-400 to-cyan-400 animate-pulse-glow' 
                                            : 'bg-gradient-to-r from-violet-400 to-fuchsia-400'
                                    }`}>
                                        {isDragActive ? (
                                            <svg className="w-12 h-12 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                                            </svg>
                                        ) : (
                                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                            </svg>
                                        )}
                                    </div>
                                </div>

                                {/* Upload text */}
                                <div className="space-y-2">
                                    <p className={`text-xl font-bold transition-colors duration-500 ${
                                        isDragActive 
                                            ? 'text-emerald-300' 
                                            : 'text-white'
                                    }`}>
                                        {isDragActive ? (
                                            'Drop your PDF here!'
                                        ) : (
                                            <>
                                                <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent font-black">
                                                    Click to upload
                                                </span> or drag and drop
                                            </>
                                        )}
                                    </p>
                                    <p className="text-gray-400">
                                        PDF files only (max {formatSize(maxFileSize)})
                                    </p>
                                </div>

                                {/* Feature indicators */}
                                <div className="flex justify-center items-center gap-6 pt-4 animate-fade-in animation-delay-500">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow"></div>
                                        <span className="text-sm text-emerald-300 font-medium">Secure</span>
                                    </div>
                                    <div className="w-px h-4 bg-gray-600"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow animation-delay-500"></div>
                                        <span className="text-sm text-cyan-300 font-medium">Fast</span>
                                    </div>
                                    <div className="w-px h-4 bg-gray-600"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse-glow animation-delay-1000"></div>
                                        <span className="text-sm text-violet-300 font-medium">Private</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Error state */}
                        {hasError && (
                            <div className="mt-4 p-4 bg-red-500/20 border border-red-400/30 rounded-xl animate-slide-up">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-gradient-to-r from-red-400 to-orange-400 rounded-lg animate-pulse-glow">
                                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-red-300 font-semibold mb-1">Upload Error</p>
                                        <p className="text-red-400 text-sm">
                                            {fileRejections[0]?.errors[0]?.message || 'Please check your file and try again'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradient-rotate {
                    0% { transform: rotate(0deg) scale(1); }
                    50% { transform: rotate(180deg) scale(1.05); }
                    100% { transform: rotate(360deg) scale(1); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(-10px) translateX(5px); }
                    50% { transform: translateY(-20px) translateX(-3px); }
                    75% { transform: translateY(-5px) translateX(-8px); }
                }
                
                @keyframes float-reverse {
                    0%, 100% { transform: translateY(0px) translateX(0px); }
                    25% { transform: translateY(8px) translateX(-5px); }
                    50% { transform: translateY(15px) translateX(4px); }
                    75% { transform: translateY(3px) translateX(6px); }
                }
                
                @keyframes fade-in {
                    0% { opacity: 0; }
                    100% { opacity: 1; }
                }
                
                @keyframes slide-up {
                    0% { opacity: 0; transform: translateY(20px); }
                    100% { opacity: 1; transform: translateY(0); }
                }
                
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes pulse-glow {
                    0%, 100% { 
                        opacity: 0.8; 
                        box-shadow: 0 0 5px currentColor; 
                    }
                    50% { 
                        opacity: 1; 
                        box-shadow: 0 0 20px currentColor, 0 0 30px currentColor; 
                    }
                }
                
                .animate-gradient-rotate {
                    animation: gradient-rotate 3s linear infinite;
                }
                
                .animate-float {
                    animation: float 4s ease-in-out infinite;
                }
                
                .animate-float-reverse {
                    animation: float-reverse 5s ease-in-out infinite;
                }
                
                .animate-fade-in {
                    animation: fade-in 1s ease-out both;
                }
                
                .animate-slide-up {
                    animation: slide-up 0.6s ease-out both;
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 2s ease-in-out infinite;
                }
                
                .animate-pulse-glow {
                    animation: pulse-glow 2s ease-in-out infinite;
                }
                
                .animation-delay-500 { animation-delay: 0.5s; }
                .animation-delay-1000 { animation-delay: 1s; }
            `}</style>
        </div>
    )
}

export default FileUploader