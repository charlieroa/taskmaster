import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Itask } from '../interface/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-taskboard',
  templateUrl: './taskboard.component.html',
  styleUrls: ['./taskboard.component.scss']
})
export class TaskboardComponent implements OnInit {
  todoForm !: FormGroup;
  task: Itask[] = [];
  inprogress: Itask[] = [];
  done: Itask[] = [];

  constructor(private TaskService: TaskService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadInProgress();
    this.loadCompleted();
    this.todoForm = this.fb.group({
      item: ['', Validators.required],
      title: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  loadTasks(): void {
    this.TaskService.getTasks().subscribe(
      tasks => {
        this.task = tasks;
      },
      error => {
        console.error('Error al cargar tareas', error);
      }
    );
  }

  loadInProgress(): void {
    this.TaskService.getInProgress().subscribe(
      inProgressTasks => {
        this.inprogress = inProgressTasks;
      },
      error => {
        console.error('Error al cargar tareas en progreso', error);
      }
    );
  }

  loadCompleted(): void {
    this.TaskService.getCompleted().subscribe(
      completedTasks => {
        this.done = completedTasks;
      },
      error => {
        console.error('Error al cargar tareas completadas', error);
      }
    );
  }
  addtask() {
    const newTask: Itask = {
      id: 0, // El ID se establece en 0 o se omite si json-server lo genera automáticamente
      title: this.todoForm.value.title,
      description: this.todoForm.value.item,
      date: this.todoForm.value.date,
      done: false,
      estado: 'nuevo' // Asume que 'nuevo' es un valor válido para 'estado'
      ,
      state: 'task'
    };

    this.TaskService.addTask(newTask).subscribe(
      (taskWithId) => {
        this.task.push(taskWithId); // Asume que el servidor devuelve la tarea con un ID único
        this.todoForm.reset();
      },
      error => {
        console.error('Error al crear la tarea', error);
      }
    );
  }

  onEdit(item: Itask) {
    this.router.navigate(['/detail', item.id]);
  }

  deletetask(i: number) {
    const taskId = this.task[i].id;
    this.TaskService.deleteTask(taskId).subscribe(
      () => {
        this.task.splice(i, 1); // Actualiza el array local después de eliminar la tarea del servidor
      },
      error => {
        console.error('Error al eliminar la tarea', error);
      }
    );
  }

  deleteinprogress(i: number) {
    const taskId = this.inprogress[i].id;
    this.TaskService.deleteInProgressTask(taskId).subscribe(
      () => {
        this.inprogress.splice(i, 1); // Actualiza el array local
      },
      error => {
        console.error('Error al eliminar la tarea en progreso', error);
      }
    );
  }

  deletedone(i: number) {
    const taskId = this.done[i].id;
    this.TaskService.deleteCompletedTask(taskId).subscribe(
      () => {
        this.done.splice(i, 1); // Actualiza el array local
      },
      error => {
        console.error('Error al eliminar la tarea completada', error);
      }
    );
  }
  updateTaskState(task: Itask, newContainerId: string) {
    // Actualiza el estado de la tarea según el contenedor de destino
    switch (newContainerId) {
      case 'tasks-container':
        task.state = 'task';
        break;
      case 'inProgress-container':
        task.state = 'inProgress';
        break;
      case 'completed-container':
        task.state = 'completed';
        break;
      default:
        return;
    }

    // Envía una solicitud HTTP para actualizar la tarea en el servidor
    this.TaskService.updateTask(task).subscribe(
      () => console.log('Tarea actualizada en el servidor'),
      error => console.error('Error al actualizar tarea en el servidor', error)
    );
  }

  drop(event: CdkDragDrop<Itask[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Mueve la tarea entre las listas
      const task = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      // Actualiza el orden de las tareas en el servidor
      this.TaskService.updateTaskOrder(this.task).subscribe(
        () => console.log('Orden de tareas actualizado en el servidor'),
        error => console.error('Error al actualizar el orden de las tareas en el servidor', error)
      );
    }
  }
}
