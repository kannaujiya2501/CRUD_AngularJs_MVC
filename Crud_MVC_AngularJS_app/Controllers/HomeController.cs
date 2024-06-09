using Crud_MVC_AngularJS_app.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Crud_MVC_AngularJS_app.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Student()
        {
            return View();
        }
        public string InsertStudentRecord(Student Std)
        {
            using(DbEntity db = new DbEntity())
            {
                db.Students.Add(Std);
                db.SaveChanges();
                return "Student Added Successfully";
            }
        }
        public JsonResult GetAllStudent()
        {
            using (DbEntity db = new DbEntity())
            {
                DbEntity dbEntity = new DbEntity();
                var Allrecord = db.Students.ToList();
                return Json(Allrecord, JsonRequestBehavior.AllowGet);
               // return "Student Added Successfully";
            }

        }
        public string UpdateStudentRecord(Student Std)
        {
            using (DbEntity db = new DbEntity())
            {
                var record = db.Students.Where(x => x.Id == Std.Id).ToList().FirstOrDefault();
                record.Name= Std.Name;
                record.Age= Std.Age;
                record.Department= Std.Department;
                db.SaveChanges();
                return "Student record updated successfully";
            }

        }
        public string DeleteStudent(Student Std)
        {
            using (DbEntity db = new DbEntity())
            {
                var data = db.Students.Where(x => x.Id == Std.Id).ToList().FirstOrDefault();
                db.Students.Remove(data);

                db.SaveChanges();
                return "Student record deleted successfully";
            }

        }
    }
}