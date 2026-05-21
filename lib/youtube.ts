/**
 * YouTube URL helper utilities.
 * Extracted from duplicated logic in PartnersSection and PreviousGuestsSection.
 */

/** Extract the 11-character video ID from any YouTube URL format. */
export function getYouTubeVideoId(url: string | undefined): string | null {
  if (!url) return null
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)
  if (match && match[2].length === 11) {
    return match[2]
  }
  return null
}

/** Get the HQ default thumbnail for a YouTube video (480×360, always available). */
export function getYouTubeThumbnail(url: string | undefined): string | null {
  const videoId = getYouTubeVideoId(url)
  if (videoId) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
  }
  return null
}
