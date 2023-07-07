import { useEffect, useState } from 'react'
import { getBingWallpaper } from '../apiClient'

export default function Wallpaper() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [copyright, setCopyright] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBingWallpaper() {
      try {
        const bingWallpaper = await getBingWallpaper()
        setImageUrl(bingWallpaper.imageUrl)
        setCopyright(bingWallpaper.copyright)
      } catch (error) {
        console.error(error)
      }
    }

    fetchBingWallpaper()
  }, [])

  return (
    <div
      className="fixed inset-0 bg-cover bg-center flex flex-col"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      {imageUrl && (
        <div className="flex-grow flex items-end justify-center">
          <div className="bg-black bg-opacity-50 text-white px-4 py-2 rounded">
            <span>{copyright}</span>
          </div>
        </div>
      )}
    </div>
  )
}
