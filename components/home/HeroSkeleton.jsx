import React from 'react';

export default function HeroSkeleton() {
  return (
    <div className="w-full h-[300px] sm:h-[400px] flex items-center justify-center relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50/50 to-indigo-50/50 border border-purple-100/40">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      
      {/* Skeleton Content */}
      <div className="flex flex-col items-center gap-4">
        {/* Pulsing 3D object placeholder */}
        <div className="w-40 h-40 rounded-full bg-indigo-200/40 animate-pulse flex items-center justify-center">
          <div className="w-28 h-28 rounded-full bg-indigo-300/30 animate-ping opacity-75" />
        </div>
        
        {/* Pulsing helper text */}
        <div className="h-4 w-32 rounded bg-indigo-200/50 animate-pulse mt-2" />
      </div>

      {/* Styled inline animation for shimmer */}
      <style jsx global>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
