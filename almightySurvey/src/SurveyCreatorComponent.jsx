import React from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-core/survey.i18n.js";
import "survey-creator-core/survey-creator-core.i18n.js";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import "./index.css";
function SurveyComponent() {
    const creatorOptions = {};
    const creator = new SurveyCreator(creatorOptions);
    /*creator.JSON = {
     "completedHtml": "<h3>Thank you for your feedback.</h3><h5>Your thoughts and ideas will help us to create a great product!</h5>",
     "completedHtmlOnCondition": [
     ],
     "pages": [
      {
       "name": "Create Form",
       "elements": [
        {
        },
       ]
      }
     ],
     "showQuestionNumbers": "off"
    }; */
    return (<SurveyCreatorComponent creator={creator} />);
}
export default SurveyComponent;
