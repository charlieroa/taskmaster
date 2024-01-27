import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailtaskComponent } from './detailtask/detailtask.component';

const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', loadChildren: () => import('./taskboard/taskboard.module').then(m => m.TaskboardModule) },
  { path: 'detail/:id', loadChildren: () => import('./detailtask/detailtask.module').then(m => m.DetailtaskModule) },
  { path: 'detailtask/:id', component: DetailtaskComponent }, // Ruta no afectada por la carga perezosa
  { path: 'tasks', redirectTo: '', pathMatch: 'full' } // Redirige desde 'tasks' a la ruta raíz
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
