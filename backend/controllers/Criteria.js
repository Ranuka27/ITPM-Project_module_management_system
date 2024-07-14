const Criteria = require('../models/Criteria');
 
const getCriteria = async (req, res) => {
    try {
        const criteria = await Criteria.find();
        res.status(200).json(criteria);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// get criteria by assignment id
const getCriteriaByAssID = async (req, res) => {
    const id = req.params.assID;
    try {
        const criteria = await Criteria.find({ assID: id});
        res.status(200).json(criteria);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// create criteria for assignment using assignment id
const createCriteria = async (req, res) => {
    const { assID, criteria, marks } = req.body;

     // Calculate the sum of the marks
     const sum = marks.reduce((a, b) => a + b, 0);

        // Check if the sum is greater than 100
    if (sum !== 100) {
            return res.status(400).json({ message: 'The sum of the marks must be exactly 100.' });
        }
    const newCriteria = new Criteria({ assID, criteria, marks });

    try {
        await newCriteria.save();
        res.status(201).json(newCriteria);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

// // update criteria by id
const updateCriteria = async (req, res) => {
    const { assID, criteria, marks } = req.body;

    // Calculate the sum of the marks
    const sum = marks.reduce((a, b) => a + b, 0);

    // Check if the sum is exactly 100
    if (sum !== 100) {
        return res.status(400).json({ message: 'The sum of the marks must be exactly 100.' });
    }

    try {
        // Find the criteria and update it
        const updatedCriteria = await Criteria.findOneAndUpdate(
            { assID: assID },
            { $set: { criteria: criteria, marks: marks } },
            { new: true }
        );

        if (!updatedCriteria) {
            return res.status(404).json({ message: 'Criteria not found' });
        }

        res.status(200).json(updatedCriteria);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getCriteria,
    getCriteriaByAssID,
    createCriteria,
    updateCriteria
};


