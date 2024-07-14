const MarksheetGen = require('../models/ReportMarksheetgen');
const Criteria = require('../models/reportCriteria');
const Assignment = require('../models/reportass');


// get all marksheet
const getMarksheet = async (req, res) => {
    try {
        const marksheet = await MarksheetGen.find();
        res.status(200).json(marksheet);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


// create marksheet for assignment using assignment id
const createMarksheet = async (req, res) => {
    
    const assID = req.body.assID;
    const criteria = await Criteria.find({ assID: assID });

    const data = criteria[0].criteria;
    const marks = criteria[0].marks;
    console.log(data);
    const assignment = await Assignment.findOne({assID: assID});
    console.log(assignment.weightage);
    //real marks create criteral mask * real marks
    const students = req.body.Student.map((student, i) => {
        const RealMarks = [];
        let total = 0; // Change const to let
         
        for (let j = 0; j < data.length; j++) {
            const  realMark = marks[j] * student.AddMarks[j]/100;
            RealMarks.push(realMark);
            total = RealMarks.reduce((a,b)=>a+b,0) * assignment.weightage/100;
        }
        

       
        return {
            ITNumber: student.ITNumber,
            criteria: criteria[0].criteria,
            AddMarks: student.AddMarks,
           
            RealMarks: RealMarks,
            TotalMarks: total
            
        };
    });



    const newMarksheet = new MarksheetGen({
        assID: assID,
        GroupName: req.body.GroupName,
        feedback: req.body.feedback,
        Student: students
    });

    try {
        await newMarksheet.save();
        res.status(201).json(newMarksheet);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

// marksheet approvel
const marksheetApprovel = async (req, res) => {
    const id = req.params.id;
    try {
        await MarksheetGen.findByIdAndUpdate(id,
            { status: 1 },
            { new: true }
        );
        res.status(200).json({ message: 'Marksheet updated successfully' });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//marksheet edit
const updateMarksheet = async (req, res) => {
    const { assID, ITNumber, AddMarks } = req.body;

    const criteria = await Criteria.find({ assID: assID });
    const data = criteria[0].criteria;
    const marks = criteria[0].marks;

    // Calculate new real marks
    const RealMarks = [];
    for (let j = 0; j < data.length; j++) {
        RealMarks.push(marks[j] * AddMarks[j]/100);
    }

    try {
        // Find the marksheet and update the student's marks
        const updatedMarksheet = await MarksheetGen.findOneAndUpdate(
            { assID: assID, 'Student.ITNumber': ITNumber },
            { $set: { 'Student.$.AddMarks': AddMarks, 'Student.$.RealMarks': RealMarks } },
            { new: true }
        );

        if (!updatedMarksheet) {
            return res.status(404).json({ message: 'Marksheet not found' });
        }

        res.status(200).json(updatedMarksheet);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// 
const sum = async (req, res) => {
    try {
        const students = await MarksheetGen.find();
        const sums = {};

        for(let i = 0; i < students.length; i++) {
            students[i].Student.forEach(student => {
                if (!sums[student.ITNumber]) {
                    sums[student.ITNumber] = 0;
                }
                sums[student.ITNumber] += student.TotalMarks;
            });
        }

        return res.status(200).json(sums);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
 

module.exports = {
    getMarksheet,
    createMarksheet,
    marksheetApprovel,
    updateMarksheet,
    sum
};