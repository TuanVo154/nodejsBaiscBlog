const Course = require("../model/Course");
const { mongooseToObject } = require("../../util/mongoose");

class CourseController {
  //[GET] /Course/:slug
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("courses/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  //[GET] /Course/create
  create(req, res, next) {
    res.render("courses/create");
  }

  //[GET] /Course/_id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then((course) =>
        res.render("courses/edit", { course: mongooseToObject(course) })
      )
      .catch(next);
  }

  //[PUT] /Course/_id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored-courses"))
      .catch(next);
  }

  //[POST] /Course/store
  store(req, res, next) {
    const formData = req.body;
    formData.image =
      "https://img.youtube.com/vi/${req.body.videoID}/sddefault.jpg";
    const course = new Course(req.body);
    course
      .save()
      .then(() => res.redirect("/"))
      .catch((erro) => {});
    res.send("Course Save");
  }
}

module.exports = new CourseController();
