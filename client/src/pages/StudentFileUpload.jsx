import React from 'react';
import StudentFileUploader from '../components/StudentFileUploader';
import HeroSection from '../components/HeroSection';
import StudentView from './StudentView';

function StudentFileUpload() {
  return (
    
    <>
    <HeroSection prevPageName = "Home Page" prevUrl= "/studentview"></HeroSection>
    <StudentFileUploader></StudentFileUploader>
    </>
    
  )
}

export default StudentFileUpload