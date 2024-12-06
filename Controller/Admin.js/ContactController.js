const ContectModel = require("../../Model/Contact");

class ContactContraller {


    static contactinsect = async (req, res) => {
        try {
            // const { _id } = req.user
            // console.log(req.body);
            // console.log(req.body)
            const contact = new ContectModel({
                First_name: req.body.First_name,
                Last_Name: req.body.Last_Name,
                User_Name: req.body.User_Name,
                Email: req.body.Email,
                Address_1: req.body.Address_1,
                Address_2: req.body.Address_2,
                Country: req.body.Country,
                State: req.body.State,
            })
            await contact.save()
            res.redirect('/contact')
        } catch (error) {
            console.log(error);
        }
    };


    static contactDisplay = async (req, res) => {
        try {
            const contact = await ContectModel.find()
            res.render('admin/contactDisplay',{c:contact})
        } catch (error) {
            console.log(error);
        }
    };



}
module.exports = ContactContraller