import React from 'react';
import FileUploader from '../components/FileUploader';
import HeroSection from '../components/HeroSection';
import StudentView from '../pages/StudentView';

function FileUpload() {
  return (
    
    <>
    <HeroSection prevPageName = "Home Page" prevUrl= "/studentview"></HeroSection>
    <FileUploader></FileUploader>
    </>
    
  )
}

export default FileUpload