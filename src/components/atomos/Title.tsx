
// interface TitleProps {
//     text: string;
//     clase?: string
// }

// const Title: React.FC<TitleProps> = ({ text, clase }) => {
//     return (
//         <div className={`text-2xl font-bold font-sans leading-tight ${clase}`}>{text}</div>
//     );
// }

// export default Title;
import React from "react";

interface TitleProps {
    text: string;
    clase?: string;
    size?: "small" | "medium" | "large";
    align?: "left" | "center" | "right";
}

const Title: React.FC<TitleProps> = ({ text, clase, size = "medium", align = "center" }) => {
    const sizeClasses = {
        small: "text-lg",
        medium: "text-2xl",
        large: "text-4xl",
    };

    return (
        <div
            className={`
        ${sizeClasses[size]} 
        font-bold 
        font-sans 
        leading-tight 
        ${clase} 
        text-${align} 
        relative 
        text-transparent 
        bg-clip-text 
        bg-gradient-to-r 
        from-teal-400 
        to-blue-600
        hover:from-blue-600 
        hover:to-teal-400
        my-2
      `}
        >
            {text}
            <span
                className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-teal-400 to-blue-600 scale-x-0 group-hover:scale-x-100 transform transition-transform duration-300 origin-left"
                aria-hidden="true"
            ></span>
        </div>
    );
};

export default Title;
