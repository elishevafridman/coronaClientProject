import logo from './logo.svg';
import './App.css';
import AllMembersComp from './AllMembers';
import Members from './Members';
import{BrowserRouter,Routes,Route}from "react-router-dom"
import AddMemberComp from './AddMember';
import MemberDetails from './MemberDetails';
import EditMember from './EditMember';
 
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Members />} >
      <Route path="/allMembers" element={<AllMembersComp />} />
       <Route path="/addMember" element={<AddMemberComp/>} />
       <Route path="/member/:id" element={<MemberDetails />} />
       <Route path="/editMember/:id" element={<EditMember />} />

      </Route>

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
