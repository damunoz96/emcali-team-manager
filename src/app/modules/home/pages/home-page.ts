import { Component, signal } from '@angular/core';

@Component({
  selector: 'home-page',
  templateUrl: './home-page.html',
})
export class HomePage {
  games = [
    {
      gameid: 1,
      title: 'Game 1',
      date: '2024-06-01',
      local: {
        name: 'Emcali',
        score: 100,
      },
      visitor: {
        name: 'Dragones',
        score: 90,
      },
    },
    {
      gameid: 2,
      title: 'Game 2',
      date: '2024-06-02',
      local: {
        name: 'Emcali',
        score: 80,
      },
      visitor: {
        name: 'END',
        score: 30,
      },
    },
    {
      gameid: 3,
      title: 'Game 3',
      date: '2024-06-03',
      local: {
        name: 'Emcali',
        score: 50,
      },
      visitor: {
        name: 'Leones',
        score: 10,
      },
    },
  ];

  players = [
    { name: 'Daniel', last_name: 'Munoz', position: 'F', games: 10, points: 200, fouls: 5 },
    { name: 'Fabian', last_name: 'Duenas', position: 'PG', games: 10, points: 500, fouls: 2 },
    { name: 'Camilo', last_name: 'Garcia', position: 'G', games: 10, points: 1000, fouls: 1 },
  ];
}
