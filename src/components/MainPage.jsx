import React, { useState } from "react";
import Checklist from "./CheckList";
import ChecklistUrdu from "./CheckListUrdu";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MainPage = () => {
  const [isEnglish, setIsEnglish] = useState(true); // Default language is English

  const downloadPDF = () => {
    const input = document.getElementById("checklist-table");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0); // Adjust dimensions as needed
      pdf.save("checklist_result.pdf");
    });
  };

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish); // Toggle between English and Urdu
  };

  return (
    <div>
      <h1 className="mt-5 text-2xl font-bold text-center mb-4 text-green-800">
        {isEnglish ? "Daily Tasks in Ramadan" : "رمضان چیک لسٹ"}
      </h1>

      <div className="flex justify-center mb-4 space-x-4">
        <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Download your result
        </button>
        <button
          onClick={toggleLanguage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {isEnglish ? "Change Language" : "زبان بدلیں"}
        </button>
      </div>

      <div>
        {/* Show English or Urdu Checklist based on isEnglish state */}
        {isEnglish ? <Checklist /> : <ChecklistUrdu />}
      </div>
    </div>
  );
};

export default MainPage;