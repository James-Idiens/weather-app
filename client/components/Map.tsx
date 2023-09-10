import { useState, useEffect } from 'react'
import esriConfig from '@arcgis/core/config'
import { MapType, ViewType } from '../../Models/esri-types'
import Point from '@arcgis/core/geometry/Point'

const esriApiKey = process.env.REACT_APP_ARCGIS_API_KEY

export default function MapDisplay({ location }: any) {
  const [map, setMap] = useState<MapType | null>(null)
  const [view, setView] = useState<ViewType | null>(null)

  useEffect(() => {
    const initializeMap = async () => {
      if (!map && !view && location) {
        try {
          esriConfig.apiKey = esriApiKey as string
          const mapModule = await import('@arcgis/core/Map')

          const Map = mapModule.default

          const viewModule = await import('@arcgis/core/views/MapView')
          const MapView = viewModule.default

          const newMap: MapType = new Map({
            basemap: 'arcgis-topographic',
          })

          const newView: ViewType = new MapView({
            map: newMap,
            container: 'viewDiv',
            center: [1, 1],
            zoom: 10,
          })

          setMap(newMap)
          setView(newView)
        } catch (error) {
          console.error('Error initializing map:', error)
        }
      }
    }

    initializeMap()
  }, [map, view, location])

  useEffect(() => {
    if (view && location) {
      const { lon: longitude, lat: latitude } = location // Destructure location
      const centerPoint = new Point({
        x: longitude,
        y: latitude,
      })
      view.center = centerPoint
    }
  }, [location, view])

  return <div id="viewDiv" style={{ width: '100%', height: '250px' }}></div>
}
