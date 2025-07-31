import { cn } from "~/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionItem,
} from "./Accordion";

const ScoreBadge = ({ score }: { score: number }) => {
  const scoreConfig = score > 69
    ? {
        gradient: 'from-emerald-400 to-green-400',
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-400/30',
        text: 'text-emerald-300',
        glow: 'shadow-emerald-500/20'
      }
    : score > 39
      ? {
          gradient: 'from-amber-400 to-yellow-400',
          bg: 'bg-amber-500/20',
          border: 'border-amber-400/30',
          text: 'text-amber-300',
          glow: 'shadow-amber-500/20'
        }
      : {
          gradient: 'from-red-400 to-orange-400',
          bg: 'bg-red-500/20',
          border: 'border-red-400/30',
          text: 'text-red-300',
          glow: 'shadow-red-500/20'
        };

  return (
    <div className={`group relative animate-fade-in`}>
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${scoreConfig.gradient} rounded-full opacity-60 blur-sm group-hover:opacity-100 transition-all duration-300`}></div>
      <div className={`relative flex items-center gap-2 px-4 py-2 ${scoreConfig.bg} ${scoreConfig.border} border backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-105 ${scoreConfig.glow} hover:shadow-lg`}>
        <div className={`p-1 bg-gradient-to-r ${scoreConfig.gradient} rounded-full animate-pulse-glow`}>
          {score > 69 ? (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>
        <span className={`text-sm font-bold ${scoreConfig.text}`}>
          {score}/100
        </span>
      </div>
    </div>
  );
};

const CategoryHeader = ({
  title,
  categoryScore,
}: {
  title: string;
  categoryScore: number;
}) => {
  const titleIcons = {
    "Tone & Style": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
      </svg>
    ),
    "Content": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    "Structure": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    "Skills": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    )
  };

  return (
    <div className="flex items-center justify-between py-4 group animate-slide-in-left">
      <div className="flex items-center gap-4">
        <div className="p-2 bg-gradient-to-r from-violet-400 to-cyan-400 rounded-xl transition-transform duration-300 group-hover:scale-110 animate-pulse-glow">
          <div className="text-white">
            {titleIcons[title as keyof typeof titleIcons] || titleIcons["Content"]}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-white group-hover:text-violet-300 transition-colors duration-300">
          {title}
        </h3>
      </div>
      <ScoreBadge score={categoryScore} />
    </div>
  );
};

const CategoryContent = ({
  tips,
}: {
  tips: { type: "good" | "improve"; tip: string; explanation: string }[];
}) => {
  return (
    <div className="flex flex-col gap-6 w-full animate-slide-up">
      {/* Tips Overview */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400/20 via-violet-400/20 to-fuchsia-400/20 rounded-xl opacity-60 blur-sm group-hover:opacity-100 transition-all duration-500"></div>
        <div className="relative backdrop-blur-sm bg-gray-800/50 border border-white/10 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <div className="w-1 h-5 bg-gradient-to-b from-cyan-400 to-violet-400 rounded-full"></div>
            Quick Overview
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tips.map((tip, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-white/5 hover:border-white/10 transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`p-1.5 rounded-lg ${
                  tip.type === "good" 
                    ? "bg-gradient-to-r from-emerald-400 to-green-400" 
                    : "bg-gradient-to-r from-amber-400 to-orange-400"
                } animate-pulse-glow`}>
                  {tip.type === "good" ? (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm font-medium ${
                  tip.type === "good" ? "text-emerald-300" : "text-amber-300"
                }`}>
                  {tip.tip}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Detailed Explanations */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white flex items-center gap-2">
          <div className="w-1 h-5 bg-gradient-to-b from-violet-400 to-fuchsia-400 rounded-full"></div>
          Detailed Analysis
        </h4>
        {tips.map((tip, index) => (
          <div
            key={index + tip.tip}
            className={`group/tip relative animate-slide-in-left`}
            style={{ animationDelay: `${index * 150 + 300}ms` }}
          >
            <div className={`absolute -inset-0.5 rounded-xl opacity-60 blur-sm group-hover/tip:opacity-100 transition-all duration-500 ${
              tip.type === "good"
                ? "bg-gradient-to-r from-emerald-400/20 to-green-400/20"
                : "bg-gradient-to-r from-amber-400/20 to-orange-400/20"
            }`}></div>
            <div className={`relative backdrop-blur-sm border rounded-xl p-5 transition-all duration-300 hover:scale-[1.01] ${
              tip.type === "good"
                ? "bg-emerald-500/10 border-emerald-400/30 hover:shadow-emerald-500/20"
                : "bg-amber-500/10 border-amber-400/30 hover:shadow-amber-500/20"
            } hover:shadow-lg`}>
              <div className="flex items-start gap-4">
                <div className={`p-2 rounded-lg transition-transform duration-300 group-hover/tip:scale-110 ${
                  tip.type === "good"
                    ? "bg-gradient-to-r from-emerald-400 to-green-400"
                    : "bg-gradient-to-r from-amber-400 to-orange-400"
                } animate-pulse-glow`}>
                  {tip.type === "good" ? (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div className="flex-1">
                  <h5 className={`text-lg font-bold mb-2 transition-colors duration-300 ${
                    tip.type === "good" 
                      ? "text-emerald-300 group-hover/tip:text-emerald-200" 
                      : "text-amber-300 group-hover/tip:text-amber-200"
                  }`}>
                    {tip.tip}
                  </h5>
                  <p className="text-gray-300 leading-relaxed group-hover/tip:text-gray-200 transition-colors duration-300">
                    {tip.explanation}
                  </p>
                </div>
                <div className={`w-2 h-2 rounded-full opacity-0 group-hover/tip:opacity-100 transition-opacity duration-300 ${
                  tip.type === "good" ? "bg-emerald-400" : "bg-amber-400"
                }`}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Details = ({ feedback }: { feedback: Feedback }) => {
  const categories = [
    { id: "tone-style", title: "Tone & Style", data: feedback.toneAndStyle },
    { id: "content", title: "Content", data: feedback.content },
    { id: "structure", title: "Structure", data: feedback.structure },
    { id: "skills", title: "Skills", data: feedback.skills }
  ];

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="mb-4 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-r from-violet-400 to-fuchsia-400 rounded-xl animate-pulse-glow">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Detailed Feedback</h2>
            <p className="text-gray-400">Comprehensive analysis of your resume components</p>
          </div>
        </div>
      </div>

      {/* Accordion */}
      <div className="animate-slide-up animation-delay-300">
        <Accordion>
          {categories.map((category, index) => (
            <AccordionItem key={category.id} id={category.id}>
              <div 
                className="animate-slide-in-left" 
                style={{ animationDelay: `${index * 100 + 500}ms` }}
              >
                <AccordionHeader itemId={category.id}>
                  <CategoryHeader
                    title={category.title}
                    categoryScore={category.data.score}
                  />
                </AccordionHeader>
              </div>
              <AccordionContent itemId={category.id}>
                <div className="px-4 pb-6">
                  <CategoryContent tips={category.data.tips} />
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <style jsx>{`
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
        
        .animate-fade-in {
          animation: fade-in 1s ease-out both;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out both;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out both;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animation-delay-300 { animation-delay: 0.3s; }
      `}</style>
    </div>
  );
};

export default Details;