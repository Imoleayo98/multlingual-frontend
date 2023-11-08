import { CButton, CForm, CFormInput, CFormLabel, CFormTextarea, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function SingleIncident() {
    let [dashTitle, setDashTitle] = useState('Administrator Dashboard')
    let [title, setTitle] = useState('Incident Details')
    let [link1, setLink1] = useState('All Incidents')
    let [link2, setLink2] = useState('Create report')
    let [logText, setLogText] = useState('Log out')
    let [titleText, setTitleText] = useState('Title')
    let [severeText, setSevereText] = useState('Priority')
    let [desText, setDesText] = useState('Description')
    let [dateText, setDateText] = useState('Date')
    let [statusText, setStatusText] = useState('Status')
    let [lowText, setLowText] = useState('Low')
    let [submitText, setSubmitText] = useState('Update')
    let [pendingText, setPendingText] = useState('Pending')
    let [processingText, setProcessingText] = useState('Processing')
    let [handledText, setHandledText] = useState('Handled')

    const checkTranslation = (from,to) => {
        handleTranslation(setDashTitle,dashTitle,from,to)
        handleTranslation(setTitle,title,from,to)
        handleTranslation(setLink1,link1,from,to)
        handleTranslation(setLink2,link2,from,to)
        handleTranslation(setLogText,logText,from,to)
        handleTranslation(setTitleText,titleText,from,to)
        handleTranslation(setSevereText,severeText,from,to)
        handleTranslation(setDesText,desText,from,to)
        handleTranslation(setDateText,dateText,from,to)
        handleTranslation(setStatusText,statusText,from,to)
        handleTranslation(setLowText,lowText,from,to)
        handleTranslation(setPendingText,pendingText,from,to)
        handleTranslation(setProcessingText,processingText,from,to)
        handleTranslation(setHandledText,handledText,from,to)
        handleTranslation(setSubmitText,submitText,from,to)
} 

useEffect(() => {
   checkTranslation(sessionStorage.getItem('from'),sessionStorage.getItem('to'))
},[])

const [theTo, setTheTo] = useState()

const handleChange = (from,to) => {
    checkTranslation(from,to)
    sessionStorage.setItem('to',to);
    sessionStorage.setItem('from',from);
    GetIncidents()
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

    const [report, setReport] = useState({})
    const GetIncidents = () => {
        var settings = {
            headers: {
                "Content-Type":"Application/json"
            }
        };

        axios.get("http://localhost/nlpback/api/getsingle.php?to="+sessionStorage.getItem('to')+"&id="+sessionStorage.getItem('id'),settings)
        .then((res) => {
            if(res.data.status == "success"){
                setReport(res.data.data)
            }else{
                alert(res.data.message)
            }
        }).catch( e => {
            console.log(e)
            alert('Error, please try later')
        })
    }

    useEffect(() => {
        GetIncidents()
    },[])

    const [newStatus, setNewStatus] = useState()
    var settings = {
        headers: {
            "Content-Type":"Application/json"
        }
    };
    const Report = (e) => {
        e.preventDefault()
        const reportData = {status:newStatus ? newStatus : report.status2,id:sessionStorage.getItem('id'),to:sessionStorage.getItem('to'),from:sessionStorage.getItem('from')}
        axios.post("http://localhost/nlpback/api/update.php",reportData,settings)
        .then((res) => {
            if(res.data.status == "success"){
                alert(res.data.message)
            }else{
                alert(res.data.message)
            }
        }).catch( e => {
            console.log(e)
            alert('Error, please try later')
        })
    }
    const handleInput = (e) => {
        setNewStatus(e.target.value)
        setTheTo(theTo)
    }
  return (
    <div class="container text-center">
    <div class="row">
        <div class="col-12 col-lg-3 bg-white mr-2 border rounded text-start py-3">
            <ul style={{listStyle:"none"}}>
                <li><b>{sessionStorage.getItem('to') == 'en' ? 'Admin Dashboard' : dashTitle}</b></li>
                <li><Link to="/admin/reported" style={{textDecoration:"none"}}>{sessionStorage.getItem('to') == 'en' ? 'All Incidents' : link1}</Link></li>
                <li><Link to="/admin" style={{textDecoration:"none"}}>{sessionStorage.getItem('to') == 'en' ? 'Log out' : logText}</Link></li>
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
            <div><b>{sessionStorage.getItem('to') == 'en' ? 'Incident Details' : title}</b></div>
            <div className='mt-3'>
            <CForm className='text-start' onSubmit={Report}>
                <div className="mb-3">
                    <CFormLabel >{titleText}</CFormLabel>
                    <CFormInput defaultValue={report.title} readOnly type="text" />
                </div>
                <div className="mb-3">
                    <CFormLabel >{desText}</CFormLabel>
                    <CFormTextarea defaultValue={report.description} readOnly type="text" />
                </div>
                <div className="mb-3">
                    <CFormLabel >{dateText}</CFormLabel>
                    <CFormInput defaultValue={report.date} readOnly type="text" />
                </div>
                <div className="mb-3">
                    <CFormLabel >{statusText}</CFormLabel>
                    <select class="form-select" onChange={e => handleInput(e)}>
                        <option selected={report.status2 == 'Pending' ? true : false} value="Pending">{sessionStorage.getItem('to') == 'en' ? 'Pending' : pendingText}</option>
                        <option selected={report.status2 == 'Processing' ? true : false} value="Processing">{sessionStorage.getItem('to') == 'en' ? 'Processing' :processingText}</option>
                        <option selected={report.status2 == 'Handled' ? true : false} value="Handled">{sessionStorage.getItem('to') == 'en' ? 'Handled' :handledText}</option>
                    </select>
                </div>
                <CButton type="submit" color="primary" style={{background:"#184B8D"}}>
                    {sessionStorage.getItem('to') == 'en' ? 'Update' :  submitText}
                </CButton>
            </CForm>
            </div>
        </div>
    </div>
    </div>
  )
}

export default SingleIncident