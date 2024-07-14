const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/upload', express.static(path.join(__dirname, '../upload')));
app.use('/Reupload', express.static(path.join(__dirname, '../Reupload')));

// Routes
const Assignment = require('./routes/Assignment');
const Criteria = require('./routes/Criteria');
const MarksheetGen = require('./routes/MarksheetGen');
const User = require('./routes/User');
const Otp = require('./OTP/Otp');
const GroupReg = require('./routes/Groupreg');
const Pannel = require('./routes/Pannel');
const Researchreq = require('./routes/Researchreq'); // Add this line
const reass = require('./routes/reportass');
const reportCriteria = require('./routes/reportCirteria');
const reportMarksheet = require('./routes/ReportMarksheetgen');

app.use(Assignment);
app.use(Criteria);
app.use(MarksheetGen);
app.use(User);
app.use(Otp);

app.use('/researchreq', Researchreq); // Add this line

app.use('/GroupReg',GroupReg);
app.use('/Pannel',Pannel);
app.use('/api', require('./routes/upload'))
//report
app.use('/reportass',reass);
app.use('/reportCriteria',reportCriteria);
app.use('/reportMarksheet',reportMarksheet);



// Connect to MongoDB
const URL = process.env.MONGODB_URL;
mongoose.connect(URL)
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.log("DB not connected", err);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
