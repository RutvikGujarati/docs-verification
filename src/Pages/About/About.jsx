import React from 'react'
import './About.css'
// import  "@fortawesome/fontawesome-free";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronDown, faPlus, faMinus} from "@fortawesome/free-solid-svg-icons"



const About = () => {
  return (


    <body>
      <section>
        <div className="container1">
          <div className="accordion1">
            <div className="accordion1-item" id='question1'>
              <a href="#question1">
                 About SafeHeaven
                 <i className='plus'>
                 <FontAwesomeIcon icon={faPlus}/>
                 </i>
                 <i className='Minus'>
                  <FontAwesomeIcon icon={faMinus} />
                 </i>
              </a>
              <div className="answer">
                <p>
                A SafeHeaven is a secure digital storage solution for important 
documents, such as contracts, financial statements, and legal records. It 
uses encryption and other security measures to protect your documents 
from unauthorized access, modification, or destruction.
                </p>
              </div>
               
            </div>

            <div className="accordion1-item" id='question2'>
              <a href="#question2">
                 PrivacyPolicy
                 <i className='plus'>
                 <FontAwesomeIcon icon={faPlus}/>
                 </i>
                 <i className='Minus'>
                  <FontAwesomeIcon icon={faMinus} />
                 </i>
              </a>
              <div className="answer">
              <p>
              This privacy policy (“Privacy Policy”) is in the context of and to govern the access and usage of the SafeHeaven System application and SafeHeaven Portal/website an initiative of MeitY (Ministry of Electronics & Information Technology), Government of India.
              </p>
              <p>
              This Privacy Policy describes and determines how SafeHeaven application (referred to as MeitY or We/Us or SafeHeaven System or SafeHeaven Account holder), handle and/ or deal with your (referred to as You or User) personal and usage information, in accordance with the applicable laws of India.
              </p> 
              </div>
            </div>

            <div className="accordion1-item" id='question3'>
              <a href="#question3">
                 ContactUs
                 <i className='plus'>
                 <FontAwesomeIcon icon={faPlus}/>
                 </i>
                 <i className='Minus'>
                  <FontAwesomeIcon icon={faMinus} />
                 </i>
                 
              </a>
              <div className="answer">
              <p>
                Mo     : 9823764336
                </p>
                <p>
                E-mail : Safeheavencontact@gmail.com
                </p>
              </div>
            </div>

            <div className="accordion1-item" id='question4'>
              <a href="#question4">
                 FAQ
                 <i className='plus'> 
                 <FontAwesomeIcon icon={faPlus}/>
                 </i>
                 
                 <i className='Minus'>
                  <FontAwesomeIcon icon={faMinus} />
                 </i>
              </a>
              <div className="answer">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, itaque quae dolor doloremque delectus vel, optio illo dolore blanditiis commodi beatae alias eaque vero iure, debitis dignissimos. Repellat, autem molestiae!
                </p>
              </div>
            </div>


          </div>
        </div>
      </section>
    </body>



  
          

  )
}

export default About