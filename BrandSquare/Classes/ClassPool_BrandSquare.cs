using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using BrandSquare.Models;

namespace BrandSquare.Classes
{
    public static class X
    {
        public static string CookieBrandLoggedIn = "egwrhetrgeqfwgwetmegwhrejtvegw";
        public static string CookieBrandLogo = "jghfcyvbinopmenjbfhgvuebvoin";
        public static string CookieBrandID = "fcvubiojugtfrdxrtrcygiojwgegw";
        public static string CookieBrandName = "hjghgdfxghjkhihgtytzvtfrervcx";
        public static string brandX = "gyrtefertfyuijomugyvtgrsfdgcgklj";
        public static string FullBrandX = "egrehtrjhergerhetjrythergwerhetjr";

        
        public static T GetBrand<T>(HttpSessionStateBase Session,bool Full = false) {
            T b;
            try
            {
                if (Full)
                {
                    b = (T)Session[X.FullBrandX];
                }
                else {
                    b = (T)Session[X.brandX];
                }

                if (b == null)
                {
                    throw new Exception();
                }
                return b;
            }
            catch (Exception ex) {
                return default(T);
            }
        }

        //This is method is used to format the dateTime in the way i want (*_*) very safe
        public static string FormatDateTime(DateTime datetime)
        {

            string answer = "";
            string year = datetime.Year.ToString();
            string month = datetime.Month.ToString();
            string day = datetime.Day.ToString();
            string hour = datetime.Hour.ToString();
            string minutes = datetime.Minute.ToString();

            answer = year + "_" + month + "_" + day + "_" + hour + "_" + minutes;

            return answer;
        }

        public static string TimeLeft(DateTime then, string posted)
        {
            List<int> datetime = new List<int>();

            posted.Split('_').ToList().ForEach((e) =>
            {
                datetime.Add(Convert.ToInt32(e));
            });

            var now = new { Year = datetime[0], Month = datetime[1], Day = datetime[2], Hour = datetime[3], Minute = datetime[4] };

            if ((now.Year - then.Year) > 1)
            {
                int years = (now.Year - then.Year);
                return years + " years left";
            }
            else if ((now.Year - then.Year) == 1)
            {
                return "1 year left";
            }
            else if ((now.Year - then.Year) == 0)
            {
                if ((now.Month - then.Month) > 1)
                {
                    int months = (now.Month - then.Month);
                    return months + " months left";
                }
                else if ((now.Month - then.Month) == 1)
                {
                    return "1 month left";
                }
                else if ((now.Month - then.Month) == 0)
                {
                    if (((now.Day - then.Day) / 7) > 1.0)
                    {
                        int weeks = (now.Day - then.Day) / 7;
                        return weeks + " weeks left";
                    }
                    else if (((now.Day - then.Day) / 7) == 1.0)
                    {
                        return "1 week left";
                    }
                    else if (((now.Day - then.Day) / 7) > 0.1)
                    {

                        if (((now.Day - then.Day) > 1))
                        {
                            int days = (now.Day - then.Day);
                            return days + " days left";
                        }
                        else if ((now.Day - then.Day) == 1)
                        {
                            return "tomorrow";
                        }
                        else if ((now.Day - then.Day) == 0)
                        {
                            if (((now.Hour - then.Hour) > 1))
                            {
                                int hours = (now.Hour - then.Hour);
                                return hours + " hrs left";
                            }
                            else if ((now.Hour - then.Hour) == 1)
                            {
                                return "1 hour left";
                            }
                            else if ((now.Hour - then.Hour) == 0)
                            {
                                if (((now.Minute - then.Minute) > 1))
                                {
                                    int mins = (now.Minute - then.Minute);
                                    return mins + " minutes left";
                                }
                                else if ((now.Minute - then.Minute) == 1)
                                {
                                    return "1 minute left";
                                }
                                else if ((now.Minute - then.Minute) == 0)
                                {
                                    return "Due now";
                                }
                            }
                        }
                    }
                }
            }

            return "<span class='red-text'>Due</span>";
        }

        public static string TimeAge(DateTime now, string posted)
        {
            List<int> datetime = new List<int>();

            posted.Split('_').ToList().ForEach((e) =>
            {
                datetime.Add(Convert.ToInt32(e));
            });

            var then = new { Year = datetime[0], Month = datetime[1], Day = datetime[2], Hour = datetime[3], Minute = datetime[4] };

            if ((now.Year - then.Year) > 10)
            {
                return "more than a decade ago";
            }

            if ((now.Year - then.Year) > 1)
            {
                int years = (now.Year - then.Year);
                return years + " years ago";
            }
            else if ((now.Year - then.Year) == 1)
            {
                return "a year ago";
            }

            if ((now.Month - then.Month) > 1)
            {
                int months = (now.Month - then.Month);
                return months + " months ago";
            }
            else if ((now.Month - then.Month) == 1)
            {
                return "a month ago";
            }

            if (((now.Day - then.Day) / 7) > 1.0)
            {
                int weeks = (now.Day - then.Day) / 7;
                return weeks + " weeks ago";
            }
            else if (((now.Day - then.Day) / 7) == 1.0)
            {
                return "a week ago";
            }

            if (((now.Day - then.Day) > 1))
            {
                int days = (now.Day - then.Day);
                return days + " days ago";
            }
            else if ((now.Day - then.Day) == 1)
            {
                return "yesterday";
            }

            if (((now.Hour - then.Hour) > 1))
            {
                int hours = (now.Hour - then.Hour);
                return hours + " hrs ago";
            }
            else if ((now.Hour - then.Hour) == 1)
            {
                return "an hour ago";
            }

            if (((now.Minute - then.Minute) > 1))
            {
                int mins = (now.Minute - then.Minute);
                return mins + " minutes ago";
            }
            else if ((now.Minute - then.Minute) == 1)
            {
                return "a minute ago";
            }

            return "just now";
        }
    }

    public static class JavaScriptX
    {
        public static string convertString(object value)
        {
            return new JavaScriptSerializer().Serialize(value);
        }
    }
}