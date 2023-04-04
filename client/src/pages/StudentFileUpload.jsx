/**
 * Credit:
 * Functionality: Jordan D'Souza
 */
import React from 'react';
import StudentFileUploader from '../components/StudentFileUploader';
import HeroSection from '../components/HeroSection';
import StudentView from './StudentView';
import { useLocation } from 'react-router-dom';
function StudentFileUpload() {
  
  const location = useLocation();
  const {modId} = location.state; //module id
  const {modCode} = location.state;
  const {modTitle} = location.state;
  return (
    
    <>
    <HeroSection prevPageName = "Home Page" prevUrl={"/modules/" + modCode} moduleCode={modCode} moduleId= {modId} moduleTitle={modTitle}></HeroSection>
    <StudentFileUploader></StudentFileUploader>
    </>
    
  )
}

export default StudentFileUpload