﻿using Data.Commands.Manager;

namespace Data.Entities.Users
{
    public class Manager : User
    {
        public string Phone { get; protected set; }

        protected Manager()
        {

        }

        public Manager(ManagerCreateCommand command)
        {
            Login = command.Login;
            Password = command.Password;
            Phone = command.Phone;
        }

        public void Edit(ManagerEditCommand command)
        {
            Login = command.Login;
            Password = command.Password;
            Phone = command.Phone;
        }
    }
}