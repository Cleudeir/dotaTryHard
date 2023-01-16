/* eslint-disable no-nested-ternary */
import Header from "../../component/Header";
import TeamGamed from "../../component/TeamGamed";
import { useEffect, useState } from "react";
const React = require("react");
import Accordion from "react-bootstrap/Accordion";
import mathInfos from "../../component/Math/infos";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { id } = context.params;
  console.log("getStatic - Home: ");
  const resp = await fetch(`${process.env.backUrl}/infos?account_id=${id}&limit=600`);
  const data = await resp.json();
  return {
    props: { data, account_id: Number(id) },
    revalidate: 1 * 60 * 60,
  };
}

export default function Matches({ data, account_id }) {
  const [infos, setInfos] = useState(false);
  const [useLoading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const { playersMatches, _matchIds } = data;
      if (playersMatches && _matchIds) {
        const _infos = await mathInfos({ playersMatches, _matchIds, account_id });
        setInfos(_infos);
        setLoading(true);
      }
    })();
  }, [data]);
  return (
    useLoading && (
      <>
        <Header />
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 600, marginTop: 90, marginLeft: "auto", marginRight: "auto" }}>
          <h2 style={{ marginLeft: "auto", marginRight: "auto" }}>Hello! {infos.profile.personaname}</h2>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>See Your Win Rate with your friends</Accordion.Header>
              <Accordion.Body style={{ whiteSpace: "nowrap", textAlign: "center", width: "100%", margin: 0, padding: 0 }}>
                <TeamGamed type={"See Your Win Rate with your friends"} data={infos.alliesPlayers.slice(0, 100)} />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>See Your Loss Rate with your enemies</Accordion.Header>
              <Accordion.Body style={{ whiteSpace: "nowrap", textAlign: "center", width: "100%", margin: 0, padding: 0 }}>
                <TeamGamed type={"See Your Loss Rate with your enemies"} data={infos.enemyPlayers.slice(0, 100)} />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </>
    )
  );
}
