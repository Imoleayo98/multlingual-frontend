import { CButton, CForm, CFormInput, CFormLabel, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ReportIncident() {

    let [dashTitle, setDashTitle] = useState('User Dashboard')
    let [title, setTitle] = useState('Create Report')
    let [link1, setLink1] = useState('All Incidents')
    let [link2, setLink2] = useState('Report Incident')
    let [logText, setLogText] = useState('Log out')
    let [titleText, setTitleText] = useState('Title')
    let [severeText, setSevereText] = useState('Priority')
    let [desText, setDesText] = useState('Description')
    let [lowText, setLowText] = useState('Low')
    let [mediumText, setMediumText] = useState('Medium')
    let [highText, setHighText] = useState('High')
    let [veryhighText, setVeryHighText] = useState('Very High')
    let [submitText, setSubmitText] = useState('Submit')

    const checkTranslation = (from,to) => {
        handleTranslation(setDashTitle,dashTitle,from,to)
        handleTranslation(setTitle,title,from,to)
        handleTranslation(setLink1,link1,from,to)
        handleTranslation(setLink2,link2,from,to)
        handleTranslation(setLogText,logText,from,to)
        handleTranslation(setTitleText,titleText,from,to)
        handleTranslation(setSevereText,severeText,from,to)
        handleTranslation(setDesText,desText,from,to)
        handleTranslation(setLowText,lowText,from,to)
        handleTranslation(setMediumText,mediumText,from,to)
        handleTranslation(setHighText,highText,from,to)
        handleTranslation(setVeryHighText,veryhighText,from,to)
        handleTranslation(setSubmitText,submitText,from,to)
} 

useEffect(() => {
    checkTranslation(sessionStorage.getItem('from'),sessionStorage.getItem('to'))
},[])

const handleChange = (from,to) => {
    checkTranslation(from,to)
    sessionStorage.setItem('to',to);
    sessionStorage.setItem('from',from);
}

const handleTranslation = (setter,text,from,to) => {
    var settings = {
        params : {
            'api-version':'3.0',
            'from' : from,
            'to': 'en'
          },
        headers: {
            "Ocp-Apim-Subscription-Key" : `${process.env.REACT_APP_TRANS_API}`,
            "Ocp-Apim-Subscription-Region" : "westeurope",
        }
    };
    var settings2 = {
        params : {
            'api-version':'3.0',
            'from' : 'en',
            'to': to
          },
        headers: {
            "Ocp-Apim-Subscription-Key" : `${process.env.REACT_APP_TRANS_API}`,
            "Ocp-Apim-Subscription-Region" : "westeurope",
        }
    };
    const requestBody = [
        {
          text: text
        }
      ];
    axios
      .post("https://api.cognitive.microsofttranslator.com/translate",requestBody, settings)
      .then((res) => {
            axios
            .post("https://api.cognitive.microsofttranslator.com/translate",[{text:res.data[0].translations[0].text}], settings2)
            .then((res) => {
            setter(res.data[0].translations[0].text)
            return res.data[0].translations[0].text
            })
            .catch((error) => {
            console.log(error);
            });
      })
      .catch((error) => {
        console.log(error);
      });
}


    const [reportData, setReportData] = useState({to:sessionStorage.getItem('to'),from:sessionStorage.getItem('from')})
    var settings = {
        headers: {
            "Content-Type":"Application/json"
        }
    };
    const Report = (e) => {
        reportData.to = sessionStorage.getItem('to')
        reportData.from = sessionStorage.getItem('from')
        e.preventDefault()
        if(!reportData.title || !reportData.description){
            alert('Please fill all fields')
            return;
        }
        axios.post("http://localhost/nlpback/api/create.php",reportData,settings)
        .then((res) => {
            if(res.data.status == "success"){
                alert(res.data.message)
            }else{
                alert(res.data.message)
            }
        }).catch( e => {
            console.log(e)
            alert(e.response.data.message)
        })
    }
    const handleInput = (e,field) => {
        setReportData({...reportData,[field] : e.target.value})
    }
  return (
    <div class="container text-center">
    <div class="row">
        <div class="col-12 col-lg-3 bg-white mr-2 border rounded text-start py-3">
            <ul style={{listStyle:"none"}}>
                <li><b>{dashTitle}</b></li>
                <li><Link to="/user/report" style={{textDecoration:"none"}}>{sessionStorage.getItem('to') == 'en' ? 'Report Incident' : link2}</Link></li>
                <li><Link to="/user/reported" style={{textDecoration:"none"}}>{sessionStorage.getItem('to') == 'en' ? 'All Incidents' : link1}</Link></li>
                <li><Link to="/user" style={{textDecoration:"none"}}>{sessionStorage.getItem('to') == 'en' ? 'Log out' : logText}</Link></li>
                <li className='mt-5 w-50'>
                    <select class="form-select" onChange={(e) => handleChange(sessionStorage.getItem('to'),e.target.value)}>
                        <option selected = {sessionStorage.getItem('to') == 'en'? true : false} value="en">English</option>
                        <option selected = {sessionStorage.getItem('to') == 'ig'? true : false} value="ig">Igbo</option>
                        <option selected = {sessionStorage.getItem('to') == 'yo'? true : false} value="yo">Yoruba</option>
                        <option selected = {sessionStorage.getItem('to') == 'ha'? true : false} value="ha">Hausa</option>
                    </select>
                </li>
            </ul>
        </div>
        <div class="col-1">
        </div>
        <div class="col-12 col-lg-8 bg-white border rounded py-3 text-start">
            <div><b>{sessionStorage.getItem('to') == 'en' ? 'Create Incident' : link2}</b></div>
            <div className='mt-3'>
            <CForm className='text-start' onSubmit={Report}>
                <div className="mb-3">
                    <CFormLabel >{titleText}</CFormLabel>
                    <CFormInput onChange={(e) => handleInput(e,'title')} type="text" />
                </div>
                <div className="mb-3">
                    <CFormLabel >{desText}</CFormLabel>
                    <CFormInput onChange={(e) => handleInput(e,'description')} type="text" />
                </div>
                <CButton type="submit" color="primary" style={{background:"#184B8D"}}>
                    {submitText}
                </CButton>
            </CForm>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ReportIncident