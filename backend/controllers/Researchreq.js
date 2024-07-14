const Researchreq = require('../models/Researchreq');
const Groupreg = require('../models/Groupreg');



const getResearchreq = async (req, res) => {
    try {
        const researchreq = await Researchreq.find();
        res.status(200).json(researchreq);
        console.log(researchreq);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getResearchreqById = async (req, res) => {
    const id = req.params.id;
    try {
        const researchreq = await Researchreq.findById(id);
        res.status(200).json(researchreq);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const insertResearchreq = async (req, res) => {
    const { groupnumber, title, student1, student2, student3, student4, cosupervisor, supervisor, conferencename, issn, googlescholarlink, scopuslink, payment, registrationpdf } = req.body;
    
    const newResearchreq = new Researchreq({ groupnumber, title, student1, student2, student3, student4, cosupervisor, supervisor, conferencename, issn, googlescholarlink, scopuslink, payment, registrationpdf });
    
    try {
        await newResearchreq.save();
        res.status(200).json({ message: 'Research request created successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

const updateResearchreq = async (req, res) => {
    const id = req.params.id;
    try {
        await Researchreq.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json({ message: 'Research request updated successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteResearchreq = async (req, res) => {
    const id = req.params.id;
    try {
        await Researchreq.findByIdAndDelete(id);
        res.status(200).json({ message: 'Research request deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = {
    getResearchreq,
    insertResearchreq,
    updateResearchreq,
    deleteResearchreq,
    getResearchreqById
};
