import { Component, OnInit } from '@angular/core';

import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title :string = 'TO DO APP';

  showTaskAdd!: boolean;
  subscription!: Subscription;


  constructor(private uiService: UiService) {
    this.subscription = uiService.onChange().subscribe(boolValue => this.showTaskAdd = boolValue);
   }

  ngOnInit(): void {
  }

  addTaskForm() {
    this.uiService.changeShowTaskAdd();
  }

}
