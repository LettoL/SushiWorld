﻿using System;
using Base;
using Data.Entities.Clients;
using Data.Entities.Users;

namespace Data.Entities.ClientContacts
{
    public class MonthlyBusinessTripPlan : Entity
    {
        public int ManagerId { get; set; }
        public Manager Manager { get; set; }

        public int ClientId { get; set; }
        public Client Client { get; set; }

        public int AmountBusinessTrip { get; set; }

        public DateTime Date { get; set; }

        public MonthlyBusinessTripPlan(int managerId, int clientId, int amountBusinessTrip, int month)
        {
            ManagerId = managerId;
            ClientId = clientId;
            AmountBusinessTrip = amountBusinessTrip;
            Date = new DateTime(DateTime.Now.Year, month, 1);
        }
    }
}