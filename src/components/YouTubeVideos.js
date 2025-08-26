import React, { useState } from 'react';

// Replace these with actual HBMTB video IDs
const HBMTB_VIDEOS = [
  {
    id: 'video1',
    title: 'HBMTB - Pins and Needles (Red Hill)',
    videoId: 's01dnrCK5P0', // Replace with actual HBMTB video ID
    date: '2025-07-20',
  },
  {
    id: 'video2',
    title: 'HBMTB - Flamingo (Mystic MTB)',
    videoId: 'uhTowFHRiDs', // Replace with actual HBMTB video ID
    date: '2025-02-23',
  },
  {
    id: 'video3',
    title: 'HBMTB - Cressy Descent (You Yangs)',
    videoId: 'kYWl1jtcmtA', // Replace with actual HBMTB video ID
    date: '2025-02-16',
  },
  // Add more videos as needed
];

const YouTubeVideos = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Set initial video when component mounts
  React.useEffect(() => {
    if (HBMTB_VIDEOS.length > 0) {
      setSelectedVideo(HBMTB_VIDEOS[0]);
    }
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  // Don't render until we have a selected video
  if (!selectedVideo) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading videos...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Video Player */}
        <div className="lg:w-2/3">
          <div className="relative pt-[56.25%] bg-black rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0`}
              title={selectedVideo.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-4">
            <h2 className="text-2xl font-bold text-hb-light">{selectedVideo.title}</h2>
            <div className="text-sm text-hb-light/70 mt-1">
              {formatDate(selectedVideo.date)}
            </div>
          </div>
        </div>

        {/* Video List */}
        <div className="lg:w-1/3">
          <h3 className="text-xl font-bold text-hb-light mb-4">More Videos</h3>
          <div className="space-y-3">
            {HBMTB_VIDEOS.map((video) => (
              <div
                key={video.id}
                className={`p-2 rounded-lg cursor-pointer ${selectedVideo?.id === video.id ? 'bg-hb-gray/50' : 'hover:bg-hb-gray/30'
                  }`}
                onClick={() => setSelectedVideo(video)}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-24 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-medium text-hb-light">{video.title}</h4>
                    <div className="text-xs text-hb-light/70">
                      {formatDate(video.date)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YouTubeVideos;
