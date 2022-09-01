import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import React from 'react';

export default function CardPlayer({item, index}) {
  return (
    <div style={{margin: 5}}>
      <Card style={{width: '12.5rem', textAlign: 'center'}}>
        <Card.Img variant="top" src={item.profile.avatarfull} />
        <Card.Body>
          <Card.Title>{item.profile.personaname.slice(0, 13)}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroup.Item>Nº: {index} - Rate: {item.rankingRate}</ListGroup.Item>
          <ListGroup.Item>WinRate: {item.winRate}%</ListGroup.Item>
        </ListGroup>
        <Table bordered>
          <thead>
          </thead>
          <tbody>
            <tr >
              <td>Kills</td>
              <td>Deaths</td>
              <td>Assists</td>
            </tr>
            <tr>
              <td>{item.kills}</td>
              <td>{item.deaths} </td>
              <td>{item.assists}</td>
            </tr>
          </tbody>
        </Table>
        <Card.Body>
          <Card.Link href={`/matches/${item.profile.account_id}`}>Ver partidas</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
}
