import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from './shared/guards/admin.guard';

const routes: Routes = [
  { path: 'manager-rm', loadChildren: './manager-rm/manager-rm.module#ManagerRmModule' },
  { path: 'admin',  loadChildren: './admin/admin.module#AdminModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
