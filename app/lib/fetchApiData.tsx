// lib/api.ts
export async function fetchApiData(endpoint: string) {
  try {
    const res = await fetch(
      `${endpoint}/query?where=1=1&outFields=*&returnGeometry=false&f=json`
    );
    const json = await res.json();
    return json.features || [];
  } catch (err) {
    console.error(`Error fetching data from ${endpoint}:`, err);
    return [];
  }
}
