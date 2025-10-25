import React, { useState } from "react";
import { UpdateArticle } from "./UpdateArticle";
import { DeleteArticle } from "./DeleteArticle";

export function DisplayArticles({ subjects }) {
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [deleteModalOn, setDeleteModalOn] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [subjectId, setsubjectId] = useState()
  if (!subjects || subjects.length === 0) {
    return (
      <div className="bg-white shadow-md rounded-2xl p-2 lg:p-6 mt-6">
        <p className="text-gray-600">No subjects or articles found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 mt-6">
      <h2 className="text-2xl font-semibold mb-6">Articles</h2>

      {subjects.map((subject) => (
        <div key={subject.id} className="mb-8">
          <h3 className="text-xl font-bold text-blue-700 mb-3 border-b pb-1">
            {subject.name}
          </h3>

          {subject.Articles && subject.Articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {subject.Articles.map((article) => (
                <div
                  key={article.id}
                  className="border border-gray-200 rounded-xl p-4 bg-gray-50 hover:shadow-md transition"
                >
                  <h4 className="text-lg font-semibold mb-1 text-gray-800">
                    {article.title}
                  </h4>
                  <p className="text-sm text-gray-500 mb-2">
                    Slug: <span className="font-mono">{article.slug}</span>
                  </p>

                  {/* Article Content */}
                  <div
                    className="prose max-w-none text-gray-700 leading-relaxed mb-4"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  ></div>

                  {/* Buttons */}
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={() => {
                        setSelectedArticle(article);
                        setUpdateModalOn(true);
                        setsubjectId(subject.id)
                      }}
                      className="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedArticle(article);
                        setDeleteModalOn(true);
                      }}
                      className="px-4 py-2 text-sm font-semibold rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 ml-2">
              No articles available for this subject.
            </p>
          )}
        </div>
      ))}

      {/* Update Modal */}
      {updateModalOn && selectedArticle && (
        <UpdateArticle
          article={selectedArticle}
          subjects={subjects}
          setUpdateModalOn={setUpdateModalOn}
          subject={subjectId}
        />
      )}

      {/* Delete Modal */}
      {deleteModalOn && selectedArticle && (
        <DeleteArticle
          articleId={selectedArticle.id}
          setDeleteModalOn={setDeleteModalOn}
        />
      )}
    </div>
  );
}
