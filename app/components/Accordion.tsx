import type { ReactNode } from "react";
import React, { createContext, useContext, useState } from "react";
import { cn } from "~/lib/utils";

interface AccordionContextType {
    activeItems: string[];
    toggleItem: (id: string) => void;
    isItemActive: (id: string) => boolean;
}

const AccordionContext = createContext<AccordionContextType | undefined>(
    undefined
);

const useAccordion = () => {
    const context = useContext(AccordionContext);
    if (!context) {
        throw new Error("Accordion components must be used within an Accordion");
    }
    return context;
};

interface AccordionProps {
    children: ReactNode;
    defaultOpen?: string;
    allowMultiple?: boolean;
    className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
    children,
    defaultOpen,
    allowMultiple = false,
    className = "",
}) => {
    const [activeItems, setActiveItems] = useState<string[]>(
        defaultOpen ? [defaultOpen] : []
    );

    const toggleItem = (id: string) => {
        setActiveItems((prev) => {
            if (allowMultiple) {
                return prev.includes(id)
                    ? prev.filter((item) => item !== id)
                    : [...prev, id];
            } else {
                return prev.includes(id) ? [] : [id];
            }
        });
    };

    const isItemActive = (id: string) => activeItems.includes(id);

    return (
        <AccordionContext.Provider
            value={{ activeItems, toggleItem, isItemActive }}
        >
            <div className={`space-y-3 ${className}`}>{children}</div>
        </AccordionContext.Provider>
    );
};

interface AccordionItemProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
    id,
    children,
    className = "",
}) => {
    const { isItemActive } = useAccordion();
    const isActive = isItemActive(id);

    return (
        <div className={cn(
            "group relative overflow-hidden transition-all duration-500 transform-gpu",
            "backdrop-blur-xl bg-black/30 border border-white/10 rounded-2xl",
            "shadow-xl hover:shadow-2xl",
            isActive 
                ? "shadow-emerald-500/20 border-emerald-400/30 bg-black/40" 
                : "hover:shadow-cyan-500/10 hover:border-white/20",
            className
        )}>
            {/* Animated glow effect */}
            <div className={cn(
                "absolute -inset-0.5 rounded-2xl opacity-0 blur-sm transition-all duration-500",
                isActive 
                    ? "bg-gradient-to-r from-emerald-400/30 via-cyan-400/30 to-violet-400/30 opacity-80 animate-gradient-rotate"
                    : "bg-gradient-to-r from-cyan-400/20 via-violet-400/20 to-fuchsia-400/20 group-hover:opacity-60"
            )} />
            
            {/* Inner content container */}
            <div className="relative bg-gray-900/40 border border-white/5 rounded-2xl overflow-hidden">
                {/* Animated background particles */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-4 right-8 w-2 h-2 bg-emerald-400 rounded-full animate-pulse-glow" />
                    <div className="absolute bottom-6 left-12 w-1 h-1 bg-cyan-400 rounded-full animate-pulse-glow animation-delay-1000" />
                    <div className="absolute top-1/2 right-16 w-1.5 h-1.5 bg-violet-400 rounded-full animate-pulse-glow animation-delay-2000" />
                </div>
                
                {children}
            </div>
        </div>
    );
};

interface AccordionHeaderProps {
    itemId: string;
    children: ReactNode;
    className?: string;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
}

export const AccordionHeader: React.FC<AccordionHeaderProps> = ({
    itemId,
    children,
    className = "",
    icon,
    iconPosition = "right",
}) => {
    const { toggleItem, isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    const defaultIcon = (
        <div className="relative">
            {/* Icon glow effect */}
            <div className={cn(
                "absolute inset-0 rounded-full blur-md transition-all duration-300",
                isActive 
                    ? "bg-emerald-400/50 animate-pulse-glow" 
                    : "bg-cyan-400/30 group-hover:bg-cyan-400/50"
            )} />
            
            <svg
                className={cn(
                    "relative w-5 h-5 transition-all duration-300 transform-gpu",
                    isActive 
                        ? "rotate-180 text-emerald-400 drop-shadow-lg" 
                        : "text-gray-400 group-hover:text-cyan-400 group-hover:scale-110"
                )}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M19 9l-7 7-7-7"
                />
            </svg>
        </div>
    );

    const handleClick = () => {
        toggleItem(itemId);
    };

    return (
        <button
            onClick={handleClick}
            className={cn(
                "group w-full px-6 py-4 text-left relative overflow-hidden",
                "focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2 focus:ring-offset-gray-900",
                "transition-all duration-300 ease-out transform-gpu",
                "flex items-center justify-between cursor-pointer",
                "hover:bg-white/5 active:scale-[0.995]",
                isActive && "bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-transparent",
                className
            )}
        >
            {/* Interactive ripple effect */}
            <div className="absolute inset-0 opacity-0 group-active:opacity-20 transition-opacity duration-150">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-cyan-400 to-violet-400 animate-ripple" />
            </div>
            
            {/* Hover gradient overlay */}
            <div className={cn(
                "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300",
                "bg-gradient-to-r from-cyan-400/20 via-violet-400/20 to-emerald-400/20"
            )} />

            <div className="relative flex items-center justify-between w-full">
                <div className="flex items-center space-x-4">
                    {iconPosition === "left" && (icon || defaultIcon)}
                    <div className={cn(
                        "flex-1 transition-all duration-300",
                        isActive 
                            ? "text-white transform translate-x-1" 
                            : "text-gray-300 group-hover:text-white group-hover:transform group-hover:translate-x-0.5"
                    )}>
                        {children}
                    </div>
                </div>
                {iconPosition === "right" && (icon || defaultIcon)}
            </div>
        </button>
    );
};

interface AccordionContentProps {
    itemId: string;
    children: ReactNode;
    className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({
    itemId,
    children,
    className = "",
}) => {
    const { isItemActive } = useAccordion();
    const isActive = isItemActive(itemId);

    return (
        <div
            className={cn(
                "overflow-hidden transition-all duration-500 ease-in-out transform-gpu",
                isActive 
                    ? "max-h-[2000px] opacity-100 translate-y-0" 
                    : "max-h-0 opacity-0 -translate-y-2",
                className
            )}
        >
            <div className={cn(
                "px-6 py-4 relative",
                "border-t border-white/5",
                "bg-gradient-to-b from-white/[0.02] to-transparent"
            )}>
                {/* Content reveal animation */}
                <div className={cn(
                    "transition-all duration-700 transform-gpu",
                    isActive 
                        ? "opacity-100 translate-y-0 scale-100" 
                        : "opacity-0 translate-y-4 scale-95"
                )}>
                    {/* Decorative elements */}
                    <div className="absolute left-6 top-0 w-8 h-px bg-gradient-to-r from-emerald-400/50 via-cyan-400/50 to-transparent" />
                    
                    {/* Content with enhanced styling */}
                    <div className="text-gray-300 leading-relaxed">
                        {children}
                    </div>
                </div>
                
                {/* Bottom accent line */}
                <div className={cn(
                    "absolute bottom-0 left-6 right-6 h-px transition-all duration-500",
                    isActive 
                        ? "bg-gradient-to-r from-emerald-400/30 via-cyan-400/30 to-violet-400/30 opacity-100" 
                        : "opacity-0"
                )} />
            </div>
        </div>
    );
};

// Enhanced styles to be included in your global CSS or as a separate stylesheet
export const accordionStyles = `
@keyframes gradient-rotate {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.05); }
    100% { transform: rotate(360deg) scale(1); }
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

@keyframes ripple {
    0% { transform: scale(0) rotate(0deg); opacity: 1; }
    100% { transform: scale(4) rotate(180deg); opacity: 0; }
}

.animate-gradient-rotate {
    animation: gradient-rotate 8s linear infinite;
}

.animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
}

.animate-ripple {
    animation: ripple 0.6s ease-out;
}

.animation-delay-1000 { animation-delay: 1s; }
.animation-delay-2000 { animation-delay: 2s; }
`;