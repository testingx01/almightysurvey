import React from 'react';
import { createRoot } from 'react-dom/client';
import SurveyCreatorComponent from './SurveyCreatorComponent';
const root = createRoot(document.getElementById("surveyCreatorContainer"));
root.render(<SurveyCreatorComponent />);
