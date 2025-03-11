interface TitleProps {
    children: React.ReactNode;
    align?: "left" | "center" | "right";
  }
  
  export default function Title({ children, align = "center" }: TitleProps) {
    const alignmentClass = {
      left: "justify-start",
      center: "justify-center",
      right: "justify-end",
    }[align];
  
    return (
      <div className={`flex ${alignmentClass} mt-8`}>
        <div className="w-80 p-2 bg-green-800">
          <h1 className="text-3xl font-bold text-white text-center">{children}</h1>
        </div>
      </div>
    );
  }
  