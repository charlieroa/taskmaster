import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskboardComponent } from './taskboard.component';


const routes: Routes = [
  { path: '', component: TaskboardComponent },
  // Otras rutas internas si las tienes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskboardModule { }
