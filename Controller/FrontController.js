const UserModal = require("../Model/user");
const COurseModel = require('../Model/Course')

const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary').v2;
const jwt = require('jsonwebtoken');
const CourseModel = require("../Model/Course");
cloudinary.config({
  cloud_name: 'dywtkd0yd',
  api_key: '167237687329664',
  api_secret: 'fL8UMO5HJjCKJfazC9RmT5u4FX4',
  secure: false,
})

class FrontController {
  static login = async (req, res) => {
    try {
      res.render("login", { message: req.flash('error'), msg: req.flash('success') });
    } catch (error) {
      console.log(error);
    }
  };

  static home = async (req, res) => {
    try {
      const { name, image, _id, email } = req.user
      const btech = await CourseModel.findOne({ userid: _id, course: 'Btech' })
      const bca = await CourseModel.findOne({ userid: _id, course: 'bca' })
      const mca = await CourseModel.findOne({ userid: _id, course: 'mca' })
      res.render("home", { n: name, i: image, e: email, btech: btech, bca: bca, mca: mca });
      // res.render('home')
      res.render('home', { n: name, i: image, e: email, btech: btech, bca: bca, mca: mca })
    } catch (error) {
      console.log(error);
      // <a class="nav-link text-light" href="#"><%= n %></a> 
      // <img src="<%= i.url %>" alt="mdo" width="40" height="40"
      //                                 class="rounded-circle"> 

    }
  };

  static about = async (req, res) => {
    try {
      const { name, image, _id } = req.user
      res.render("about", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      const { name, image, _id } = req.user
      res.render("contact", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static course = async (req, res) => {
    try {
      const { name, image, _id } = req.user
      res.render("course", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      res.render("register", { message: req.flash('error') });
    } catch (error) {
      console.log(error);
    }
  };


  static insertuser = async (req, res) => {
    try {
      //console.log(req.files.images)
      const file = req.files.image;
      //image upload cloudinary
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      // console.log(imageUpload);
      // console.log("hello gwalior");
      // console.log(req.body);
      const { name, email, password, cpassword } = req.body;
      const user = await UserModal.findOne({ email: email });
      if (user) {
        req.flash("error", "Email Already exists");
        res.redirect("/register");
        //console.log(user);
      } else {
        if (name && email && password && cpassword) {
          if (password == cpassword) {
            const hashPassword = await bcrypt.hash(password, 10);
            const rslt = new UserModal({
              name: name,
              email: email,
              password: hashPassword,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url,
              },
            });
            await rslt.save();
            req.flash("Success", "Register success! plz Login");
            res.redirect("/"); //url
          } else {
            req.flash("error", "Password not Match.");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All fields are required.");
          res.redirect("/register");
        }
      }
      //url
    } catch (error) {
      console.log(error);
    }
  };



  static verifylogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body
      if (email && password) {
        const user = await UserModal.findOne({ email: email })
        if (user != null) {
          const ismatched = await bcrypt.compare(password, user.password)
          if (ismatched) {
            // multiple login
            if (user.role == 'student') {
              // generate token
              const token = jwt.sign({ id: user._id }, 'Shivamsinghchauhan799')
              // console.log(token)
              res.cookie('token', token);
              res.redirect('/home')
            }
            if (user.role == 'admin') {
              // generate token
              const token = jwt.sign({ id: user._id }, 'Shivamsinghchauhan799')
              // console.log(token)
              res.cookie('token', token);
              res.redirect('/admin/dashboard')
            }

          } else {
            req.flash('error', 'email and password is not valid')
            res.redirect('/')
          }
        } else {
          req.flash('error', 'you are not a register user')
          res.redirect('/')
        }
      } else {
        req.flash('error', 'All field are required')
        res.redirect('/')
      }
    } catch (error) {
      console.log(error)
    }
  }

  static logout = async (req, res) => {
    try {
      res.clearCookie('token')
      res.redirect('/')
    } catch (error) {
      console.log(error);
    }
  }

  static profile = async (req, res) => {
    try {
      const { name, image, _id, email } = req.user
      res.render('profile', { n: name, i: image, e: email })
    } catch (error) {
      console.log(error);
    }
  }

  static changePassword = async (req, res) => {
    try {
      const { name, image, _id, email } = req.user
      const { oldPassword, newPassword, CPassword } = req.body
      if (oldPassword && newPassword && CPassword) {
        const user = await UserModal.findById(_id)
        const ismatched = await bcrypt.compare(oldPassword, user.password)
        if (!ismatched) {
          req.flash('error', 'old password is not match')
          res.redirect('/profile')
        } else {
          if (newPassword !== CPassword) {
            req.flash('error', 'password and confirm password is not match')
            res.redirect('/profile')
          }
          else {
            const newHashPassword = await bcrypt.hash(newPassword, 10)
            await UserModal.findByIdAndUpdate(_id, {
              $set: { password: newHashPassword },
            });
            req.flash('success', 'password change successfully')
            res.redirect('/profile')
          }
        }
      } else {
        req.flash('error', 'All field are required')
        res.redirect('/profile')
      }
      // console.log(req.body)
    } catch (error) {
      console.log(error);
    }
  }

  static updateprofile = async (req, res) => {
    try {
      // const { name, image, _id, email, mob } = req.body
      // const transformname = name.toUpperCase()
      // res.render('profile', { n: transformname, i: image.url, m: mob, e: email })
      // console.log(req.files.image)
      if (req.files) {
        const user = await UserModal.findById(req.user.id);
        const image_id = user.image.public_id;
        await cloudinary.uploader.destroy(image_id);

        const file = req.file.image;
        const myimage = await cloudinary.uploader.upload(file.tempFilePath, {
          folder: "userprofile",
        });
        let data = {
          name: req.body.name,
          email: req.body.email,
          image: {
            public_id: myimage.public_id,
            url: myimage.secure_url,
          },
        };

      }
      else {
        var data = {
          name: req.body.name,
          email: req.body.email,

        };
      }
      const updateprofile = await UserModal.findByIdAndUpdate(req.user.id, data);
      res.redirect('/profile')
    } catch (error) {
      console.log(error);
    }
  }

  //   static updateprofile = async (req, res) => {
  //     try {
  //         const { name, email, mob } = req.body;
  //         const transformname = name ? name.toUpperCase() : '';

  //         let data = {
  //             name: req.body.name,
  //             email: req.body.email
  //         };

  //         // Check if a file/image is uploaded
  //         if (req.file) {
  //             const user = await UserModal.findById(req.user.id);

  //             // Delete old image if it exists
  //             if (user.image && user.image.public_id) {
  //                 await cloudinary.uploader.destroy(user.image.public_id);
  //             }

  //             // Upload new image
  //             const myimage = await cloudinary.uploader.upload(req.file.tempFilePath, {
  //                 folder: "userprofile",
  //             });

  //             // Add new image info to data
  //             data.image = {
  //                 public_id: myimage.public_id,
  //                 url: myimage.secure_url,
  //             };
  //         }

  //         // Update user profile in the database
  //         const updatedProfile = await UserModal.findByIdAndUpdate(req.user.id, data, { new: true });

  //         // Render the profile page with the updated data
  //         res.render('profile', {
  //             n: transformname,
  //             i: updatedProfile.image ? updatedProfile.image.url : null,
  //             m: mob || '', // Handle undefined mob value
  //             e: email
  //         });
  //     } catch (error) {
  //         console.log(error);
  //         res.status(500).send('An error occurred while updating the profile');
  //     }
  // };


}

module.exports = FrontController;
