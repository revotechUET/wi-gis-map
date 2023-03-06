import { parse } from 'qs';
import { memo } from "react";
import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
import { WMSTileLayer } from "react-leaflet/WMSTileLayer";

import "leaflet/dist/leaflet.css";

const GisMap = function ({
  propPrefix,
  posX,
  posY,
  layerUrl,
  layers,
  zoomLevel,
  scrollWheelZoom,
  wells,
}) {
  const getPropFromUrl = (propName, defaultVal) => {
    propName = propPrefix ? `${propPrefix}${propName}` : propName
    let url = new URL(window.location.href);
    const qs = parse(url.search.replace("?", ""));
    let val = qs[propName];
    return val || window.localStorage.getItem(propName) || defaultVal;
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
    layers: layers || getPropFromUrl("layers", ["i2gws:i2g_wells"]),
    wells: wells || getPropFromUrl("wells", undefined),
    zoomLevel: zoomLevel || getPropFromUrl("zoomLevel", 5),
    scrollWheelZoom: scrollWheelZoom || getPropFromUrl("scrollWheelZoom", "true") === "true",
  };
  const cqlFilter = mapData.wells?.length ? `key in (${mapData.wells.map(f => `'${f}'`).join(",")})` : null;
  return (
    <MapContainer
      center={[mapData.posX, mapData.posY]}
      zoom={mapData.zoomLevel}
      scrollWheelZoom={mapData.scrollWheelZoom}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapData.layers.map((layer, idx) => {
        return (
          <WMSTileLayer
            key={idx}
            url={mapData.layerUrl}
            layers={layer}
            format="image/png"
            transparent={true}
            version="1.1.0"
            cql_filter={cqlFilter}
          />
        );
      })}
    </MapContainer>
  );
}

export default memo(GisMap);
