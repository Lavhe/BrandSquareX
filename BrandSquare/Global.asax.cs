using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using BrandSquare.Classes;

namespace BrandSquare
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }


        protected void Session_Start(object sender, EventArgs args)
        {
            try
            {
                var brand = Request.Cookies.Get("BrandDetails");

                if (brand != null)
                {
                    var Name = brand[X.CookieBrandName];
                    var ID = brand[X.CookieBrandID];
                    var Logo = brand[X.CookieBrandLogo];

                    Session.Add(X.brandX, new { Name = Name, ID = ID, Logo = Logo });

                }
            }
            catch (Exception ex)
            {

            }
        }
    }
}
