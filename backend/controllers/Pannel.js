const Pannel = require('../models/Pannel');
const Users = require('../models/Users');


// get all pannel
const getPannel = async (req, res) => {
    try {
        const pannel = await Pannel.find();
        res.status(200).json(pannel);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

// create pannel
const createPannel = async (req, res) => {

    const pannelName = req.body.pannelName;
    
   //check member exist or not
    const member1 = await Users.findOne({ username: req.body.pannelMember1 });
    const member2 = await Users.findOne({ username: req.body.pannelMember2 });
    const member3 = await Users.findOne({ username: req.body.pannelMember3 });

    if (!member1 || !member2 || !member3) {
        return res.status(400).json({ message: 'Member not found' });
    }

    if (member1.role !== 'Examiner' || member2.role !== 'Examiner' || member3.role !== 'Examiner') {
        return res.status(400).json({ message: 'Only users with the role Examiner can be added to the panel' });
    }

    const newPannel = new Pannel({
        pannelName: pannelName,
        pannelMember1: req.body.pannelMember1,
        pannelMember2: req.body.pannelMember2,
        pannelMember3: req.body.pannelMember3,
        date: req.body.date,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    });


    try {
        await newPannel.save();

        //add pannel to user
        await Users.updateOne({ username: req.body.pannelMember1 }, { $push: { pannel: pannelName } });
        await Users.updateOne({ username: req.body.pannelMember2 }, { $push: { pannel: pannelName } });
        await Users.updateOne({ username: req.body.pannelMember3 }, { $push: { pannel: pannelName } });
        

        res.status(201).json(newPannel);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


//edit pannel
const editPannel = async (req, res) => {
    const pannelName = req.params.pannelName;
    const { pannelMember1, pannelMember2, pannelMember3 ,  date ,startTime,endTime} = req.body;

    //check member exist or not
    const member1 = await Users.findOne({ username: pannelMember1 });
    const member2 = await Users.findOne({ username: pannelMember2 });
    const member3 = await Users.findOne({ username: pannelMember3 });

    // if (!member1 || !member2 || !member3) {
    //     return res.status(400).json({ message: 'Member not found' });
    // }

    // if (member1.role !== 'Examiner' || member2.role !== 'Examiner' || member3.role !== 'Examiner') {
    //     return res.status(400).json({ message: 'Only users with the role Examiner can be added to the panel' });
    // }

    try {
        await Pannel.updateOne({ pannelName: pannelName }, { pannelMember1, pannelMember2, pannelMember3 , date ,startTime,endTime});
        await Users.updateOne({ username: pannelMember1 }, { $push: { pannel: pannelName } });
        await Users.updateOne({ username: pannelMember2 }, { $push: { pannel: pannelName } });
        await Users.updateOne({ username: pannelMember3 }, { $push: { pannel: pannelName } });

        res.status(200).json({ message: 'Panel updated successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

//delete pannel
const deletePannel = async (req, res) => {
    const pannelName = req.params.pannelName;

    try {
        await Pannel.deleteOne({ pannelName : pannelName });
        await Users.updateMany({pannel:pannelName},{$pull:{pannel:pannelName}});
        res.status(200).json({ message: 'Panel deleted successfully' });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const getPannelwithid = async (req, res) => {         
    try {
        const pannel = await Pannel.findById(req.params.id);
        res.status(200).json(pannel);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}




module.exports={
    getPannel,
    createPannel,
    editPannel,
    deletePannel,
    getPannelwithid
}