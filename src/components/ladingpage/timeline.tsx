import { Children } from "react";

export default function Timeline({ children }: { children: React.ReactNode }) {
  const childrenArray = Children.toArray(children);

  return (
    <div className="relative flex flex-col items-center">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full"></div>

      {childrenArray.map((child, index) => (
        <div key={index} className="relative flex items-center w-full">
          <div className="w-full flex items-center">
            <div className="relative w-full">
              {child}

              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gray-300 border border-white top-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
