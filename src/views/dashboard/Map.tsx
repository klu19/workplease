// import React, { useEffect, useState } from "react";
// import USAMap from "react-usa-map";

// interface GeographicData {
//   state: string;
//   intensity: number; // 0 to 1
// }

// interface MapComponentProps {
//   geoMapData: GeographicData[]; // Accept geoMapData as a prop
// }

// const allStates = [
//   "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
//   "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
//   "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
//   "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
//   "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
// ];

// const MapComponent: React.FC<MapComponentProps> = () => {
//   const [geoMapData, setGeoMapData] = useState<GeographicData[]>([]); // To store fetched data
//   const [customizeStates, setCustomizeStates] = useState<Record<string, { fill: string }>>({});

//   useEffect(() => {
//     const fetchAndFormatData = async () => {
//       try {
//         const response = await fetch("/api/students/localecount");
//         const rawData: Record<string, number> = await response.json();
  
//         console.log("Fetched rawData:", JSON.stringify(rawData, null, 2));  // Stringify the object for easier reading
  
//         // Find max for normalization
//         const counts = Object.values(rawData);
//         const maxCount = Math.max(...counts, 1); // Avoid divide by zero
  
//         // Build final state data with 0s for missing states
//         const data: GeographicData[] = allStates.map((state) => ({
//           state,
//           intensity: rawData[state] ? rawData[state] / maxCount : 0,
//         }));
  
//         // Transform for map
//         const customized = data.reduce((acc, { state, intensity }) => {
//           acc[state] = { fill: getStateColor(intensity) };
//           return acc;
//         }, {} as Record<string, { fill: string }>);
  
//         setCustomizeStates(customized);
//       } catch (error) {
//         console.error("Failed to load locale data", error);
//       }
//     };
  
//     fetchAndFormatData();
//   }, []);  

//   const getStateColor = (intensity: number): string => {
//     const clamped = Math.min(Math.max(intensity, 0), 1);
//     return clamped === 0 ? "rgba(200, 200, 255, 0.2)" : `rgba(0, 0, 255, ${clamped})`;
//   };

//   useEffect(() => {
//     // Prepare the data for the map (mapping the state to intensity)
//     const counts = geoMapData.reduce((acc, { state, intensity }) => {
//       acc[state] = intensity;
//       return acc;
//     }, {} as Record<string, number>);

//     const maxCount = Math.max(...Object.values(counts), 1); // Avoid divide by zero

//     const data: GeographicData[] = allStates.map((state) => ({
//       state,
//       intensity: counts[state] ? counts[state] / maxCount : 0, // Normalize
//     }));

//     const customized = data.reduce((acc, { state, intensity }) => {
//       acc[state] = { fill: getStateColor(intensity) };
//       return acc;
//     }, {} as Record<string, { fill: string }>);

//     setCustomizeStates(customized);
//   }, [geoMapData]); // Re-run when geoMapData changes

//   const handleStateClick = (event: React.MouseEvent) => {
//     const stateAbbr = (event.target as SVGElement).dataset.name;
//     alert(`You clicked on ${stateAbbr}`);
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         maxWidth: "600px",
//         margin: "0 auto",
//       }}
//     >
//       <USAMap
//         customize={customizeStates}
//         onClick={handleStateClick}
//         width={600}
//         height={450}
//         style={{ width: "100%", height: "100%" }}
//       />
//     </div>
//   );
// };

// export default MapComponent;

//above is the actual version that actually makes API calls 

import React, { useEffect, useState } from "react";
import USAMap from "react-usa-map";

interface GeographicData {
  state: string;
  intensity: number; // 0 to 1
}

interface MapComponentProps {}

const MapComponent: React.FC<MapComponentProps> = () => {
  const [customizeStates, setCustomizeStates] = useState<Record<string, { fill: string }>>({});

  useEffect(() => {
    // Simulating fake data instead of fetching from the database
    const fakeCustomizeStates = {
      CA: { fill: "#02142d" },
      TX: { fill: "#0a54cb" },
      NY: { fill: "#04265f" },
      MD: { fill: "#02142d" },
      FL: { fill: "#0a54cb" },
      NJ: { fill: "#04265f" },
      DC: { fill: "#02142d" },
      WA: { fill: "#3070c9" },
      OR: { fill: "#3070c9" },
      AZ: { fill: "#0a54cb" },
      NM: { fill: "#8cc1f6" },
      CO: { fill: "#0a54cb" },
      UT: { fill: "#7aa9e4" },
      NV: { fill: "#3070c9" },
      IL: { fill: "#04265f" },
      PA: { fill: "#02142d" },
      MA: { fill: "#02142d" },
      VA: { fill: "#04265f" },
      GA: { fill: "#3070c9" },
      NC: { fill: "#3e75de" },
      OH: { fill: "#04265f" },
      IN: { fill: "#04265f" },
      MI: { fill: "#04265f" },
      MN: { fill: "#3070c9" },
      WI: { fill: "#04265f" },
      MO: { fill: "#3e75de" },
      OK: { fill: "#0a54cb" },
      LA: { fill: "#3070c9" },
      AL: { fill: "#3e75de" },
      SC: { fill: "#3e75de" },
      KY: { fill: "#04265f" },
      TN: { fill: "#3e75de" },
      AR: { fill: "#3e75de" },
      MS: { fill: "#3e75de" },
      IA: { fill: "#3e75de" },
      KS: { fill: "#3e75de" },
      NE: { fill: "#7aa9e4" },
      SD: { fill: "#8cc1f6" },
      ND: { fill: "#8cc1f6" },
      MT: { fill: "#8cc1f6" },
      ID: { fill: "#7aa9e4" },
      WY: { fill: "#8cc1f6" },
      AK: { fill: "#8cc1f6" },
      HI: { fill: "#3070c9" },
      CT: { fill: "#02142d" },
      RI: { fill: "#02142d" },
      DE: { fill: "#02142d" },
      ME: { fill: "#3e75de" },
      VT: { fill: "#3e75de" },
      WV: { fill: "#3e75de" },
      NH: { fill: "#02142d" },
    };

    setCustomizeStates(fakeCustomizeStates);

    // --- Commented out API logic below ---
    /*
    const fetchAndFormatData = async () => {
      try {
        const response = await fetch("/api/students/localecount");
        const rawData: Record<string, number> = await response.json();

        console.log("Fetched rawData:", JSON.stringify(rawData, null, 2));

        const counts = Object.values(rawData);
        const maxCount = Math.max(...counts, 1);

        const data: GeographicData[] = allStates.map((state) => ({
          state,
          intensity: rawData[state] ? rawData[state] / maxCount : 0,
        }));

        const customized = data.reduce((acc, { state, intensity }) => {
          acc[state] = { fill: getStateColor(intensity) };
          return acc;
        }, {} as Record<string, { fill: string }>);

        setCustomizeStates(customized);
      } catch (error) {
        console.error("Failed to load locale data", error);
      }
    };

    fetchAndFormatData();
    */
  }, []);

  const handleStateClick = (event: React.MouseEvent) => {
    const stateAbbr = (event.target as SVGElement).dataset.name;
    alert(`You clicked on ${stateAbbr}`);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <USAMap
        customize={customizeStates}
        onClick={handleStateClick}
        width={600}
        height={450}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default MapComponent;

