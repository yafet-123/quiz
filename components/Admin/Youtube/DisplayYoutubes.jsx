import React, { useState } from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { UpdateYoutube } from "./UpdateYoutube";
import { DeleteYoutube } from "./DeleteYoutube";

export function DisplayYoutubes({ subjects, onRefresh }) {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [subjectId, setSubjectId] = useState(null);
  const [updateModalOn, setUpdateModalOn] = useState(false);
  const [deleteModalOn, setDeleteModalOn] = useState(false);

  // Helper function to get YouTube video ID from URL
  const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="px-4 lg:px-12 py-12 bg-gradient-to-b from-red-50 to-white min-h-screen">
      <h1 className="text-center text-4xl font-bold mb-12 text-red-700 italic tracking-wide">
        YouTube Videos
      </h1>

      {subjects.map((subject) => (
        <div
          key={subject.id}
          className="mb-12 bg-white rounded-3xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all"
        >
          <h2 className="text-3xl font-bold mb-6 text-red-600 border-b pb-2">
            {subject.name}
          </h2>

          {subject.YoutubeLink?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subject.YoutubeLink.map((video) => {
                const videoId = getYoutubeVideoId(video.url);
                return (
                  <div
                    key={video.id}
                    className="bg-gray-50 rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow border border-gray-100"
                  >
                    {/* Video Thumbnail */}
                    {videoId && (
                      <div className="mb-4">
                        <a href={video.url} target="_blank" rel="noopener noreferrer">
                          <img
                            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`}
                            alt={video.title}
                            className="w-full h-40 object-cover rounded-xl"
                          />
                        </a>
                      </div>
                    )}

                    {/* Video Title */}
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {video.title}
                    </h3>

                    {/* Topics */}
                    {video.YoutubeLinkTopic?.length > 0 && (
                      <ul className="mb-3 text-sm text-gray-600">
                        {video.YoutubeLinkTopic.map((topic) => (
                          <li key={topic.id}>• {topic.title}</li>
                        ))}
                      </ul>
                    )}

                    {/* Link */}
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md shadow-sm transition mb-3 text-sm"
                    >
                      Watch Video
                    </a>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                      <button
                        onClick={() => {
                          setSelectedVideo(video);
                          setSubjectId(subject.id);
                          setUpdateModalOn(true);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-md transition"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedVideo(video);
                          setDeleteModalOn(true);
                        }}
                        className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md shadow-md transition"
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-gray-500 italic">
              No YouTube videos added for this subject yet.
            </p>
          )}
        </div>
      ))}

      {/* Update & Delete Modals */}
      {updateModalOn && selectedVideo && (
        <UpdateYoutube
          video={selectedVideo}
          setUpdateModalOn={setUpdateModalOn}
          subjects={subjects}
          subjectId={subjectId}
          onRefresh={onRefresh}
        />
      )}

      {deleteModalOn && selectedVideo && (
        <DeleteYoutube
          video={selectedVideo}
          setDeleteModalOn={setDeleteModalOn}
          onRefresh={onRefresh}
        />
      )}
    </div>
  );
}
