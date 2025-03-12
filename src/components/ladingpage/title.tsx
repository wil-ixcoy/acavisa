interface TitleProps {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
    size?: "sm" | "md" | "lg";
  }
  
  export default function Title({ children, align = "center", size = "md" }: TitleProps) {
    const alignmentClass = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    }[align];
  
    const sizeClasses = {
      sm: "w-60 text-xl p-1", 
      md: "w-80 text-2xl p-2", 
      lg: "w-96 text-3xl p-3",
    }[size];
  
    return (
      <div className={`flex ${alignmentClass} mt-8`}>
        <div className={`bg-primary ${sizeClasses}`}>
          <h1 className="font-bold text-white text-center">{children}</h1>
        </div>
      </div>
    );
  }
  