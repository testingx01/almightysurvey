import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import SurveyCreatorComponent from './SurveyCreatorComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const createSurvey = createRoot(document.getElementById("surveyCreatorContainer"));
createSurvey.render(<SurveyCreatorComponent />);
