import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailtaskComponent } from './detailtask.component';

const routes: Routes = [
  { path: '', component: DetailtaskComponent },
  // Otras rutas internas si las tienes
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetailtaskModule { }
