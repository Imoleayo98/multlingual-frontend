import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function ReportedIncidents() {

    const [reports, setReports] = useState([])
    const [fetching, setFetching] = useState(1)

    const GetIncidents = () => {
        setFetching(1)
        var settings = {
            headers: {
                "Content-Type":"Application/json"
            }
        };

        axios.get("http://localhost/nlpback/api/get.php?to="+sessionStorage.getItem('to'),settings)
        .then((res) => {
            if(res.data.status == "success"){
                setReports(res.data.data)
                setFetching(0)
            }else{
                alert(res.data.message)
                setFetching(0)
            }
        }).catch( e => {
            console.log(e)
            alert('Error, please try later')
            setFetching(0)
        })
    }

    useEffect(() => {
        GetIncidents()
    },[])

    let i =1;
    const viewOne = (id) => {
        sessionStorage.setItem('id',id)
        window.location.href='/user/single'
    }

        //conversions
        let [dashTitle, setDashTitle] = useState('User Dashboard')
        let [link1, setLink1] = useState('All Incidents')
        let [link2, setLink2] = useState('Create Report')
        let [logText, setLogText] = useState('Log out')
        let [titleText, setTitleText] = useState('Title')
        let [severeText, setSevereText] = useState('Priority')
        let [statusText, setStatusText] = useState('Status')
        let [actionText, setActionText] = useState('Action')
        let [dateText, setDateText] = useState('Date')
        let [viewText, setViewText] = useState('View More')
        let [nullText, setNullText] = useState('No Incidents Found')
        let [waitText, setWaitText] = useState('Please wait ...')
    
        const checkTranslation = (from,to) => {
                handleTranslation(setDashTitle,dashTitle,from,to)
                handleTranslation(setLink1,link1,from,to)
                handleTranslation(setLink2,link2,from,to)
                handleTranslation(setLogText,logText,from,to)
                handleTranslation(setTitleText,titleText,from,to)
                handleTranslation(setSevereText,severeText,from,to)
                handleTranslation(setStatusText,statusText,from,to)
                handleTranslation(setActionText,actionText,from,to)
                handleTranslation(setDateText,dateText,from,to)
                handleTranslation(setViewText,viewText,from,to)
                handleTranslation(setNullText,nullText,from,to)
                handleTranslation(setWaitText,waitText,from,to)
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
  return (
    <div class="container text-center">
    <div class="row">
        <div class="col-12 col-lg-3 bg-white mr-2 border rounded text-start py-3 hidden">
            <ul style={{listStyle:"none"}}>
                <li><b>{sessionStorage.getItem('to') == 'en' ? 'User Dashboard' : dashTitle}</b></li>
                <li><Link to="/user/report" style={{textDecoration:"none"}}>{sessionStorage.getItem('to') == 'en' ? 'Create Report' : link2}</Link></li>
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
            <div><b>{link1}</b></div>
            <div className='mt-3'>
            <CTable>
                <CTableHead>
                    <CTableRow>
                        <CTableHeaderCell scope="col">S/n</CTableHeaderCell>
                        <CTableHeaderCell scope="col">{titleText}</CTableHeaderCell>
                        <CTableHeaderCell scope="col">{severeText}</CTableHeaderCell>
                        <CTableHeaderCell scope="col">{dateText}</CTableHeaderCell>
                        <CTableHeaderCell scope="col">{statusText}</CTableHeaderCell>
                        <CTableHeaderCell scope="col">{actionText}</CTableHeaderCell>
                    </CTableRow>
                </CTableHead>
                <CTableBody>
                    {reports.map(({id,title,severity,date,status}) => {
                        return (
                            <CTableRow key={id}>
                                <CTableHeaderCell scope="row">{i++}</CTableHeaderCell>
                                <CTableDataCell>{title}</CTableDataCell>
                                <CTableDataCell>{severity}</CTableDataCell>
                                <CTableDataCell>{date}</CTableDataCell>
                                <CTableDataCell>{status}</CTableDataCell>
                                <CTableDataCell onClick={() => viewOne(id)}><button className='bg-primary text-white rounded outline-none'>{sessionStorage.getItem('to') == 'en' ? 'View More' : viewText}</button></CTableDataCell>
                            </CTableRow>
                        )
                    })}
                    { fetching ? <div>{waitText}</div> : reports.length < 1 ? <div>{nullText}</div> : null }
                </CTableBody>
                </CTable>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ReportedIncidents 