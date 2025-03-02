import React, { useState, useEffect } from "react";

const tasksUrdu = [
  "کیا آج میں نے تہجد ادا کی؟",
  "کیا آج میں نے قرآن پاک کی تلاوت کی؟",
  "کیا آج میں نے پانچوں وقت کی نماز ادا کی؟",
  "کیا آج میں نے نفل نماز ادا کی؟",
  "کیا آج میں نے کسی کی مدد کی؟",
  "کیا آج میں نے قرآن مجید پر غور و تدبر کیا؟",
  "کیا آج میں نے غیبت سے خود کو بچایا؟",
  "کیا آج میں نے کسی نیک عمل کا ارادہ کیا؟",
  "کیا آج میں نے اللہ سبحانہ وتعالیٰ سے مغفرت طلب کی؟",
  "کیا آج میں نے اپنے گھر والوں کے لیے کوئی فائدہ بخش کام کیا؟",
  "کیا آج میں نے روزہ رکھا؟",
  "کیا آج میں نے گناہوں سے بچنے کی کوشش کی؟",
  "کیا آج میں نے کوئی تسبیح پڑھی؟ (یا آج کے دن کے اذکار پڑھے)",
  "کیا آج میں نے صدقہ دیا؟",
  "کیا آج میں نے موت کو یاد کیا؟",
  "کیا آج میں نے اپنی آخرت کے لیے غور و فکر کیا؟",
  "کیا آج میں نے اپنی نظریں نیچی رکھیں؟",
  "کیا آج میں نے سب کے ساتھ خوش اخلاقی سے بات کی؟",
  "کیا آج میں نے کسی کی مدد کی؟",
  "کیا آج میری وجہ سے کسی کے چہرے پر مسکراہٹ آئی؟",
];

const ChecklistUrdu = () => {
  const initialChecklist =
    JSON.parse(localStorage.getItem("checklist")) ||
    Array(tasks.length)
      .fill()
      .map(() => Array(30).fill(null));

  const [checklist, setChecklist] = useState(initialChecklist);
  const [pendingUpdate, setPendingUpdate] = useState({
    taskIndex: null,
    dayIndex: null,
  });

  useEffect(() => {
    localStorage.setItem("checklist", JSON.stringify(checklist));
  }, [checklist]);

  const handleSelection = (taskIndex, dayIndex, value) => {
    const newChecklist = [...checklist];
    newChecklist[taskIndex][dayIndex] = value;
    setChecklist(newChecklist);
    setPendingUpdate({ taskIndex: null, dayIndex: null });
  };

  const confirmSelection = (taskIndex, dayIndex) => {
    setPendingUpdate({ taskIndex, dayIndex });
  };

  return (
    <div className="p-4">
      <div
        id="checklist-table"
        className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {tasks.map((task, taskIndex) => (
          <div
            key={taskIndex}
            className="border rounded-lg p-4 bg-green-100 flex flex-col justify-between min-h-[300px]"
          >
            <h2 className="font-bold text-lg mb-2 text-right">{task}</h2>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 30 }, (_, dayIndex) => (
                <div key={dayIndex} className="relative">
                  <div
                    className={`h-10 w-10 flex items-center justify-center rounded-full cursor-pointer ${
                      checklist[taskIndex][dayIndex] === "yes"
                        ? "bg-green-500 text-white font-medium"
                        : checklist[taskIndex][dayIndex] === "no"
                        ? "bg-red-500 text-white font-medium"
                        : "bg-gray-200"
                    }`}
                    onClick={() => confirmSelection(taskIndex, dayIndex)}
                  >
                    {dayIndex + 1}
                  </div>

                  {pendingUpdate.taskIndex === taskIndex &&
                    pendingUpdate.dayIndex === dayIndex && (
                      <div className="absolute z-10 bg-white border rounded-lg shadow-md mt-2 left-0 right-0">
                        <button
                          onClick={() =>
                            handleSelection(taskIndex, dayIndex, "yes")
                          }
                          className="block px-4 py-2 text-green-600 hover:bg-green-200 w-full text-center"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() =>
                            handleSelection(taskIndex, dayIndex, "no")
                          }
                          className="block px-4 py-2 text-red-600 hover:bg-red-200 w-full text-center"
                        >
                          No
                        </button>
                      </div>
                    )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChecklistUrdu;
