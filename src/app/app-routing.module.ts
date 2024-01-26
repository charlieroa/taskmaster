import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

 { path: '', redirectTo: 'tasks', pathMatch: 'full' }, // Ruta principal (puede variar)
  { path: 'tasks', loadChildren: () => import('./taskboard/taskboard.module').then(m => m.TaskboardModule) },
  { path: 'detail/:id', loadChildren: () => import('./detailtask/detailtask.module').then(m => m.DetailtaskModule) },
  { path: 'tasks', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
