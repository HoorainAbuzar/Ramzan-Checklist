import React, { useState } from "react";
import Checklist from "./CheckList";
import ChecklistUrdu from "./CheckListUrdu";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const MainPage = () => {
  const [isEnglish, setIsEnglish] = useState(true); // Default language is English

  const downloadPDF = () => {
    const input = document.getElementById("checklist-table");

    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 190;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 10;

      pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("checklist_result.pdf");
    });
  };

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish); // Toggle between English and Urdu
  };

  return (
    <div>
      {/* Main Heading */}
      <h1 className="mt-5 text-2xl font-bold text-center mb-4 text-green-800">
        {isEnglish ? "Daily Tasks in Ramadan" : "رمضان چیک لسٹ"}
      </h1>

      {/* Buttons for Download and Language Toggle */}
      <div className="flex justify-center mb-4 space-x-4">
        {/* Download PDF Button */}
        <button
          onClick={downloadPDF}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {isEnglish ? "Download your result" : "نتائج ڈاؤن لوڈ کریں"}
        </button>

        {/* Toggle Language Button */}
        <button
          onClick={toggleLanguage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {isEnglish ? "Change Language" : "زبان بدلیں"}
        </button>
      </div>

      {/* Checklist Container */}
      <div
        id="checklist-table"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Show English or Urdu Checklist based on isEnglish state */}
        {isEnglish ? <Checklist /> : <ChecklistUrdu />}
      </div>
    </div>
  );
};

export default MainPage;