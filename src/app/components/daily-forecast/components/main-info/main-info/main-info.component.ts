import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-main-info',
  templateUrl: './main-info.component.html',
  styleUrls: ['./main-info.component.scss']
})
export class MainInfoComponent implements OnInit {
  @Input() public currentTemp: string;
  @Input() public iconPath: string;
  @Input() public summary: string;
  @Input() public feelsLike: string;
  @Input() public wind: string;
  @Input() public humidity: string;

  constructor() { }

  public ngOnInit(): void { }

}
