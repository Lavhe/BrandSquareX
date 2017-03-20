using BrandSquare.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BrandSquare.Classes;

namespace BrandSquare.Controllers
{
    public class EventController : Controller
    {
        private BrandSquareModel BrandSqaureX = new BrandSquareModel();
        // GET: Event
        public ActionResult e()
        {
            return View();
        }

        public string getUpComing()
        {
            List<Event> events = new List<Event>();

            try
            {
                DateTime now = DateTime.Now;

                events = BrandSqaureX.Events.OrderByDescending(e => e.ID).Where(p => p.EventDate.StartsWith(now.Year + "_" + now.Month) || p.EventDate.StartsWith(now.Year + "_0" + now.Month)).Take(2).ToList();

                if(events == null) {
                    throw new Exception();
                }
            }
            catch (Exception ex)
            {
                return "No More Posts";
            }

            List<object> answer = new List<object>();
            foreach (var e in events)
            {
                answer.Add(
                    new
                        {
                            PosterName = e.Brand.BrandName,
                            PosterImage = e.Brand.BrandLogo,
                            PosterCategory = e.Brand.Category.CategoryName,
                            PostCategory = e.Category.CategoryName,
                            PostName = e.EventName,
                            PostImage = "Nothing",
                            PostPrice = e.EventDamage,
                            PostDate = e.EventDate,
                            PostViews = 0,
                            PostContact = new
                            {
                                Facebook = e.Brand.SocialMedia.FaceBookPage,
                                Twitter = e.Brand.SocialMedia.TwitterHandle,
                                Instagram = e.Brand.SocialMedia.InstagramLink
                            },
                            PostLineUp = e.EventLineUp.Split().ToArray(),
                            PostVenue = e.EventPlace
                        }
                    );
            }

            return JavaScriptX.convertString(answer.ToArray());
        }

        public string GetPost(int brandID, int index)
        {
            Event e = new Event();

            try
            {
                if (brandID == 0)
                {
                    e = BrandSqaureX.Events.OrderByDescending(p => p.ID).Skip(index).Take(1).First();
                }
                else
                {
                    e = BrandSqaureX.Events.OrderByDescending(p => p.ID).Where(b => b.Brand.BrandID == brandID).Skip(index).Take(1).First();
                }
            }
            catch (Exception ex)
            {
                return "No More Posts";
            }

            var answer = new
            {
                PosterName = e.Brand.BrandName,
                PosterImage = e.Brand.BrandLogo,
                PosterCategory = e.Brand.Category.CategoryName,
                PostCategory = e.Category.CategoryName,
                PostName = e.EventName,
                PostImage = "Nothing",
                PostPrice = e.EventDamage,
                PostDate = e.EventDate,
                PostViews = 0,
                PostContact = new
                {
                    Facebook = e.Brand.SocialMedia.FaceBookPage,
                    Twitter = e.Brand.SocialMedia.TwitterHandle,
                    Instagram = e.Brand.SocialMedia.InstagramLink
                },
                PostLineUp = e.EventLineUp.Split().ToArray(),
                PostVenue = e.EventPlace
            };

            return JavaScriptX.convertString(answer);
        }
    }
}