
import * as React from 'react';

import { useLocalization } from '@progress/kendo-react-intl';

// import kendoka from '../assets/kendoka.png';
import github from '../assets/github-icon.svg';


const Info = () => {
const localizationService = useLocalization();  
   var txt ;
   var txt2;
    txt = <h3>   Welcome to the Pet Sharer !
    
    <span>{localizationService.toLanguageString('custom.demoInfo2')}</span></h3>
    
  txt2  =<h4>  F.A.Q
    How does visitor sign-in work?
     forms let you collect information from anyone and save it automatically to an Airtable table.
      In this app, we've configured a form from the Visitors table to collect information from visitors upon arrival. </h4>;

    return (
        <div id="Info" className="info-page main-content2">
            <div className="content">
                    <div className="kendoka">
                        {/* <img src={kendoka} alt="kendoka" /> */}
                    </div>
                    <div className="section-1">
                        <h1></h1>
                        <h2>Adopt a Paw</h2>
                         {txt}<br></br>{txt2}
                    </div>
                   
                    <div className="section-3">
                      
                </div>
            </div>
            
            <div className="footer"/>
        </div>
    );
}

export default Info;

