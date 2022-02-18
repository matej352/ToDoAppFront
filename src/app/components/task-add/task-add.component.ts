import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
  title!: string;
  text!: string;

  @Output()
  onAdd: EventEmitter<object> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    if(!this.title) {
      alert("Naslov je obavezan!");
      return;
    }
    if(!this.text) {
      alert("Opis je obavezan!");
      return;
    }

    let obj = {
      title : this.title,
      text : this.text
    }
    
    this.onAdd.emit(obj);

    this.title = "";
    this.text = "";
  }

}
