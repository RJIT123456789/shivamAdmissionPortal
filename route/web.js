const express = require('express');
const FrontController = require('../Controller/FrontController');
const CourseController = require('../Controller/CourseController');

const router = express.Router();
const CheckUserAuth = require('../Middleware/auth');
const islogin = require('../Middleware/isLogin');
const AdminController = require('../Controller/Admin.js/AdminController');


// router.get('/',islogin,FrontController.login)
router.get('/', FrontController.login)
router.get('/home', CheckUserAuth, FrontController.home)
router.get('/about', CheckUserAuth, FrontController.about)
router.get('/register', FrontController.register)
router.get('/contact', CheckUserAuth, FrontController.contact)
router.get('/course', CheckUserAuth, FrontController.course)
//--------------------------------------
router.post('/userinsert', FrontController.insertuser)
router.post('/courseinsect', CheckUserAuth, CourseController.courseinsect)
router.get('/coursedisplay', CheckUserAuth, CourseController.coursedisplay)
router.post('/verifylogin', islogin, FrontController.verifylogin)
router.get('/logout', CheckUserAuth, FrontController.logout)
router.get('/profile', CheckUserAuth, FrontController.profile)
router.post('/changepassword', CheckUserAuth, FrontController.changePassword)
router.post('/changeprofile', CheckUserAuth, FrontController.updateprofile)


// action
router.get('/view/:id', CheckUserAuth, CourseController.view)
router.get('/edit/:id', CheckUserAuth, CourseController.edit)
router.post('/courseupdate/:id', CheckUserAuth, CourseController.courseupdate)
router.get('/delete/:id', CheckUserAuth, CourseController.delete)


// admin controller
router.get('/admin/dashboard', CheckUserAuth, AdminController.home)
router.get('/admin/view/:id', CheckUserAuth, AdminController.view)
router.get('/delete/:id', CheckUserAuth, AdminController.delete)
router.post('/update_approve/:id', CheckUserAuth, AdminController.update_approve)





module.exports = router