import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Itask } from '../interface/task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-detailtask',
  templateUrl: './detailtask.component.html',
  styleUrls: ['./detailtask.component.scss']
})
export class DetailtaskComponent implements OnInit {
  myForm!: FormGroup;
  taskId!: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      title: [''], // Permitir títulos en blanco
  description: [''], // Permitir descripciones en blanco
  date: ['', Validators.required] // Mantener la validación de fecha
    });

    const idParam = this.route.snapshot.paramMap.get('id');
    this.taskId = idParam ? parseInt(idParam, 10) : 0;  // Manejo de null

    if (this.taskId) {
      this.taskService.getTaskById(this.taskId).subscribe(task => {
        this.myForm.setValue({
          title: task.title,
          description: task.description,
          date: task.date
        });
      }, error => console.error('Error al cargar la tarea', error));
    }
  }

  updateTask() {
    if (this.myForm.valid) {
      const updatedTask: Itask = {
        id: this.taskId,
        title: this.myForm.value.title,
        description: this.myForm.value.description,
        date: this.myForm.value.date, // Asume que la fecha ya está en formato correcto
        done: false,
        estado: 'tuEstadoAqui',
        state: ''
      };

      this.taskService.updateTask(updatedTask).subscribe(() => {
        // Actualización exitosa, navega de vuelta a la vista taskboard
        this.router.navigate(['/tasks']);
      }, error => console.error('Error al actualizar la tarea', error));
    } else {
      console.error('El formulario no es válido.');
      // Manejar aquí el caso de un formulario no válido.
    }
  }
  deleteTask() {
    if (this.taskId) {
      this.taskService.deleteTask(this.taskId).subscribe(
        () => {
          // Redirigir al usuario después de eliminar la tarea
          this.router.navigate(['/tasks']);
        },
        error => {
          console.error('Error al eliminar la tarea', error);
          // Manejar errores aquí, por ejemplo, mostrar un mensaje al usuario
        }
      );
    }
  }


  goBack() {
    this.router.navigate(['/tasks']);
  }
}

