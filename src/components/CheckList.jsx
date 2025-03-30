import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Checklist = () => {
  const [isEnglish, setIsEnglish] = useState(true); // Default language is English

  const tasksEnglish = [
    "Have I prayed Tahajjud today?",
    "Have I recited the Holy Qur'an today?",
    "Have I offered 5 times prayer today?",
    "Have I offered my Nafl prayers today?",
    "Have I helped someone in need today?",
    "Have I reflected on the Qur'an today?",
    "Have I avoided backbiting today?",
    "Have I made any new intention for good deeds today?",
    "Have I sought forgiveness from Allah today?",
    "Have I done something beneficial for my family today?",
    "Have I fasted today?",
    "Have I avoided sins today?",
    "Have I recited today's adhkaar?",
    "Have I given charity today?",
    "Have I remembered death today?",
    "Have I reflected on the afterlife today?",
    "Have I lowered my gaze today?",
    "Have I spoken kind words today?",
    "Have I helped someone who asked for help today?",
    "Have I made someone smile today?",
  ];

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

  const tasks = isEnglish ? tasksEnglish : tasksUrdu;

  // Local storage and checklist management
  const initialChecklist =
    JSON.parse(localStorage.getItem("checklist")) ||
    tasks.map(() => Array(30).fill(null));
  const [checklist, setChecklist] = useState(initialChecklist);
  const [pendingUpdate, setPendingUpdate] = useState({
    taskIndex: null,
    dayIndex: null,
  });

  useEffect(() => {
    localStorage.setItem("checklist", JSON.stringify(checklist));
  }, [checklist]);

  // Handle task selection
  const handleSelection = (taskIndex, dayIndex, value) => {
    const newChecklist = [...checklist];
    newChecklist[taskIndex][dayIndex] = value;
    setChecklist(newChecklist);
    setPendingUpdate({ taskIndex: null, dayIndex: null });
  };

  const confirmSelection = (taskIndex, dayIndex) => {
    setPendingUpdate({ taskIndex, dayIndex });
  };

  // Download the PDF
  const downloadPDF = () => {
    const input = document.getElementById("checklist-table");

    // Temporarily force a large layout for PDF generation (4 columns)
    const originalClasses = input.className; // Save the original class
    input.className = "grid grid-cols-4 gap-4"; // Force large screen layout for PDF

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4"); // A4 size portrait
      const imgWidth = 190; // A4 page width in mm (minus margins)
      const pageHeight = 297; // A4 page height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 10, position + 10, imgWidth, imgHeight); // Add the first page
      heightLeft -= pageHeight;

      // Add more pages if the content is taller than one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight; // Update position
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position + 10, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("RamzanChecklist by Sumzar.pdf");

      // Restore the original layout after PDF generation
      input.className = originalClasses; // Restore original class
    });
  };

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish); // Toggle between English and Urdu
  };

  return (
    <div className="px-4 ">
      <h3 className="text-center mt-5">Sumiya</h3>
      {/* Heading */}
      <h1 className="text-2xl font-bold text-center mb-4 text-green-800">
        {isEnglish ? "Daily Tasks in Ramadan" : "رمضان چیک لسٹ"}
      </h1>

      {/* Buttons */}
      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEnglish ? "Download your result" : "نتائج ڈاؤن لوڈ کریں"}
        </button>
        <button
          onClick={toggleLanguage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {isEnglish ? "Change Language" : "زبان بدلیں"}
        </button>
      </div>

      {/* Checklist */}
      <div
        id="checklist-table"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {tasks.map((task, taskIndex) => (
          <div
            key={taskIndex}
            className="border rounded-lg p-4 bg-green-100 flex flex-col justify-between min-h-[300px]"
          >
            <h2
              className={`font-bold text-lg mb-2 ${
                isEnglish ? "text-left" : "text-right"
              }`}
            >
              {task}
            </h2>
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
                      <div className="absolute z-10 bg-white border rounded-lg w-[80px] shadow-md mt-2 left-0 right-0">
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
                        <button
                          onClick={() =>
                            handleSelection(taskIndex, dayIndex, null)
                          } // Clear the selection
                          className="block px-4 py-2 text-gray-600 hover:bg-gray-200 w-full text-center"
                        >
                          Remove
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

export default Checklist;
