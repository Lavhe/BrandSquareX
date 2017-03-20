using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using BrandSquare.Models;
using BrandSquare.Classes;

namespace BrandSquare.Controllers
{
    public class BrandController : Controller
    {
        private BrandSquareModel BrandSqaureX = new BrandSquareModel();

        public string changeDetails(string brandName, string Bio, string homeAddress)
        {
            try
            {
                var brandy = X.GetBrand<Brand>(Session, true);
                if (brandy != null)
                {
                    try
                    {
                        var brand = BrandSqaureX.Brands.Where(b => b.BrandID == brandy.BrandID).ToList()[0];
                        brand.BrandBio = Bio;
                        brand.BrandHomeAddress = homeAddress;

                        BrandSqaureX.SaveChanges();
                        Session.Add(X.FullBrandX, brand);

                    }
                    catch (Exception ex)
                    {
                        throw new Exception("Unable to save changes , Try again later!");
                    }

                    return "done";
                }

                throw new Exception("You are not logged in");
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
        }

        public string ChangePassword(string brandName, string Old, string New)
        {
            try
            {
                var brandy = X.GetBrand<Brand>(Session, true);
                if (brandy != null)
                {
                    if (brandy.BrandPassword == Old)
                    {
                        brandy.BrandPassword = New;
                        try
                        {

                            BrandSqaureX.Brands.Where(b => b.BrandID == brandy.BrandID).ToList()[0].BrandPassword = New;
                            BrandSqaureX.SaveChanges();
                            Session.Add(X.FullBrandX, brandy);
                        }
                        catch (Exception ex)
                        {
                            throw new Exception("Unable to save changes , Try again later!");
                        }

                        return "done";
                    }
                }

                throw new Exception("Incorrect current password");
            }
            catch (Exception ex)
            {
                return "Incorrect current password";
            }
        }

        public string IsLoggedInBrand(string brandName = "")
        {
            try
            {
                var brandy = X.GetBrand<Brand>(Session, true);
                if (brandy == null)
                {
                    //The person is not logged in for real
                    var brand = X.GetBrand<Object>(Session);

                    if (brand == null)
                    {
                        return "Error Not Logged in";
                    }
                    else
                    {
                        return JavaScriptX.convertString(new { brand, LoggedIN = false });
                    }
                }
                else
                {
                    var brand = X.GetBrand<Object>(Session);
                    return JavaScriptX.convertString(new { brand, LoggedIN = true });
                }
            }
            catch (Exception ex)
            {
                return "Error Not Logged in";
            }
        }

        public ActionResult edit(string brandName)
        {
            var brand = X.GetBrand<Brand>(Session, true);
            if (brand != null)
            {
                if (brand.BrandName == brandName)
                {
                    return View(brand);
                }
            }
            return RedirectToAction("Index");
        }

        public string FindBrand(string brandName)
        {
            try
            {
                var brand = BrandSqaureX.Brands.Where(b => b.BrandName.ToLower() == brandName.ToLower()).First();
                var answer = new
                {
                    ID = brand.BrandID,
                    Name = brand.BrandName,
                    Logo = brand.BrandLogo
                };

                Session.Add(X.brandX, new { Name = answer.Name, ID = answer.ID, Logo = answer.Logo });

                var cookie = new HttpCookie("BrandDetails");
                cookie.Values.Add(X.CookieBrandID, answer.ID.ToString());
                cookie.Values.Add(X.CookieBrandName, answer.Name);
                cookie.Values.Add(X.CookieBrandLogo, answer.Logo);

                cookie.Expires.AddDays(7);
                Response.Cookies.Set(cookie);

                return JavaScriptX.convertString(answer);

            }
            catch (Exception ex)
            {
                return "Error brand name does not exist";
            }
        }

        public string Login(string brandName, string password)
        {

            Brand brandX = null;
            try
            {
                brandX = BrandSqaureX.Brands.Where(b => b.BrandName == brandName && b.BrandPassword == password).First();
                Session.Add(X.brandX, new { Name = brandX.BrandName, ID = brandX.BrandID, Logo = brandX.BrandLogo });
                Session.Add(X.FullBrandX, brandX);

                return "Done";
            }
            catch (Exception ex)
            {
                return "Incorrect Log in details";
            }
        }

        public string LogOut()
        {
            Session[X.FullBrandX] = null;
            return "done";
        }

        public ActionResult b(string brandName)
        {
            Brand brand = null;
            try
            {
                brand = BrandSqaureX.Brands.Where(acc => acc.BrandName == brandName).First();
                var currentBrand = X.GetBrand<Brand>(Session, true);
                if (currentBrand != null)
                {
                    if (currentBrand.BrandID == brand.BrandID)
                    {
                        return View("b", brand);
                    }
                }
                throw new Exception();
            }
            catch (Exception ex)
            {
                return RedirectToAction("Index");
            }
        }

        public ActionResult All_Brands(string brandName)
        {
            //We are going to all the brands
            return View("All_Brands");
        }

        //The is the profile of the brand
        public ActionResult Index(string brandName)
        {
            Brand brand = null;
            try
            {
                brand = BrandSqaureX.Brands.Where(acc => acc.BrandName == brandName).First();
            }
            catch (Exception ex)
            {
                return RedirectToAction("Index", "Home");
            }
            return View("Brand_Index", brand);
        }

        public ActionResult Events(string brandName)
        {
            Brand brand = null;
            try
            {
                brand = BrandSqaureX.Brands.Where(acc => acc.BrandName == brandName).First();
            }
            catch (Exception ex)
            {
                return RedirectToAction("Index", "Home");
            }
            return View(brand);
        }

        /*
        public string LoadMorePendingPosts(int userID, int index, int maxPosts = 8)
        {

            if (maxPosts == 0)
            {
                return JavaScriptX.convertString("No more Posts");
            }
            List<Post> posts = new List<Post>();

            LaundromatX.PostHelpers.Where(h => h.HelperID == userID && h.HelperAccepted == "false").ToList().ForEach((e) =>
            {
                posts.Add(e.Post);
            });

            if ((maxPosts + index > posts.Count) && maxPosts > 0)
            {
                return LoadMorePendingPosts(userID, index, maxPosts - 1);
            }

            posts.Reverse();

            try
            {
                posts = posts.GetRange(index, maxPosts);
            }
            catch (Exception ex)
            {

                if ((maxPosts + index > posts.Count) && maxPosts > 0)
                {
                    return LoadMorePosts(userID, index, maxPosts - 1);
                }
            }

            List<string> card = new List<string>();

            foreach (var p in posts)
            {
                card.Add(X.ConvertPost(p, Session, Url));
            }

            return JavaScriptX.convertString(card.ToArray());

        }

        public string LoadMorePosts(int userID, int index, int maxPosts = 8)
        {

            if (maxPosts == 0)
            {
                return JavaScriptX.convertString("No more Posts");
            }

            List<Post> posts = LaundromatX.Posts.Where(p => p.UserID == userID && p.Status.Contains("Waiting for help")).ToList();

            if ((maxPosts + index > posts.Count) && maxPosts > 0)
            {
                return LoadMorePosts(userID, index, maxPosts - 1);
            }

            posts.Reverse();

            try
            {
                posts = posts.GetRange(index, maxPosts);
            }
            catch (Exception ex)
            {

                if ((maxPosts + index > posts.Count) && maxPosts > 0)
                {
                    return LoadMorePosts(userID, index, maxPosts - 1);
                }
            }

            List<string> card = new List<string>();

            foreach (var p in posts)
            {
                card.Add(X.ConvertPost(p, Session, Url));
            }

            return JavaScriptX.convertString(card.ToArray());

        }
    Page for user to edit his profile
        public ActionResult Profile()
        {
            //Insure that the user is logged in
            if (!Convert.ToBoolean(Session[X.isActivatedX]))
            {
                //If the user is not logged in we redirect him to the home page
                return RedirectToAction("Index", "Home");
            }
            var user = X.GetUser(Session);
            return View(user);
        }

        [HttpPost]
        public string EditAddCompany(int UserID, string CompanyName, string CompanyAddress, string CompanyWapsite, string CompanyAbout, string CompanyTell)
        {
            //TODO : Add the images of the company
            try
            {
                LaundromatX.Companies.Add(new Company() { OwnerID = UserID, CompanyAbout = CompanyAddress + " __ " + CompanyAbout, CompanyName = CompanyName, CompanyTell = CompanyTell, CompanyWebsite = CompanyWapsite });
                LaundromatX.SaveChanges();
                return "Company Added";
            }
            catch (Exception ex)
            {
                return "Error " + ex.Message;
            }
        }

        //Gets the info from the Edit Profile page and store on the database
        [HttpPost]
        public string EditPersonal(string UserID, string Name, string Surname, string Email, string Age, string Desc)
        {
            int userid = Convert.ToInt32(UserID);

            var current = LaundromatX.Accounts.Where(acc => acc.AccountID == userid).First();

            current.Name = Name;
            current.Surname = Surname;

            if (LaundromatX.Accounts.Where(acc => acc.Name == current.Name && acc.Surname == current.Surname).ToList().Count > 1)
            {
                //The user is using a used pair of name and surname
                return "A user with the same name and surname already exist in our database";
            }

            current.Email = Email;
            current.Age = Convert.ToInt32(Age);
            current.Description = Desc;

            LaundromatX.Accounts.Where(acc => acc.AccountID == userid).ToList().FindAll(acc => acc.AccountID == userid)[0] = current;
            LaundromatX.SaveChanges();

            return LogIn(current.Pass, current.Contact);
        }

        [HttpPost]
        public ActionResult ChangeProfilePic(HttpPostedFileBase EditProfilePic)
        {
            Account currentUser = null;
            try
            {
                if (EditProfilePic != null && EditProfilePic.ContentLength > 0)
                {
                    currentUser = ((Account)Session[X.UserX]);
                    var ext = Path.GetExtension(EditProfilePic.FileName);
                    string ProfilePicName = $"{currentUser.Name}_ProfilePic_{ currentUser.AccountID}{ext}";
                    var theImage = Server.MapPath("~/App_Data/ProfilePics/" + ProfilePicName);

                    EditProfilePic.SaveAs(theImage);

                    LaundromatX.Accounts.Where(acc => acc.AccountID == currentUser.AccountID).ToList()[0].ProfilePic = "/LaundromatX/App_Data/ProfilePics/" + ProfilePicName;
                    LaundromatX.SaveChanges();

                    ((Account)Session[X.UserX]).ProfilePic = "/LaundromatX/App_Data/ProfilePics/" + ProfilePicName;

                }
            }
            catch (Exception ex)
            {

                string path = "/LaundromatX/App_Data/ProfilePics/DefaultAvatar.png";

                if (currentUser == null)
                {
                    return RedirectToAction("Index", "Home", new { Errormessage = "You are not logged in" });
                }

                LaundromatX.Accounts.Where(acc => acc.AccountID == currentUser.AccountID).ToList()[0].ProfilePic = path;
                LaundromatX.SaveChanges();

                ((Account)Session[X.UserX]).ProfilePic = path;

                return RedirectToAction("Index", "Home", new { Errormessage = ex.Message });

            }
            return RedirectToAction("Index", "Home", new { Errormessage = "You are not logged in" });
        }

        // Allow an existing user to log in
        public string LogIn(string pass, int num)
        {
            //It returns a string that acts as the Error message 'If it returns "Done" then we have succeded in everything' 
            Account userX = null;
            try
            {
                userX = LaundromatX.Accounts.ToList().Find(acc => (acc.Contact == num && acc.Pass == pass));
                if (userX == null)
                {
                    throw new Exception();
                }
            }
            catch (Exception ex)
            {
                return "Incorrect Log in details";
            }

            Session.Add(X.UserX, userX);
            Session.Add(X.isActivatedX, true);

            var cookie = new HttpCookie("UserDetails");
            cookie.Values.Add(X.CookieuserID, userX.AccountID.ToString());
            cookie.Values.Add(X.CookieIsActive, "true");

            cookie.Expires.AddYears(5);
            Response.Cookies.Set(cookie);

            return "Done";
        }

        public ActionResult Register()
        {
            if (Convert.ToBoolean(Session[X.isActivatedX]))
            {
                return RedirectToAction("Index", "Home");
            }
            return View();
        }

        //This gets called by JQuery to Allow the user to logout
        [WebMethod]
        [ScriptMethod(ResponseFormat = ResponseFormat.Json)]
        public ActionResult LogOutUser()
        {
            try
            {
                Session[X.UserX] = null;
                Session[X.isActivatedX] = false;

                Response.Cookies.Get("UserDetails").Values[X.CookieIsActive] = "false";

            }
            catch (Exception ex)
            {

            }

            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public string SetLocation(string lat, string lon, string Which, string Country = "None", string Province = "None", string City_TownName = "None", string LocalName = "None", string StreetName = "None", string HouseNumber = "None")
        {

            //Try it coz its safe
            try
            {
                //See if the user is logged in for real
                if (X.GetUser(Session) != null)
                {
                    int UserID = X.GetUser(Session).AccountID;
                    //Create a location and save it based on the Latitude and longitude co-ordinates
                    var location = new LocationX() { LocationLat = lat, LocationLon = lon, LocationCountry = Country, LocationHouseShopNumber = HouseNumber, LocationLocalName = LocalName, LocationProvince = Province, LocationStreetName = StreetName, LocationTownCity = City_TownName };

                    if (Which.StartsWith("current"))
                    {
                        LaundromatX.Accounts.Where(acc => acc.AccountID == UserID).ToList()[0].LocationX = location;
                    }
                    else if (Which.StartsWith("home"))
                    {
                        LaundromatX.Accounts.Where(acc => acc.AccountID == UserID).ToList()[0].LocationX1 = location;
                    }
                    else if (Which.StartsWith("work"))
                    {
                        LaundromatX.Accounts.Where(acc => acc.AccountID == UserID).ToList()[0].LocationX2 = location;
                    }
                    // TODO : First check if the user has location

                    //Save all the changes
                    LaundromatX.SaveChanges();

                }
                else
                {
                    //If the user is not Activated throw an exception
                    throw new Exception("Error You are not Logged in");
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

            return "Done";

        }

        public string ValidateRegistration(string contact, string name, string surname, string password, string email, string gender)
        {
            int num = Convert.ToInt32(contact);

            //Check if the Contact already exists and if the Name and Surname are taken
            if (LaundromatX.Accounts.Where(acc => acc.Contact == num).ToList().Count > 0)
            {
                return "A user with 0" + num + " already exists";
            }

            if (LaundromatX.Accounts.Where(acc => (acc.Name == name && acc.Surname == surname)).ToList().Count > 0)
            {
                return "You already exist in our database";
            }
            //If the user does not exist Then add the user to the database
            Account person = new Account();
            person.Contact = num;
            person.Name = name;
            person.Surname = surname;
            person.Pass = password;
            person.Gender = gender;
            person.DateCreated = X.FormatDateTime(DateTime.Now);
            person.ProfilePic = "/LaundromatX/App_Data/ProfilePics/DefaultAvatar.png";

            if (email.ToLower() != "noemail")
            {
                //The user gave us the email address
                person.Email = email;
            }
            LaundromatX.Accounts.Add(person);
            LaundromatX.SaveChanges();

            //Call the LogIn(contact,password) to activate the user and He must not be an ADMIN
            if (LogIn(password, num) != "Done")
            {
                //Managed to log in the user
                return "Something went wrong while trying to Log You in";
            }
            return "Done";
        }
        */
    }
}