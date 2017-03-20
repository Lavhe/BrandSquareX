using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BrandSquare.Models;
using BrandSquare.Classes;

namespace BrandSquare.Controllers
{
    public class SaleController : Controller
    {
        private BrandSquareModel BrandSqaureX = new BrandSquareModel();

        public ActionResult Index()
        {
            return View();
        }

        public string GetPost(int brandID,int index)
        {

            Sale s = new Sale();

            try
            {
                if (brandID == 0)
                {
                    s = BrandSqaureX.Sales.OrderByDescending(p => p.ID).Skip(index).Take(1).First();
                }
                else
                {
                    s = BrandSqaureX.Sales.OrderByDescending(p => p.ID).Where(sale => sale.Brand.BrandID == brandID).Skip(index).Take(1).First();
                }
            }
            catch (Exception ex)
            {
                return "No More Posts";
            }

            var answer = new
            {
                PosterName = s.Brand.BrandName,
                PosterImage = s.Brand.BrandLogo,
                PosterCategory = s.Brand.Category.CategoryName,
                PostCategory = s.Category.CategoryName,
                PostName = s.Description,
                PostImage = s.Image,
                PostPrice = s.Price,
                PostDate = "Nothing",
                PostViews = s.Views,
                PostContact = new
                {
                    Facebook = s.Brand.SocialMedia.FaceBookPage,
                    Twitter = s.Brand.SocialMedia.TwitterHandle,
                    Instagram = s.Brand.SocialMedia.InstagramLink
                },
                PostLineUp = "Nothing",
                PostVenue = "Nothing"
            };

            return JavaScriptX.convertString(answer);
        }
    }
}