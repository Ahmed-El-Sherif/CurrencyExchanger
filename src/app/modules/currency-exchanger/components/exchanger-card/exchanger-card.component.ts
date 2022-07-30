import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exchanger-card',
  templateUrl: './exchanger-card.component.html',
  styleUrls: ['./exchanger-card.component.scss']
})
export class ExchangerCardComponent implements OnInit {
  @Input() from!: string;
  @Input() to!: string;
  @Input() rate!: number;
  @Input() amount!: number;

  constructor() { }

  ngOnInit(): void {
  }

}
