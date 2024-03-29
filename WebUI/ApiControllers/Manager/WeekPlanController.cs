﻿using System.Linq;
using System.Threading.Tasks;
using Base.Helpers;
using Data;
using Data.Commands.ClientContacts.WeekPlan;
using Data.DTO.Clients;
using Data.Entities.ClientContacts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace WebUI.ApiControllers.Manager
{
    [Route("api/manager/[controller]")]
    [ApiController]
    public class WeekPlanController : ControllerBase
    {
        private readonly ApplicationContext _context;

        public WeekPlanController(ApplicationContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var result = await _context.Set<WeekPlan>()
                .Where(x => DateHelper.IsCurrentMonth(x.Date))
                .Select(x => new WeekPlanDto()
                {
                    Id = x.Id,
                    ClientId = x.ClientId,
                    Plan = x.Plan,
                    Fact = x.Fact,
                    WeekNumber = x.WeekNumber,
                    ManagerType = x.ManagerType
                }).ToListAsync();

            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] WeekPlanCreate command)
        {
            var weekPlan = await _context.Set<WeekPlan>()
                .FirstOrDefaultAsync(x => x.ClientId == command.ClientId
                                          && DateHelper.IsCurrentMonth(x.Date)
                                          && x.WeekNumber == command.WeekNumber
                                          && x.ManagerType == command.ManagerType);
            if (weekPlan != null)
                return BadRequest("План на эту неделю уже существует");

            var newWeekPlan = await _context.Set<WeekPlan>()
                .AddAsync(new WeekPlan(command));

            await _context.SaveChangesAsync();

            var result = newWeekPlan.Entity;

            return Ok(result);
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] WeekPlanEdit command)
        {
            var weekPlan = await _context.Set<WeekPlan>()
                .FirstOrDefaultAsync(x => x.Id == command.Id);

            if (weekPlan == null)
                return BadRequest("Недельный план не найден");

            weekPlan.Edit(command);

            await _context.SaveChangesAsync();

            var result = new WeekPlanDto()
            {
                Id = weekPlan.Id,
                ClientId = weekPlan.ClientId,
                Fact = weekPlan.Fact,
                FactTitle = weekPlan.FactTitle,
                ManagerType = weekPlan.ManagerType,
                Plan = weekPlan.Plan,
                PlanTitle = weekPlan.PlanTitle,
                WeekNumber = weekPlan.WeekNumber
            };

            return Ok(result);
        }

        [HttpPut("AddFact")]
        public async Task<IActionResult> AddFact([FromBody] AddFact command)
        {
            var weekPlan = await _context.Set<WeekPlan>()
                .FirstOrDefaultAsync(x => x.ClientId == command.ClientId
                                          && x.WeekNumber == command.WeekNumber
                                          && x.ManagerType == command.ManagerType
                                          && DateHelper.IsCurrentMonth(x.Date));

            if (weekPlan == null)
                return BadRequest("План не найден");

            weekPlan.AddFact(command.Fact, command.FactTitle);

            await _context.SaveChangesAsync();

            var result = weekPlan;

            return Ok(result);
        }

        [HttpPut("EditFact")]
        public async Task<IActionResult> EditFact([FromBody] WeekPlanFactEdit command)
        {
            var weekPlan = await _context.Set<WeekPlan>()
                .FirstOrDefaultAsync(x => x.Id == command.Id);

            if (weekPlan == null)
                return BadRequest("Недельный план не найден");

            weekPlan.EditFact(command);

            await _context.SaveChangesAsync();

            var result = new WeekPlanDto()
            {
                Id = weekPlan.Id,
                ClientId = weekPlan.ClientId,
                Fact = weekPlan.Fact,
                FactTitle = weekPlan.FactTitle,
                ManagerType = weekPlan.ManagerType,
                Plan = weekPlan.Plan,
                PlanTitle = weekPlan.PlanTitle,
                WeekNumber = weekPlan.WeekNumber
            };

            return Ok(result);
        }
    }
}