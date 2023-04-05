/**
 * Credit:
 * Functionality: Hathan Khatkar
 * Route editing: Jordan D'Souza, Gregory Clews, Hathan Khatkar
 */
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SubmitWork from "./SubmitWork";
import Welcome from "./Welcome";
import StudentView from "./StudentView";
import Login from "./Login";
import SignUp from "./SignUp";
import Modules from "./Modules";
import CreateModule from "./CreateModule";
import ManageAccounts from "./ManageAccounts";
import StudentFileUpload from "./StudentFileUpload";
import AddAssignment from "./AddAssignment";
import ViewSubmissions from "./ViewSubmissions";
import PeerAssessWork from "./PeerAssessWork";
import AdminView from "./AdminView";
import ViewFeedback from "./ViewFeedback";

function App() {
  const [theme, setTheme] = useState(null);
  useEffect(() => {
    if (window.matchMedia("(prefer-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);
  //use effect checks prefered settings to match dark or light mode

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }),
    [theme];
  //theme dependancy added here. that means everytime we change the theme, this function will be invoked

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  //function for theme switch ^

  return (
    <>
      {/* Button to handle theme switch */}
      <button
        type="button"
        onClick={handleThemeSwitch}
        className="fixed z-50 right-5 top-2 bg-indigo-500 text-lg p-1 rounded-md"
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
      {/*Contains all the routes to different pages by default we stick to / which directs us to the welcome page*/}
      <>
        <Routes>
          
          <Route path="/login/*" element={<Login />} />
          <Route path="/submitwork" element={<SubmitWork />} />
          <Route path="/modules/:id/*" element={<StudentView />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/modules/*" element={<Modules />} />
          <Route path="/createmodule" element={<CreateModule />} />
          <Route path="/manageaccounts" element={<ManageAccounts />} />
          <Route path="/" element={<Welcome />} />
          <Route
            path="/modules/:id/upload/:aid"
            element={<StudentFileUpload />}
          />
          <Route path="/addassignment" element={<AddAssignment />} />
          <Route
            path="/modules/:id/viewsubmissions/:aid/*"
            element={<ViewSubmissions />}
          />
          <Route
            path="/modules/:id/viewsubmissions/:aid/peerassess/:sid"
            element={<PeerAssessWork />}
          />
          <Route path="/adminview" element={<AdminView />} />
          <Route path="/viewfeedback" element={<ViewFeedback />} />
        </Routes>
        
      </>
    </>
  );
}

export default App;
