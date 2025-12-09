'use client'

import { useMemo } from 'react'

type YoutubeFeedProps = {
  playlistId?: string
}

const DEFAULT_PLAYLIST_ID = 'UUjv7cM7p4Qk2a8Tx5sw7b6A'

export default function YoutubeFeed({ playlistId }: YoutubeFeedProps) {
  const embedUrl = useMemo(() => {
    const id = playlistId && playlistId.trim().length > 0 ? playlistId : DEFAULT_PLAYLIST_ID
    const params = new URLSearchParams({ list: id, rel: '0', modestbranding: '1' })
    return `https://www.youtube.com/embed/videoseries?${params.toString()}`
  }, [playlistId])

  return (
    <div className="youtube-feed">
      <div className="youtube-card">
        <div className="youtube-aspect">
          <iframe
            title="NextMomentia YouTube playlist"
            src={embedUrl}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      <style jsx>{`
        .youtube-feed {
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .youtube-card {
          position: relative;
          width: 100%;
          border-radius: 20px;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: linear-gradient(135deg, rgba(11, 16, 26, 0.92), rgba(16, 26, 46, 0.86));
          box-shadow:
            0 18px 34px rgba(0, 0, 0, 0.55),
            inset 0 1px 0 rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
        }

        .youtube-aspect {
          position: relative;
          width: 100%;
          padding-top: 56.25%;
          background: radial-gradient(circle at 20% 20%, rgba(90, 140, 255, 0.2), transparent 48%),
            radial-gradient(circle at 80% 10%, rgba(45, 255, 220, 0.16), transparent 46%),
            #0b101a;
        }

        iframe {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          border: 0;
          border-radius: 20px;
        }

        @media (max-width: 640px) {
          .youtube-feed {
            padding: 0;
          }

          .youtube-card {
            border-radius: 16px;
          }

          iframe {
            border-radius: 16px;
          }
        }
      `}</style>
    </div>
  )
}
