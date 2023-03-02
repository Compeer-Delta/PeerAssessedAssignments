import React from 'react';
import StudentFileUploader from '../components/StudentFileUploader';
import HeroSection from '../components/HeroSection';
import StudentView from './StudentView';
import { useLocation } from 'react-router-dom';
function StudentFileUpload() {
  
  const location = useLocation();
  const {modId} = location.state; //module id
  const {modTitle} = location.state;
  return (
    
    <>
    <HeroSection prevPageName = "Home Page" prevUrl={"/modules/" + modId} moduleTitle={modTitle}></HeroSection>
    <StudentFileUploader></StudentFileUploader>
    </>
    
  )
}

export default StudentFileUpload