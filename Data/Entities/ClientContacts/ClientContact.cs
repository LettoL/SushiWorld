﻿using System;
using Base;
using Data.Commands.ClientContacts.ClientContact;
using Data.Entities.Clients;
using Data.Entities.Users;
using Data.Enums;

namespace Data.Entities.ClientContacts
{
    public class ClientContact : Entity
    {
        public int ClientId { get; protected set; }
        public Client Client { get; protected set; }

        public int ManagerId { get; protected set; }
        public Manager Manager { get; protected set; }

        public DateTime Date { get; set; }

        public ClientContactType Type { get; protected set; }

        public ManagerType ManagerType { get; protected set; }

        protected ClientContact()
        {

        }

        public ClientContact(ClientContactCreate command)
        {
            ClientId = command.ClientId;
            Type = command.ContactType;
            ManagerId = command.ManagerId;
            ManagerType = command.ManagerType;
            Date = new DateTime(DateTime.Now.Year, DateTime.Now.Month, DateTime.Now.Day);
        }
    }
}