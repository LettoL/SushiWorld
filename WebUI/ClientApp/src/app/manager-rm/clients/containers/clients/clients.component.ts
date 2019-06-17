import { Component, OnInit } from '@angular/core';
import { ClientsFacade } from '../../../../store/manager-rm/clients/facades/clients.facade';
import { Observable } from 'rxjs';
import { IClient } from '../../shared/models/client.model';
import { ICallPlan } from '../../shared/models/call-plan.model';
import { INomenclatureAnalysis } from '../../shared/models/nomenclature-analysis';
import { IRevenueAnalysis } from '../../shared/models/revenue-analysis';
import { IWeekPlan } from '../../shared/models/week-plan.model';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.sass']
})
export class ClientsComponent implements OnInit {

  clients$: Observable<IClient[]> = this.clientsFacade.clients$;

  createClient(client: IClient){
    client.callPlan = this.clientCallPlanInit(client);
    client.tripPlan = {
      id: client.id,
      planned: 0,
      fact: 0,
      clientId: client.id
    }
    client.nomenclatureAnalysis = {
      id: client.id,
      reportPrevMonth: '0%',
      reportAvg5Months: '0%',
      prevMonth: '0%',
      avg5Months: '0%',
      clientId: client.id
    }
    client.revenueAnalysis = {
      id: client.id,
      reportPrevMonth: '0%',
      reportAvg5Months: '0%',
      prevMonth: '0%',
      avg5Months: '0%',
      clientId: client.id
    }
    client.weekPlans = this.clientWeekPlansInit(client);

    this.clientsFacade.createClient(client);
  }

  updateClient(client: IClient){
    client.callPlan = this.clientCallPlanRecalculate(client)

    this.clientsFacade.editClient(client);
  }

  clientCallPlanInit(client: IClient): ICallPlan {
    return {
      id: 0,
      collective: this.translateNumberOfCallsToCollectiveCalls(client.numberOfCalls),
      RM: this.translateNumberOfCallsToCollectiveCalls(client.numberOfCalls),
      MS: 0,
      clientId: client.id
    }
  }

  clientWeekPlansInit(client: IClient): IWeekPlan[]{
    return [
      {
          id: client.id,
          clientId: client.id,
          RMplanned: '',
          RMfact: ''
      },
      {
          id: client.id,
          clientId: client.id,
          RMplanned: '',
          RMfact: ''
      },
      {
          id: client.id,
          clientId: client.id,
          RMplanned: '',
          RMfact: ''
      },
      {
          id: client.id,
          clientId: client.id,
          RMplanned: '',
          RMfact: ''
      },
      {
          id: client.id,
          clientId: client.id,
          RMplanned: '',
          RMfact: ''
      }
    ]
  }

  clientCallPlanRecalculate(client: IClient): ICallPlan {
    client.callPlan.collective = this.translateNumberOfCallsToCollectiveCalls(client.numberOfCalls);
    return {
      ...client.callPlan,
      MS: client.callPlan.MS,
      RM: client.callPlan.collective - client.callPlan.MS
    }
  }

  constructor(public clientsFacade: ClientsFacade) { }

  ngOnInit() {
    this.clientsFacade.loadClients(1);
  }

  translateNumberOfCallsToCollectiveCalls(numberOfCalls): number {
    if(numberOfCalls != 90)
      return numberOfCalls / 10

    else
      return (numberOfCalls - 10) / 10
  }
}
