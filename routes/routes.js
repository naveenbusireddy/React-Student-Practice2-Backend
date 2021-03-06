const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const { schema } = require('../model/model');

const StudentPractice = require('../model/model')

//Post Method
router.post('/saveDetails', async (req, res) => {
    console.log(req.body);
    // res.send('Post API');
    const data = new StudentPractice({
        studentName: req.body.studentName,
        university: req.body.university
    })

    try {
        const dataToSave = await data.save();
        // console.log(dataToSave);
        res.status(200).json(dataToSave);
    }
    catch(error) {
        res.status(400).json({message: error.message})
    }

})

//Get All Methods
router.get('/getAll', async (req, res) => {
    // res.send('Get All API');
    try {
        const data = await StudentPractice.find();
        res.json(data);
    }
    catch(error) {
        res.status(500).json({message: error.message})
    } 
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    // res.send('Get by ID API');
    // res.send(req.params.id);
    try {
        const data = await StudentPractice.findById(req.params.id);
        res.json(data);
    }
    catch(error) {
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    // res.send('Update by Id API');
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = {new: true};

        const result = await StudentPractice.findByIdAndUpdate(
            id, updatedData, options
        )
        res.send(result);
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    // res.send('Delete by ID API')
    try {
        const id = req.params.id;
        const data = await StudentPractice.findByIdAndDelete(id);
        res.send(`Document with ${data.studentName} has been deleted.`);
    }
    catch(error) {
        res.status(400).json({message: error.message});
    }
})

module.exports = router;