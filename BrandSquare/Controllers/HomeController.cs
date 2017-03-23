using BrandSquare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BrandSquare.Classes;

namespace BrandSquare.Controllers
{
    public class HomeController : Controller
    {
        private BrandSquareModel BrandSqaureX = new BrandSquareModel();
        public ActionResult Index()
        {
            return View();
        }

        public string GetLatestNews() {

            var statuses = BrandSqaureX.Status.OrderByDescending(e => e.ID).Take(3).ToList();

            List<object> answer = new List<object>();
            foreach (Status Status in statuses) {
                answer.Add(
                    new {
                        PosterName = Status.Brand.BrandName,
                        StatusTime = X.TimeAge(DateTime.Now,Status.DateTimePosted),
                        StatusMessage = Status.Status1
                    }
                );
            }

            return JavaScriptX.convertString(answer);
        }
    }
}