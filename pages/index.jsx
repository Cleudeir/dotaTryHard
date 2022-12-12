import styles from "./index.module.css";
import Header from "../component/Header";
import { useEffect, useState } from "react";
import Tables from "../component/Tables";

const React = require("react");

export async function getStaticProps() {
  console.log("getStatic - Home: ");
  const resp = await fetch(`${process.env.backUrl}/ranking?limit=400`);
  const data = await resp.json();
  const regionsNames = [
    "WORLD",
    "SOUTH AMERICA",
    "NORTH AMERICA",
    "EUROPE",
    "CHINA",
    "unknown",
  ];
  const regionData = [];
  for (let i = 0; i < regionsNames.length; i++) {
    const element = regionsNames[i];
    if (element !== "WORLD") {
      const filter = data.filter(
        (item) => item.profile.loccountrycode === element
      );
      regionData.push(filter);
    } else {
      regionData.push(data);
    }
  }

  return {
    props: { regionData: regionData, regionsNames },
    revalidate: 10 * 60,
  };
}

export default function Home({ regionData, regionsNames }) {
  const [useRegion, setRegion] = useState(1);
  const [useData, setData] = useState(false);
  const [useLoading, setLoading] = useState(false);

  useEffect(() => {
    console.log("data: ", regionData, regionData[useRegion]);
    setData(regionData[useRegion]);
    setLoading(true);
  }, []);

  function filterRegion(region) {
    setData(
      regionData[region].slice(0, 30).map((x, i) => ({ ...x, pos: i + 1 }))
    );
    setRegion(region);
    setTimeout(() => {
      setData(regionData[region].map((x, i) => ({ ...x, pos: i + 1 })));
    }, 1000);
  }

  return (
    <div className={styles.container}>
      <Header filterRegion={filterRegion} />
      <main
        id="main"
      >
        {useLoading && (
          <div style={{
            padding: 5,
            maxWidth: 1300,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginLeft: "auto",
            marginRight: "auto",
            marginTop: 70
          }}>
            <h1
              style={{
                padding: 5,
              }}
            >
              {regionsNames[useRegion]}
            </h1>
            <Tables
              style={{
                padding: 5,
                maxWidth: 1300,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginLeft: "auto",
                marginRight: "auto",
              }}
              useSave={regionData[useRegion]}
              useData={useData}
              setData={setData}
              setLoading={setLoading}
            />
          </div>
        )}
        {!useLoading && (
          <img
            src={
              "https://i.pinimg.com/originals/cd/77/f3/cd77f35d8796025d03b5452d65269e9d.gif"
            }
            style={{ margin: "auto", filter: "invert(1)" }}
          />
        )}
      </main>
    </div>
  );
}
