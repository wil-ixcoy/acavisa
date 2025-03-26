import { Children } from "react";

export default function Timeline({ children }: { children: React.ReactNode }) {
  const childrenArray = Children.toArray(children);

  return (
    <div className="relative flex flex-col items-center w-full md:w-3/4 mx-auto px-4">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-300 h-full hidden md:block"></div>

      {childrenArray.map((child, index) => (
        <div key={index} className="relative flex items-center w-full py-4">
          <div className="w-full flex items-center">
            <div className="relative w-full text-center md:text-left">
              {child}

              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-6 md:h-6 rounded-full bg-gray-300 hidden md:block border-2 border-white top-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
