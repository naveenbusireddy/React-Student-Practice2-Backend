const express = require("express");
const { default: mongoose } = require("mongoose");
const router = express.Router();

const StudentPractice = require("../models/student");

const users = require("../models/userSignUp");

router.post("/userSignUp", async (req, res) => {
    const data = new users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phoneNo: req.body.phoneNo
    });
    
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave);
        res.send(result);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
})
//Post Method
router.post("/saveDetails", async (req, res) => {
  console.log(req.body);
  // res.send('Post API');
  if(req.body._id){
    const id = req.body._id;
    const updatedData = req.body;
    const options = { new: true };
    const result = await StudentPractice.findByIdAndUpdate(
      id,
      updatedData,
      options
    );
    res.send(result);
  }else{
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
