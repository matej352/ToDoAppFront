import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../Task';

import { faTrash, faCheck, faPen } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {
  @Input()
  task!: Task;

  @Output()
  onDelete: EventEmitter<string> = new EventEmitter();

  @Output()
  onMark: EventEmitter<Task> = new EventEmitter();

  @Output()
  onUpdate: EventEmitter<object> = new EventEmitter();

  

  faTrash = faTrash;   //property, a odmah mu je i postavljena vrijednost
  faCheck = faCheck;
  faPen = faPen;

  wantUpdate: boolean = false;

  //from form
  //title!: string;
  //text!: string;

  constructor() { }

  ngOnInit(): void {
  }

  clicked(id: string) {
    if(confirm("Jesi li siguran da želiš obrisati zadatak?")) {
       this.onDelete.emit(id);
    }
  }

  marked(task: Task) {
    this.task.markAsDone = !this.task.markAsDone;
    this.onMark.emit(task);


  }

  startEdit() :void {
    this.wantUpdate = true;
  }

  onSubmit(form: NgForm) {
    if(!form.value.title) {
      alert("Naslov je obavezan!");
      return;
    }
    if(!form.value.text) {
      alert("Opis je obavezan!");
      return;
    }

    //mapping
    this.task.title = form.value.title;
    console.log(this.task.title);
    this.task.text = form.value.text;
    console.log(this.task.text);
    
    this.onUpdate.emit(this.task);

    this.wantUpdate = false;
  }

}
