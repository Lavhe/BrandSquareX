using System.Web;
using System.Web.Optimization;

namespace BrandSquare
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"
            ));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/BrandSquareScripts/mdb.min.js",
                      "~/Scripts/BrandSquareScripts/vue.js",
                      "~/Scripts/BrandSquareScripts/typer.js",
                      "~/Scripts/BrandSquareScripts/jquery_cropit.js",
                      "~/Scripts/BrandSquareScripts/BrandSquare.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/mdb.css",
                "~/Content/mdb_admin.css",
                "~/Content/site.css"));
        }
    }
}
