const Groupreg = require('../models/Groupreg');
const Assignment = require('../models/Assignment');
const Pannel = require('../models/Pannel');
const User = require('../models/Users');



const getGroupreg = async (req, res) => {
    try {
        const groupreg = await Groupreg.find();
        res.status(200).json(groupreg);
        console.log(groupreg);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


//get grup by id
const getGroupregById = async (req, res) => {
    const id = req.params.id;
    try {
        const groupreg = await Groupreg.findById(id);
        res.status(200).json(groupreg);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getGroupregByName = async (req, res) => {
    const GroupName = req.params.GroupName;
    try {
        const groupreg = await Groupreg.findOne({ GroupName: GroupName });
        res.status(200).json(groupreg);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


const insertGroupreg = async (req, res) => {
    const {AssTitle,Leader,Contact,Member1,Member2,Member3,name,email,batch,specialization,researcharea,supervisor,cosupervisor} = req.body;

    //autogen GroupName
    const currentYear = new Date().getFullYear();
    const GroupName = currentYear + '_' + specialization + '_' + batch + Math.floor(Math.random() * 1000);
    
    //check if the group already exists
    const group = await Groupreg.findOne({ GroupName: GroupName });
       if (group) {
           return res.status(400).json({ message: 'Group already exists' });
       }

    //ckeck if the leader and members are already in a group
    const leaderInGroup = await Groupreg.findOne({ $or: [{ Leader: Leader }, { Member1: Leader }, { Member2: Leader }, { Member3: Leader }] });
    if (leaderInGroup) {
      return res.status(400).json({ message: 'Leader already in a group' });
    }
    const member1InGroup = await Groupreg.findOne({ $or: [{ Leader: Member1 }, { Member1: Member1 }, { Member2: Member1 }, { Member3: Member1 }] });
    if (member1InGroup) {
      return res.status(400).json({ message: 'Member1 already in a group' });
    }
    const member2InGroup = await Groupreg.findOne({ $or: [{ Leader: Member2 }, { Member1: Member2 }, { Member2: Member2 }, { Member3: Member2 }] });
    if (member2InGroup) {
      return res.status(400).json({ message: 'Member2 already in a group' });
    }
    const member3InGroup = await Groupreg.findOne({ $or: [{ Leader: Member3 }, { Member1: Member3 }, { Member2: Member3 }, { Member3: Member3 }] });
    if (member3InGroup) {
      return res.status(400).json({ message: 'Member3 already in a group' });
    }
       
       //check assignment title validity
       // const assignment = await Assignment.findOne({  assID: AssTitle });
       // if (!assignment) {
       //     return res.status(400).json({ message: 'Invalid assignment title' });
       // }

       //only 10 groups can be created same assignment
    //    const groupcount = await Groupreg.find({ AssTitle: AssTitle });
    //    if (groupcount.length >= 10) {
    //        return res.status(400).json({ message: 'Group limit reached' });
    //    }

       const newGroupreg = new Groupreg({ AssTitle,GroupName,Leader,Contact,Member1,Member2,Member3,name,email,batch,specialization,researcharea,supervisor,cosupervisor });
       try {
           await newGroupreg.save();
           res.status(200).json({ message: 'Group created successfully' });
       } catch (error) {
           res.status(409).json({ message: error.message });
       }


}


const updateGroupreg = async (req, res) => {
    const id = req.params.id;
    try {
        await Groupreg.findByIdAndUpdate(id, 
            req.body,
            { new: true }
        );
        res.status(200).json({ message: 'Group updated successfully' });
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

//assign pannel to group
const assignPannel = async (req,res)=>{
    const id = req.body.id;
    const pannel = req.body.pannel;
    try {

        //check if the pannel exists
        const pannelExist = await Pannel.findOne({ pannelName: pannel });
        if (!pannelExist) {
            return res.status(400).json({ message: 'Pannel not found' });
        }

        //check if the pannel is already assigned to a group
        const group = await Groupreg.findOne({ Pannel: pannel });
        if (group) {
            return res.status(400).json({ message: 'Pannel already assigned to a group' });
        }

        //get group name
        const groupData = await Groupreg.findById(id);
        const GroupName = groupData.GroupName;

        //update user model grop name in pannel memebrs model
        const pannelData = await Pannel.findOne({ pannelName: pannel });
 
        await User.updateOne({username: pannelData.pannelMember1}, {$push: {projectgroup:GroupName}});
        await User.updateOne({username: pannelData.pannelMember2}, {$push: { projectgroup: GroupName}});
        await User.updateOne({username: pannelData.pannelMember3}, {$push: { projectgroup: GroupName}});

  


        await Groupreg.findByIdAndUpdate(id, {Pannel:pannel},
        {new:true}
        );
        res.status(200).json({message:'Pannel assigned successfully'});

    } catch (error) {
        res.status(404).json({message:error.message});
    
    }
}

//delete group
const deleteGroupreg = async (req, res) => {
    const id = req.params.id;
    try {
        await Groupreg.findByIdAndDelete(id);
        res.status(200).json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}



module.exports = {
    getGroupreg,
    insertGroupreg,
    updateGroupreg,
    assignPannel,
    getGroupregById,
    getGroupregByName,
    deleteGroupreg
};



