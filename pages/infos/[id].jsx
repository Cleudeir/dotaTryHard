/* eslint-disable no-nested-ternary */
import { useEffect, useState } from "react";
const React = require("react");
import styles from "./id.module.css";
import mathInfos from "../../utils/infos";
import TableInfos from "../../component/infos/TableInfos/index.js";
import TableAbility from "../../component/infos/TableInfoAbilityItems/index.js";
import Container from "../../component/commons/Container";
import Accordion from "react-bootstrap/Accordion";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking", // false or 'blocking'
  };
}
export async function getStaticProps(context) {
  const { id } = context.params;
  const resp = await fetch(`${process.env.backUrl}/infos?account_id=${id}`);
  const data = await resp.json();
  return {
    props: { data, account_id: Number(id) },
    revalidate: 1 * 60,
  };
}

export default function Matches({ data, account_id }) {
  const [infos, setInfos] = useState(false);
  useEffect(() => {
    const { playersMatches, _matchIds } = data;
    if (playersMatches && _matchIds) {
      mathInfos({ playersMatches, _matchIds, account_id }).then((_infos) => {
        setInfos(_infos);
        console.log("_infos: ", _infos);
      });
    }
  }, [data]);

  if (infos) {
    return (
      <Container isLoading={Boolean(infos)}>
        <h3
          style={{
            justifySelf: "flex-start",
          }}
        >
          Hello! {infos.profile.personaname}
        </h3>
        <Accordion
          style={{
            maxWidth: 700,
            justifySelf: "flex-start",
          }}
          className="w-100 p-0 m-0"
          defaultActiveKey="0"
        >
          <Accordion.Item className="w-100 p-0 m-0" eventKey="0">
            <Accordion.Header className="w-100 p-0 m-0">Friends</Accordion.Header>
            <Accordion.Body className="w-100 p-0 m-0">
              <TableInfos type={"Win"} data={infos.alliesPlayers} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="w-100" eventKey="1">
            <Accordion.Header className="w-100 p-0 m-0">Enemies</Accordion.Header>
            <Accordion.Body className="w-100 p-0 m-0">
              <TableInfos type={"Loss"} data={infos.enemyPlayers} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="w-100" eventKey="2">
            <Accordion.Header className="w-100 p-0 m-0">Ability picks</Accordion.Header>
            <Accordion.Body className="w-100 p-0 m-0">
              <TableAbility type={"ability"} data={infos.uniqueInfosAbility} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="w-100" eventKey="3">
            <Accordion.Header className="w-100 p-0 m-0">Purchased items</Accordion.Header>
            <Accordion.Body className="w-100 p-0 m-0">
              <TableAbility type={"items"} data={infos.uniqueInfosItem} />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="w-100" eventKey="4">
            <Accordion.Header className="w-100 p-0 m-0">Purchased items used</Accordion.Header>
            <Accordion.Body className="w-100 p-0 m-0">
              <TableAbility type={"items"} data={infos.uniqueInfosItemUsed} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    );
  }
}
