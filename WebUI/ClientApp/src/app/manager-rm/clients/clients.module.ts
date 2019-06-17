import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from './containers/clients/clients.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { MaterialModule } from 'src/app/material/material.module';
import { CreateClientDialogComponent } from './dialogs/create-client-dialog/create-client-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EditClientDialogComponent } from './dialogs/edit-client-dialog/edit-client-dialog.component';
import { AnalysisDialogComponent } from './dialogs/analysis-dialog/analysis-dialog.component';
import { WeekPlansDialogComponent } from './dialogs/week-plans/week-plans-dialog.component';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientListComponent,
    CreateClientDialogComponent,
    EditClientDialogComponent,
    AnalysisDialogComponent,
    WeekPlansDialogComponent
  ],
  entryComponents: [
    CreateClientDialogComponent,
    EditClientDialogComponent,
    AnalysisDialogComponent,
    WeekPlansDialogComponent
  ],
  exports: [
    ClientsComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ClientsModule { }
