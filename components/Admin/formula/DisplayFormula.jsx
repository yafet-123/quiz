// components/FormulaSheetsDisplay.js
import React from "react";

export function DisplayFormula({ subjects }) {
  return (
    <div className="bg-gray-50 py-16 px-2 lg:px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {subjects.map((subject) => (
          <div key={subject.id} className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">{subject.name}</h2>
            {subject.description && (
              <p className="text-gray-600 mb-6">{subject.description}</p>
            )}

            <div className="space-y-6">
              {subject.FormulaSheet.map((sheet) => (
                <div
                  key={sheet.id}
                  className="border-l-4 border-purple-600 pl-4 py-2 rounded-lg bg-purple-50 hover:bg-purple-100 transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">
                    {sheet.title}
                  </h3>
                  <p className="flex text-gray-700 mb-2">
                    <span className="font-semibold pr-2">Formula:</span> 
                    <div
                      className="prose prose-purple max-w-none text-gray-800"
                      dangerouslySetInnerHTML={{ __html: sheet.formula }}
                    />
                  </p>
                  {sheet.Topic && (
                    <p className="text-gray-600">
                      <span className="font-semibold">Topic:</span> {sheet.Topic.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
