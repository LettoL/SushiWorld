﻿using System;
using System.IO;
using System.Linq;
using System.Text;
using Data.Services.Abstract;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebUI.Controllers
{
    public class HomeController : Controller
    {
        private readonly IMyCallsAPIService _myCallsApiService;

        public HomeController(IMyCallsAPIService myCallsApiService)
        {
            _myCallsApiService = myCallsApiService;
        }

        [HttpGet]
        public IActionResult ImportFile()
        {
            return View();
        }

        [HttpPost]
        public IActionResult ImportFile(IFormFile file)
        {
            BinaryReader b = new BinaryReader(file.OpenReadStream());
            byte[] data = b.ReadBytes(Convert.ToInt32(file.Length));

            string result = Encoding.GetEncoding(1251).GetString(data);
            string[] lines = result.Split('\r');

            for (var i = 0; i < lines.Length; i++)
            {
                string[] rows = lines[i].Split(';');
            }

            return RedirectToAction("ImportFile");
        }

        public void MyCallsTest()
        {
            _myCallsApiService.GetCallsByDate(new DateTime(2019, 7, 1), new DateTime(2019, 7, 5), 0);
        }

        public IActionResult Index()
        {
            return Redirect("/Account/Index");
        }
    }
}