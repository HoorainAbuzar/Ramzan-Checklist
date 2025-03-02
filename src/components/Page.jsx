import React, { useEffect, useState } from "react";

const FinancialProcess3D = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const steps = [
    { title: "STEP 1", description: "Finding about yourself" },
    { title: "STEP 2", description: "Identifying your financial concerns" },
    { title: "STEP 3", description: "Goal setting" },
    { title: "STEP 4", description: "Preparing a plan" },
    { title: "STEP 5", description: "Implementing decisions" },
    { title: "STEP 6", description: "Reviewing your progress" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => (prevStep + 1) % steps.length);
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [steps.length]);

  // Function to control rotation and keeping side cards straight
  const getRotation = (index) => {
    const position = (index - currentStep + steps.length) % steps.length;
    if (position === 1 || position === steps.length - 1) {
      // Side cards should be straight
      return `rotateY(0deg) translateZ(300px)`;
    }
    // For other cards, keep the original rotation logic
    8306017423
    return `rotateY(${index * 60}deg) translateZ(300px)`;
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-b from-green-100 to-green-500">
      <div className="relative perspective-1000 w-full max-w-4xl h-80">
        <div
          className="absolute inset-0 flex justify-center items-center"
          style={{
            transformStyle: "preserve-3d",
            transform: `translateZ(-200px) rotateY(${currentStep * -60}deg)`, // Move the whole carousel slightly back
            transition: "transform 1s ease",
          }}
        >
          {steps.map((step, index) => {
            const isFront = index === currentStep;
            const isSide = (index - currentStep + steps.length) % steps.length === 1 || (index - currentStep + steps.length) % steps.length === steps.length - 1;

            // Opacity and scale based on position
            const opacity = isFront ? 1 : isSide ? 0.4 : 0.6; // Reduce opacity for side divs
            const scale = isFront ? 1 : isSide ? 0.75 : 0.8; // Shrink side divs slightly
            const zIndex = isFront ? 10 : 5; // Bring front div forward

            return (
              <div
                key={index}
                className="absolute flex justify-center items-center text-center w-56 h-56 p-4 bg-green-700 text-white rounded-2xl"
                style={{
                  transform: getRotation(index) + ` scale(${scale})`,
                  opacity: opacity,
                  transition: "transform 1s ease, opacity 1s ease",
                  zIndex: zIndex,
                }}
              >
                <div>
                  <h2 className="text-xl font-bold">{step.title}</h2>
                  <p>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FinancialProcess3D;