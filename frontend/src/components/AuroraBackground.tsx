import React from 'react';

const AuroraBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* We're adding more blobs with different animation configurations to create a richer, more dynamic and less predictable background. */}

      {/* Blob 1 */}
      <div
        className="absolute left-[-15%] top-[-15%] h-[400px] w-[400px] rounded-full bg-gradient-radial from-purple-500/30 to-transparent blur-3xl opacity-40 dark:opacity-60"
        style={{
          animation: 'move1 30s ease-in-out infinite',
          animationDelay: '0s',
        }}
      ></div>

      {/* Blob 2 */}
      <div
        className="absolute right-[-20%] top-[5%] h-[450px] w-[450px] rounded-full bg-gradient-radial from-cyan-500/30 to-transparent blur-3xl opacity-30 dark:opacity-50"
        style={{
          animation: 'move2 40s ease-in-out infinite',
          animationDelay: '-5s',
        }}
      ></div>

      {/* Blob 3 */}
      <div
        className="absolute bottom-[-20%] left-[15%] h-[350px] w-[450px] rounded-full bg-gradient-radial from-pink-500/30 to-transparent blur-3xl opacity-50 dark:opacity-70"
        style={{
          animation: 'move3 35s ease-in-out infinite',
          animationDelay: '-10s',
        }}
      ></div>

      {/* Blob 4 */}
      <div
        className="absolute bottom-[0%] right-[-10%] h-[300px] w-[500px] rounded-full bg-gradient-radial from-orange-400/20 to-transparent blur-3xl opacity-30 dark:opacity-50"
        style={{
          animation: 'move1 30s ease-in-out infinite',
          animationDelay: '-15s',
          animationDirection: 'alternate-reverse',
        }}
      ></div>

      {/* Blob 5 */}
      <div
        className="absolute left-[30%] top-[30%] h-[250px] w-[250px] rounded-full bg-gradient-radial from-green-400/20 to-transparent blur-3xl opacity-20 dark:opacity-40"
        style={{
          animation: 'move2 40s ease-in-out infinite',
          animationDelay: '-20s',
        }}
      ></div>
      
      {/* Blob 6 */}
      <div
        className="absolute bottom-[35%] right-[25%] h-[300px] w-[300px] rounded-full bg-gradient-radial from-indigo-500/20 to-transparent blur-3xl opacity-30 dark:opacity-50"
        style={{
          animation: 'move3 35s ease-in-out infinite',
          animationDelay: '-25s',
          animationDirection: 'alternate-reverse',
        }}
      ></div>
    </div>
  );
};

export default AuroraBackground;