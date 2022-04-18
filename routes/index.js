const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const JWT = require("jsonwebtoken");

const StudentPractice = require("../models/student");
const userSignUp = require("../models/userSignUp");

// Router for User Sign Up purpose
router.post("/signUp", [ check("email", "Please provide Valid Email").isEmail(),
check("password", "Password should be more than 8 characters").isLength({min:8}) ],
  async (req, res) => {

    try {
      const errors  = validationResult(req)
      if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
      }

      let userEmail =await userSignUp.findOne({email: req.body.email});
      if(userEmail)
      {
        return res.send(`User with given email already exist`)
      }
      
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const data = new userSignUp({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        phoneNo: req.body.phoneNo,
      });
      await data.save();
      // res.status(200).json(dataToSave);
      let email=req.body.email;
      const token = await JWT.sign({email}, "bys65ld53nkr32lr28dr01akr29aw23", {expiresIn:3600000})
      res.json({token})
      res.send(`Registered Successfully`);
    } 
    catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
);

//Authentication Route
router.post("/login", async (req, res) => {
    
  try{
    const loginUser = await userSignUp.findOne({email: req.body.email});

    if(!loginUser)
    {
      return res.status(422).json({ message: "Invalid Credentials" });
    }
    const isMatch = await bcrypt.compare(req.body.password, loginUser.password);
    if(!isMatch)
    {
      return res.status(422).json({message: "Invalid Credentials"});
    }
    
    let email=loginUser.email;
    const token = await JWT.sign({email}, "bys65ld53nkr32lr28dr01akr29aw23", {expiresIn:3600000})
    res.json({token})
    //res.send("Login Successful");
  }
  catch(error) {
    res.status(500).send({message: "Internal Server error"});
  }
})

//Post Method
router.post("/saveDetails", async (req, res) => {
  console.log(req.body);
  // res.send('Post API');
  if (req.body._id) {
    const id = req.body._id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await StudentPractice.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.send(result);
  } else {
    const data = new StudentPractice({
      studentName: req.body.studentName,
      university: req.body.university,
    });
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  }
});

//Get All Methods
router.get("/getAll", async (req, res) => {
  // res.send('Get All API');
  try {
    const data = await StudentPractice.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Get by ID Method
router.get("/getOne/:id", async (req, res) => {
  // res.send('Get by ID API');
  // res.send(req.params.id);
  try {
    const data = await StudentPractice.findById(req.params.id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//Update by ID Method
/*router.patch("/update/:id", async (req, res) => {
  // res.send('Update by Id API');
  try {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    const result = await StudentPractice.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.send(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
*/
//Delete by ID Method
router.delete("/delete/:id", async (req, res) => {
  // res.send('Delete by ID API')
  try {
    const id = req.params.id;
    const data = await StudentPractice.findByIdAndDelete(id);
    res.send(`Document with ${data.studentName} has been deleted.`);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
