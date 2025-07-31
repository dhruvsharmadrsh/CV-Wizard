import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";

export const meta = () => ([
    { title: 'CV Wizard' },
    { name: 'upload', content: 'Upload' },
])
const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

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
                                Smart feedback for your dream job
                            </h1>
                            {/* Animated underline */}
                            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-full animate-expand-contract"></div>
                        </div>
                        
                        {isProcessing ? (
                            <div className="mt-8 animate-slide-up animation-delay-500">
                                <h2 className="text-2xl text-gray-300 font-semibold mb-8 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                                    {statusText}
                                </h2>
                                
                                {/* Enhanced processing animation */}
                                <div className="flex justify-center mb-8">
                                    <div className="relative backdrop-blur-xl bg-black/20 border border-white/10 rounded-3xl p-8 shadow-2xl">
                                        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 rounded-3xl opacity-60 blur-lg animate-gradient-rotate"></div>
                                        <div className="relative bg-gray-900/50 rounded-3xl p-6 border border-white/5">
                                            <img src="/images/resume-scan.gif" className="w-full max-w-md mx-auto rounded-2xl shadow-lg" />
                                            <div className="mt-6 flex justify-center gap-2">
                                                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-bounce"></div>
                                                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-bounce animation-delay-200"></div>
                                                <div className="w-3 h-3 bg-violet-400 rounded-full animate-bounce animation-delay-400"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <h2 className="text-2xl text-gray-300 font-semibold mt-8 animate-slide-up animation-delay-500 bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                                Drop your resume for an ATS score and improvement tips
                            </h2>
                        )}
                        
                        {/* Status indicators */}
                        {!isProcessing && (
                            <div className="flex justify-center items-center gap-6 mt-8 animate-fade-in animation-delay-1000">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow"></div>
                                    <span className="text-sm text-emerald-300 font-medium">ATS Optimization</span>
                                </div>
                                <div className="w-px h-4 bg-gray-600"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse-glow animation-delay-500"></div>
                                    <span className="text-sm text-cyan-300 font-medium">AI Analysis</span>
                                </div>
                                <div className="w-px h-4 bg-gray-600"></div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse-glow animation-delay-1000"></div>
                                    <span className="text-sm text-violet-300 font-medium">Instant Feedback</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Enhanced form section */}
                    {!isProcessing && (
                        <div className="max-w-4xl mx-auto animate-fade-in animation-delay-800">
                            <div className="relative group">
                                {/* Form glow effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400/20 via-cyan-400/20 to-violet-400/20 rounded-3xl opacity-80 blur-lg animate-gradient-rotate group-hover:opacity-100 transition-all duration-700"></div>
                                
                                <div className="relative backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-8 shadow-2xl">
                                    <div className="bg-gray-900/40 rounded-3xl p-8 border border-white/5">
                                        <form id="upload-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                                            {/* Form fields with enhanced styling */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div className="group animate-slide-up animation-delay-1000">
                                                    <label htmlFor="company-name" className="block text-lg font-semibold text-gray-300 mb-3 group-focus-within:text-emerald-400 transition-colors duration-300">
                                                        Company Name
                                                    </label>
                                                    <div className="relative">
                                                        <input 
                                                            type="text" 
                                                            name="company-name" 
                                                            placeholder="Enter company name" 
                                                            id="company-name"
                                                            className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-black placeholder-gray-500 focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/5 to-transparent rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                    </div>
                                                </div>

                                                <div className="group animate-slide-up animation-delay-1200">
                                                    <label htmlFor="job-title" className="block text-lg font-semibold text-gray-300 mb-3 group-focus-within:text-cyan-400 transition-colors duration-300">
                                                        Job Title
                                                    </label>
                                                    <div className="relative">
                                                        <input 
                                                            type="text"
                                                             
                                                            name="job-title" 
                                                            placeholder="Enter job title" 
                                                            id="job-title"
                                                            className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-black placeholder-gray-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="group animate-slide-up animation-delay-1400">
                                                <label htmlFor="job-description" className="block text-lg font-semibold text-gray-300 mb-3 group-focus-within:text-violet-400 transition-colors duration-300">
                                                    Job Description
                                                </label>
                                                <div className="relative">
                                                    <textarea 
                                                        rows={6} 
                                                        cols={100}
                                                        name="job-description" 
                                                        placeholder="Paste the job description here..." 
                                                        id="job-description"
                                                        className="w-full px-4 py-4 bg-black/40 border border-white/10 rounded-2xl text-black placeholder-gray-500 focus:border-violet-400/50 focus:ring-2 focus:ring-violet-400/20 focus:outline-none transition-all duration-300 backdrop-blur-sm resize-none"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-violet-400/5 to-transparent rounded-2xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                                </div>
                                            </div>

                                            <div className="group animate-slide-up animation-delay-1600">
                                                <label htmlFor="uploader" className="block text-lg font-semibold text-gray-300 mb-3 group-focus-within:text-fuchsia-400 transition-colors duration-300">
                                                    Upload Resume
                                                </label>
                                                <div className="relative">
                                                    <div className="bg-black/20 border border-white/10 rounded-2xl p-1 backdrop-blur-sm">
                                                        <div className="bg-gray-900/50 rounded-2xl border border-white/5">
                                                            <FileUploader onFileSelect={handleFileSelect} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Enhanced submit button */}
                                            <div className="text-center animate-slide-up animation-delay-1800">
                                                <button 
                                                    className="group relative inline-flex items-center justify-center gap-3 px-12 py-5 bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-violet-400 rounded-2xl font-bold text-white text-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 overflow-hidden min-w-[200px]" 
                                                    type="submit"
                                                >
                                                    {/* Button effects */}
                                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 via-cyan-300 to-violet-300 opacity-0 group-hover:opacity-40 transition-all duration-500"></div>
                                                    <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out skew-x-12"></div>
                                                    
                                                    {/* Particle effects on hover */}
                                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                                        <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                                                        <div className="absolute top-4 right-6 w-0.5 h-0.5 bg-emerald-300 rounded-full animate-pulse"></div>
                                                        <div className="absolute bottom-3 left-8 w-0.5 h-0.5 bg-cyan-300 rounded-full animate-ping animation-delay-300"></div>
                                                    </div>
                                                    
                                                    <div className="relative flex items-center gap-3">
                                                        <svg className="w-6 h-6 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span>Analyze Resume</span>
                                                    </div>
                                                </button>
                                            </div>
                                        </form>
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
                .animation-delay-300 { animation-delay: 0.3s; }
                .animation-delay-400 { animation-delay: 0.4s; }
                .animation-delay-500 { animation-delay: 0.5s; }
                .animation-delay-800 { animation-delay: 0.8s; }
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-1200 { animation-delay: 1.2s; }
                .animation-delay-1400 { animation-delay: 1.4s; }
                .animation-delay-1600 { animation-delay: 1.6s; }
                .animation-delay-1800 { animation-delay: 1.8s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-3000 { animation-delay: 3s; }
            `}</style>
        </main>
    )
}

export default Upload