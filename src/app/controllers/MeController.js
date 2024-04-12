const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose')

class MeController {
    // [GET] me/stored/courses
    async storedCourses(req, res, next) {
        let deletedCount
        await Course.countDocumentsDeleted()
            .then((count) => {
                deletedCount = count
            })
            .catch(next)

        let findCourses = Course.find({})
        if(req.query.hasOwnProperty('_sort')){
            findCourses = findCourses.sort({
                [req.query.column] : req.query.type
            })
        }

        await findCourses
            .then((courses) =>
                res.render('me/stored-courses', {
                    deletedCount,
                    courses: multipleMongooseToObject(courses),
                })
            )
            .catch(next)
    }

    // [GET] me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then((courses) =>
                res.render('me/trash-courses', {
                    courses: multipleMongooseToObject(courses),
                }),
            )
            .catch(next);
    }
}

module.exports = new MeController()
