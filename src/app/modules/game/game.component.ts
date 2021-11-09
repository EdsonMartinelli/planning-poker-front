import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  cards = [0,1,2,3,5,8,13,21,34,55,89]
  constructor() { }

  ngOnInit(): void {
  }

  teste(teste: number){
    console.log(teste)
  }
  
}
