import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { todoArr } from '../const/tododata';
import { ItodoArr } from '../model/todo';
import { UuidService } from '../services/uuid.service';
// import { SnackarService } from '../services/snackar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-todo1',
  templateUrl: './todo1.component.html',
  styleUrls: ['./todo1.component.scss']
})
export class Todo1Component implements OnInit {

  constructor(private _uuidService: UuidService,
    private _matsnackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  todoArr: ItodoArr[] = todoArr;
  isineditmode: boolean = false;
  editId: string = '';


  @ViewChild('todoitem') todoitem!: ElementRef<HTMLInputElement>;
  @ViewChild('Iscomplete') Iscomplete!: ElementRef<HTMLInputElement>;
  // @ViewChild('Iscomplete')Iscomplete!:ElementRef<HTMLInputElement>;


  edittodo(todo: ItodoArr) {
    this.editId = todo.todoid;
    this.isineditmode = true;
    this.todoitem.nativeElement.value = todo.todoitem
  }


  updatetodo() {

    let updatedobj = {
      todoitem: this.todoitem.nativeElement.value,
      todoid: this.editId,
      iscompleted: this.Iscomplete.nativeElement.value === "yes" ? true : false
    }

    //  let updateid=this.editId;
    let findindex = todoArr.findIndex(t => t.todoid === this.editId);
    todoArr[findindex] = updatedobj;

    this.todoitem.nativeElement.value = '';
    this._matsnackbar.open(`todo with id ${this.editId} updated successfully`, `close`, {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 3000
    })
    this.isineditmode = false;
  }


  addtodo() {
    let todo: ItodoArr = {
      todoitem: this.todoitem.nativeElement.value,
      todoid: this._uuidService.uniqueId(),
      iscompleted: this.Iscomplete.nativeElement.value === "yes" ? true : false
    }

    this.todoitem.nativeElement.value = '';
    this.todoArr.unshift(todo);
    this._matsnackbar.open(`new todo added successfully`, `close`, {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 3000
    })
    // console.log(this.todoitem.nativeElement.value) 
    // console.log(todo.todoid);

  }


  deletetodo(todoId: string) {
    //  console.log(todoId)
    let getconfirm = confirm(`are you sure you want to delete todo with id ${todoId}`)
    if (getconfirm) {
      let findIndex = this.todoArr.findIndex(t => t.todoid === todoId);
      todoArr.splice(findIndex, 1);
    }
    this._matsnackbar.open(`todo with id ${todoId} is deleted successfully`, `close`, {
      horizontalPosition: 'left',
      verticalPosition: 'top',
      duration: 3000
    })
  }



}
