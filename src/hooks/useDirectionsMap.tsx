import React, { useState } from 'react'

export const useDirectionsMap = (
  longitude: number,
  latitude: number,
  zoom = 16,
) => {
  const mapboxglAccessToken = import.meta.env.VITE_SERVER_URL

  const [viewport, setViewport] = useState({
    /* -16.534593, -68.190434 */
    longitude,
    latitude,
    zoom,
  })

  return {
    viewport,
    setViewport,
    mapboxglAccessToken,
  }
}
