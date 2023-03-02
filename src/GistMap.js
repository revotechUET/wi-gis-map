import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { WMSTileLayer } from "react-leaflet/WMSTileLayer";
import "leaflet/dist/leaflet.css";

function GistMap({
  posX,
  posY,
  layerUrl,
  layers,
  zoomLevel,
  scrollWheelZoom,
  layerAttrs,
}) {
  const getPropFromUrl = (propName, defaultVal) => {
    let url = new URL(window.location.href);
    let val = url.searchParams.get(propName);
    let lval = window.localStorage.getItem(propName);
    return val || lval || defaultVal;
  };

  const mapData = {
    posX: posX || getPropFromUrl("posX", 21.0278),
    posY: posY || getPropFromUrl("posY", 105.8342),
    layerUrl:
      layerUrl ||
      getPropFromUrl(
        "layerUrl",
        "http://geoserver.revotech.com.vn/geoserver/i2gws/wms"
      ),
    layers:
      layers || getPropFromUrl("layers", ["i2gws:i2g_wells", "i2gws:linetest"]),
    layerAttrs: layerAttrs || getPropFromUrl("layerAttrs", null),
    zoomLevel: zoomLevel || getPropFromUrl("zoomLevel", 5),
    scrollWheelZoom:
      scrollWheelZoom || getPropFromUrl("scrollWheelZoom", "yes"),
  };

  return (
    <MapContainer
      center={[mapData["posX"], mapData["posY"]]}
      zoom={mapData.zoomLevel}
      scrollWheelZoom={mapData.scrollWheelZoom === "yes"}
      style={{ height: "100vh" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapData["layers"].map((layer) => {
        return (
          <WMSTileLayer
            url={mapData["layerUrl"]}
            layers={layer}
            format="image/png"
            transparent={true}
            version="1.1.0"
            attribution="Vietnam"
          />
        );
      })}
    </MapContainer>
  );
}

export default GistMap;
