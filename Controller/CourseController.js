const CourseModel = require('../Model/Course');
const coursemodel = require('../Model/Course')

class CourseController {

    static courseinsect = async (req, res) => {
        try {
            const{_id} = req.user
            // console.log(req.body);
            // console.log(req.body)
            const data = new coursemodel({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.mobile,
                dob: req.body.dob,
                gender: req.body.gender,
                address: req.body.address,
                collage: req.body.collage,
                course: req.body.course,
                barnch: req.body.barnch,
                userid: _id,
            })
            await data.save()
            res.redirect('/coursedisplay')
        } catch (error) {
            console.log(error);
        }
    };

    static coursedisplay = async (req, res) => {
        try {
      const {name,image,_id} = req.user
            const data = await CourseModel.find({userid:_id})
            // console.log(data)
            res.render('course/display', { d: data, n:name, i : image })
        } catch (error) {
            console.log(error)
        }
    };

    static view = async (req, res) => {
        try {
      const {name,image,_id} = req.user
            const data = await CourseModel.findById(req.params.id)
            // console.log(req.params.id)
            res.render('course/view', { d: data,n:name,i:image })
        } catch (error) {
            console.log(error)
        }
    };

    static edit = async (req, res) => {
        try {
      const {name,image,_id} = req.user
            const data = await CourseModel.findById(req.params.id)
            // console.log(req.params.id)
            res.render('course/edit', { d: data, n:name ,i : image })
        } catch (error) {
            console.log(error)
        }
    };


    static courseupdate = async (req, res) => {
        try {
            
            const{name,image,_id} = req.user
            const data = await CourseModel.findByIdAndUpdate(req.params.id, {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.mobile,
                dob: req.body.dob,
                gender: req.body.gender,
                address: req.body.address,
                collage: req.body.collage,
                course: req.body.course,
                barnch: req.body.barnch,
                userid:_id
            })
            // res.redirect('/coursedisplay',{n:name,i:image})
            res.redirect('/coursedisplay')
        } catch (error) {
            console.log(error)
        }
    }

    static delete = async (req, res) => {
        try {
            const data = await CourseModel.findByIdAndDelete(req.params.id)
            res.redirect('/coursedisplay')
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = CourseController