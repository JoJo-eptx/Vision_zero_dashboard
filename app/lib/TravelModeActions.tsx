import { fetchApiData } from "./fetchApiData";
import { processTravelModeData } from "./ProcessTravelModeData";

const SERIOUS_ENDPOINT = "https://gis.elpasotexas.gov/arcgis/rest/services/CID/VZ_Statistics/FeatureServer/21";
const FATAL_ENDPOINT = "https://gis.elpasotexas.gov/arcgis/rest/services/CID/VZ_Statistics/FeatureServer/20";

export async function onTravelModeSeriousClick(setTravelModeData: Function) {
  const features = await fetchApiData(SERIOUS_ENDPOINT);
  const processed = processTravelModeData(features);
  setTravelModeData({
    years: processed.categories,
    groups: {},
    series: processed.series,
  });
}

export async function onTravelModeFatalClick(setTravelModeData: Function) {
  const features = await fetchApiData(FATAL_ENDPOINT);
  const processed = processTravelModeData(features);
  setTravelModeData({
    years: processed.categories,
    groups: {},
    series: processed.series,
  });
}

export async function onTravelModeAllClick(setTravelModeData: Function) {
  const serious = await fetchApiData(SERIOUS_ENDPOINT);
  const fatal = await fetchApiData(FATAL_ENDPOINT);

  const years = ["2020", "2021", "2022", "2023", "2024", "2025"];

  const combined = serious.map((s: any, i: number) => {
    const f = fatal[i] ?? { attributes: {} };
    return {
      attributes: {
        C_Group: s.attributes.C_Group,
        ...Object.fromEntries(
          years.map(y => [
            `C_${y}`,
            (s.attributes[`C_${y}`] ?? 0) + (f.attributes[`C_${y}`] ?? 0)
          ])
        ),
      },
    };
  });

  const { categories, series } = processTravelModeData(combined);
  setTravelModeData({ years: categories, groups: {}, series });
}
