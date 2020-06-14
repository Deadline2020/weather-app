import { Component, OnInit } from '@angular/core';
import { ControlsService } from '../../services/controls.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(public controlsService: ControlsService) { }

  public ngOnInit(): void { }

}
