import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import orderTable from "./orderTable";

function Tables({ useData, setData, useSave, setLoading }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [useResponsiveTable, setResponsiveTable] = useState(true);
  useEffect(() => {
    const sizeWidth = window.screen.width;
    const sizeHeight = window.screen.height;
    console.log({ sizeWidth, sizeHeight });
    if (sizeWidth > 768 && sizeWidth > sizeHeight) {
      setResponsiveTable(false);
    }
  }, []);

  function styleTd() {
    return { whiteSpace: "nowrap" };
  }
  function imageStyle(url) {
    return {
      margin: 0,
      padding: 0,
      backgroundImage: `url(${url})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }
  function ImageSize() {
    return <div style={{ margin: 0, padding: 0, width: 45, height: 45 }}></div>;
  }

  function filterName(e) {
    if (useSave)
      setData(
        useSave.filter((x) =>
          x.profile.personaname.toUpperCase().includes(e.toUpperCase())
        )
      );
  }
  return (
    mounted && (
      <div
        style={{
          whiteSpace: "nowrap",
          width: "100%",
          maxWidth: 1300,
          padding: 5,
          margin: 0,
          fontSize: 14,
        }}
      >
        <Table
          style={{
            width: "100%",
            whiteSpace: "nowrap",
            padding: 0,
            margin: 0,
          }}
          bordered
          striped={true}
          responsive={useResponsiveTable}
        >
          <thead>
            <tr>
              <th style={{ width: 70 }}>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) => orderTable("pos", e, useData, setData)}
                >
                  Pos ↑
                </span>
              </th>
              <th>
                {useSave && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 5,
                    }}
                  >
                    <span
                      style={{
                        color: "#37e",
                        cursor: "pointer",
                        margin: "auto",
                      }}
                      onClick={(e) =>
                        orderTable("profile.personaname", e, useData, setData)
                      }
                    >
                      Nick ↓
                    </span>
                  </div>
                )}
              </th>
              <th>
                {useSave && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginLeft: 5,
                    }}
                  >
                    <Form.Control
                      style={{
                        display: "flex",
                        color: "#37e",
                        width: 130,
                        flexDirection: "row",
                        marginLeft: 5,
                        height: 25,
                      }}
                      type="text"
                      placeholder="search"
                      onChange={(e) => {
                        filterName(e.target.value);
                      }}
                    />
                  </div>
                )}
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) =>
                    orderTable("rankingRate", e, useData, setData)
                  }
                >
                  Rate ↓
                </span>
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) => orderTable("matches", e, useData, setData)}
                >
                  Matches ↓
                </span>
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) => orderTable("winRate", e, useData, setData)}
                >
                  WinRate ↓
                </span>
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) => orderTable("kills", e, useData, setData)}
                >
                  kills ↓
                </span>
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) => orderTable("deaths", e, useData, setData)}
                >
                  Deaths ↓
                </span>
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) => orderTable("assists", e, useData, setData)}
                >
                  Assis ↓
                </span>
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) => orderTable("last_hits", e, useData, setData)}
                >
                  Lasts ↓
                </span>
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) => orderTable("denies", e, useData, setData)}
                >
                  Denies ↓
                </span>
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) =>
                    orderTable("gold_per_min", e, useData, setData)
                  }
                >
                  GPM ↓
                </span>
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) => orderTable("xp_per_min", e, useData, setData)}
                >
                  XPM ↓
                </span>
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) =>
                    orderTable("hero_damage", e, useData, setData)
                  }
                >
                  Hero ↓
                </span>
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) =>
                    orderTable("tower_damage", e, useData, setData)
                  }
                >
                  Tower ↓
                </span>
              </th>
              <th>
                <span
                  style={{ color: "#37e", cursor: "pointer" }}
                  onClick={(e) =>
                    orderTable("hero_healing", e, useData, setData)
                  }
                >
                  Heal ↓
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {useData &&
              useData.map((player, i) => (
                <tr key={player.profile.account_id}>
                  <td style={styleTd(player.win)}>{player.pos}</td>
                  <td style={imageStyle(player.profile.avatarfull)}>
                    <ImageSize />
                  </td>
                  <td style={styleTd(player.win)}>
                    {player.profile.personaname.slice(0, 15)}
                  </td>
                  <td style={styleTd(player.win)}>{player.rankingRate} </td>
                  <td style={styleTd(player.win)}>
                    <a
                      href={`/matches/${player.profile.account_id}`}
                      onClick={() => setLoading(false)}
                    >
                      {player.matches} 👀
                    </a>{" "}
                  </td>
                  <td style={styleTd(player.win)}>
                    <a
                      href={`/infos/${player.profile.account_id}`}
                      onClick={() => setLoading(false)}
                    >
                      {player.winRate.toFixed(1)}% 👀
                    </a>{" "}
                  </td>
                  <td style={styleTd(player.win)}>
                    {player.kills.toFixed(1)}{" "}
                  </td>
                  <td style={styleTd(player.win)}>
                    {player.deaths.toFixed(1)}{" "}
                  </td>
                  <td style={styleTd(player.win)}>
                    {player.assists.toFixed(1)}{" "}
                  </td>
                  <td style={styleTd(player.win)}>
                    {player.last_hits.toFixed(1)}
                  </td>
                  <td style={styleTd(player.win)}>
                    {player.denies.toFixed(1)}
                  </td>
                  <td style={styleTd(player.win)}>
                    {player.gold_per_min.toFixed(0)}{" "}
                  </td>
                  <td style={styleTd(player.win)}>
                    {player.xp_per_min.toFixed(0)}
                  </td>
                  <td style={styleTd(player.win)}>
                    {player.hero_damage.toFixed(0)}{" "}
                  </td>
                  <td style={styleTd(player.win)}>
                    {player.tower_damage.toFixed(0)}{" "}
                  </td>
                  <td style={styleTd(player.win)}>
                    {player.hero_healing.toFixed(0)}{" "}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    )
  );
}

export default Tables;
