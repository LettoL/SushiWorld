﻿using System.Collections.Generic;
using Data.DTO.Calls;

namespace WebUI.ViewModels.Clients
{
    public class ClientForManagerVM
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Phone { get; set; }
        public int? PlannedAmountCalls { get; set; }
        public int AmountCalls { get; set; }
        public ICollection<CallDTO> Calls { get; set; }
    }
}