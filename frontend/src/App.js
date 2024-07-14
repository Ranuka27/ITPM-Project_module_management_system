import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Marksheet from './Marksheet/Marksheet';
import Insertass from './Assup/Insertass';
import Insert from './Assup/Insert';
import EditAss from './Assup/AssEdit';
import UpdateCriteria from './Assup/UpdateCriteria';
import LoginPage from './Login/login';
import Register from './Login/Register';
import Admin from './Login/Admin';
import Navbar from './Home/NavBar';
import Footer from './Home/Footer';
import Home from './Home/Home';
import Stlogin from './Login/Stlogin';
import Registration from './ProjectGroup/Registration';
import ViewMarksheet from './Marksheet/ViewMarksheet';
import UserProfile from './Login/UserProfile';
import PannelAssign from './ProjectGroup/PannelAssign';
import ApprovedMarks from './Marksheet/ApprovedMarks';
import PannelCreate from './ProjectGroup/PannelCreate';
import Assdetails from './Assup/AssDetails';
import Groupedit from './ProjectGroup/Groupedit';
import GroupEdit2 from './ProjectGroup/GroupEdit2';
import Reports from './Reports/Reports';
import InsertReport from './Reports/InsertReport';
import ReportDetails from './Reports/ReportDetails';
import Panels from './ProjectGroup/Panels';
import MarksheetReport from './Marksheet/MarksheetReport';
import Fullmarksheet from './Marksheet/fullmarksheet';
import FullmarksheetR from './Marksheet/fullmarksheetR';

import Researchreq from './Researchpublication/Researchreq';
import Reserachreqtable from './Researchpublication/Reserachreqtable';

import MarksheetApproval from './Marksheet/MarksheetApproval';


//report mark add sheet
import ReportApprovedMarks from './MarksheetR/ApprovedMarks';
import ReportViewMarksheet from './MarksheetR/ViewMarksheet';
import Reportmarksheet from './MarksheetR/Marksheet';

import Panneledit from './ProjectGroup/PanelEdit'

import Full from './Marksheet/fullmarksheet';
import FullR from './Marksheet/fullmarksheetR';
import Registerst from './Login/Registerst';

function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const [role,setrole] = React.useState('');
  const [tokenExists, setTokenExists] = React.useState(false);
  
  React.useEffect(() => {
    const Token = localStorage.getItem('token');

    if (Token) {
      const payloadPart = Token.split('.')[1];
      const payload = JSON.parse(atob(payloadPart));
      const role = payload.role;

      console.log(role);
      
      setrole(role);
      setTokenExists(true);
    } else if (location.pathname !== '/stlogin' && location.pathname !== '/registerst') {
      navigate('/');
    }
  }, []);

  return (
    <>
      {location.pathname !== '/' && location.pathname !== '/stlogin' && location.pathname !== '/registerst' && <Navbar />}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/stlogin" element={<Stlogin />} />
         <Route path="/registerst" element={<Registerst />} />
        {tokenExists && (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/insertAss" element={<Insertass />} />
            <Route path="/AssInsert" element={<Insert />} />
            <Route path="/editAss/:id" element={<EditAss/>} /> 
            <Route path="/updateCriteria/:assID" element={<UpdateCriteria />} /> 
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/marksheet" element={<Marksheet />} />   
            {role === 'user' && <Route path="/registration" element={<Registration />} />} 
            <Route path="/viewmarksheet" element={<ViewMarksheet />} />
            <Route path="/userprofile" element={<UserProfile />} />
            <Route path="/approvedmarks" element={<ApprovedMarks />} />
            <Route path="/pannelassign" element={<PannelAssign />} />
            <Route path="/pannelcreate" element={<PannelCreate />} />
            <Route path="/assdetails/:id" element={<Assdetails />} />
            <Route path="/groupedit" element={<Groupedit />} />
            <Route path="/groupedit2/:id" element={<GroupEdit2 />} />
            <Route path="/report" element={<Reports />} />
            <Route path="/insertReport" element={<InsertReport />} />
            <Route path="/reportdetails/:id" element={<ReportDetails />} />
            <Route path="/panels" element={<Panels />} />
            <Route path="/marksheetreport" element={<MarksheetReport />} />
            <Route path="/fullmarksheet" element={<Fullmarksheet />} />
            <Route path="/fullmarksheetR" element={<FullmarksheetR />} />

            <Route path="/Reserachreq" element={<Researchreq />} />
            <Route path="/Reserachreqtable" element={<Reserachreqtable />} />
            

            <Route path="/marksheetapproval" element={<MarksheetApproval />} />


            {/* report mark add sheet */}
            <Route path="/reportmarksheet" element={<Reportmarksheet />} />
            <Route path="/reportviewmarksheet" element={<ReportViewMarksheet />} />
            <Route path="/reportapprovedmarks" element={<ReportApprovedMarks />} />


            {/* edit pannel */}
            <Route path="/panneledit/:id" element={<Panneledit />} />

            <Route path="/fullmarksheet" element={<Full />} />
            <Route path="/fullmarksheetR" element={<FullR />} />

          </>
        )}
      </Routes>
     {/* <Footer /> */}
    </>
  );
}
 

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
         <Main />
      </BrowserRouter>
    )
  }
}