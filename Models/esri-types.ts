import Basemap from '@arcgis/core/Basemap'
import Point from '@arcgis/core/geometry/Point'

export interface MapType {
  basemap: Basemap
}

export interface ViewType {
  map: MapType
  container: HTMLElement | string
  center: Point
  zoom: number
}
