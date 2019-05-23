import { NgModule } from "@angular/core";
import { ClientComponent } from './containers/client/client.component';
import { ClientListComponent, MonthlyCallPlanDialog, ManagerCallsDialog } from './components/client-list/client-list.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { ClientEffects } from './store/effects/client.effects';
import { CLientService } from './services/client.service';
import { managerReducer } from './store/reducers';
import { EffectsModule } from '@ngrx/effects';
import { ManagerRoutingModule } from './manager-routing.module';
import { MaterialModule } from '../material/material.module';
import { MonthlyCallPlanService } from './services/monthlyCallPlan.service';
import { MonthlyCallPlanEffects } from './store/effects/monthlyCallPlan.effects';
import { ManagerComponent } from "./manager.component";
import { LayoutModule } from "./layout/layout.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BusinessTripDialog } from './components/client-list/dialogs/business-trip/business-trip.dialog';
import { BusinessTripPlanService } from './services/businessTripPlan.service';
import { SharedModule } from '../shared/shared.module';
import { AmountBusinessTripDialog } from './components/client-list/dialogs/amount-business-trip/amount-business-trip.dialog';
import { WeekPlanDialog } from './components/client-list/dialogs/weekplan/weekplan-dialog';
import { WeekPlanService } from './services/weekPlan.service';


@NgModule({
    declarations: [ClientComponent, 
        ClientListComponent, 
        ManagerComponent,

        MonthlyCallPlanDialog,
        ManagerCallsDialog,
        BusinessTripDialog,
        AmountBusinessTripDialog,
        WeekPlanDialog
    
    ],
    entryComponents: [
        MonthlyCallPlanDialog,
        ManagerCallsDialog,
        BusinessTripDialog,
        AmountBusinessTripDialog,
        WeekPlanDialog
    ],
    imports: [
        CommonModule,
        ManagerRoutingModule,
        HttpClientModule,
        StoreModule.forFeature('manager', managerReducer),
        EffectsModule.forFeature([ClientEffects, MonthlyCallPlanEffects]),
        MaterialModule,
        LayoutModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule
    ],
    providers: [
        CLientService, 
        MonthlyCallPlanService,
        BusinessTripPlanService,
        WeekPlanService
    ]
})
export class ManagerModule {}