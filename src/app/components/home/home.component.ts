import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TodoService } from 'src/app/services/todo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data: any = {};

  constructor(private todoService: TodoService,public snackBar:MatSnackBar) {}

  ngOnInit(): void {
    this.getAllTodos();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateTodo();
  }
  addTodo(todo: any) {
    const obj = { todo: todo.value };
    //.subscribe dönen sonuç true veya false durumuna göre yapılacak işlemleri belirlememizi sağlar
    this.todoService.addTodo(obj).subscribe(
      (result:any) => {
        console.log(result);
        this.getAllTodos();
        this.openSnackBar(result.message)
      },
      (error) => {
        console.log(error);
        this.openSnackBar(error.message)
      }
    );

    todo.value = '';
  }

  getAllTodos() {
    this.todoService.getAllTodos().subscribe(
      (result: any) => {
        Object.keys(result).forEach((key) => {
          this.data[key] = result[key];
        });
      },
      (error) => {
        console.log(error.message);
        this.openSnackBar(error.message)
      }
    );
  }

  updateTodo() {
    this.todoService.updateTodo(this.data).subscribe(
      (result:any) => {
        console.log(result);
        this.openSnackBar(result.message)
      },
      (error) => {
        console.log(error);
        this.openSnackBar(error.message)
      }
    );
  }


  removeTodo(id:any) {
    console.log(id)
    if(window.confirm("Bu maddeyi silmek istediğinize emin misinizzz ??")){
      this.todoService.deleteTodo(id).subscribe(
        (result:any) => {
          console.log(result);
          this.getAllTodos();
          this.openSnackBar(result.message)
        },
        (error) => {
          console.log(error);
          this.openSnackBar(error.message)
        }
      );
    }
    
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "Tamam");
  }
}
