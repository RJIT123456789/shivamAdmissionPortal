const CourseModel = require('../../Model/Course')


class AdminController {


    static home = async(req,res) => {
        try{
            const {name,image,_id} = req.user
            const course = await CourseModel.find();
            // console.log(course)
            res.render('admin/dashboard',{n:name,i:image,c:course})
        }
        catch(error){
            console.log(error)
        }
    };



    
    static view = async (req, res) => {
        try {
      const {name,image,_id} = req.user
            const data = await CourseModel.findById(req.params.id)
            // console.log(req.params.id)
            res.render('admin/view', { c: data,n:name,i:image })
        } catch (error) {
            console.log(error)
        }
    };




    static delete = async (req, res) => {
        try {
            const data = await CourseModel.findByIdAndDelete(req.params.id)
            res.redirect('/admin/dashboard')
        } catch (error) {
            console.log(error)
        }
    };
    

    static update_approve = async (req, res) => {
        try {
        //    console.log(req.body)
        const result = await CourseModel.findByIdAndUpdate(req.params.id,{
            comment : req.body.comment,
            status : req.body.status
        })
        res.redirect('/admin/dashboard')
        } catch (error) {
            console.log(error)
        }
    };




}

module.exports = AdminController