import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import CustomTable from '../components/CustomTable'
const Container = styled.div`
height:100%;
margin: 4% 7%;
`

const Tr = styled.tr`
&:nth-child(even){
    background-color: #f2f2f2;
}
&:hover {
    background-color:#ddd;
  }
`
const Title = styled.h1`
  text-align:center;
  padding-bottom:10px;
  color:#222831;
`
const Button = styled.button`
background-color:#393E46;
color:#EEEEEE;
border:none;
border-radius:15px;
font-size:14px;
cursor: pointer;
`

const Anlyze = (CUId) => {

    const [examInfo, setExamInfo] = useState([]);
    const [start, setStart] = useState(true);

    const params = useParams();
    const id = params;

    useEffect(() => {
        getExamInfos();
        // getExam();
    }, [])

console.log("UUU",id);
    const getExamInfos = async () => {
        const { data } = await axios.get(`http://localhost:5000/userexams/exam/${id.id}`);
        setExamInfo(data);
        console.log("DDDD",data);
        setStart(false);
    }


    /*
        const getExamNames = async () => {
            const { data } = await axios.get(`http://localhost:5000/userexams/exam/${id.id}`);
            for (let i = 0; i < data.length; i++) {
                setDatas(data);
            }
        }
    
        const getExam = async () => {
            const { data } = await axios.get(`http://localhost:5000/exam/exam/${id.id}`);
            for (let i = 0; i < data.length; i++) {
                setExamName(data);
            }
            console.log(data)
        }
    
        const getUserName = async () => {
            for (var i = 0; i <= datas.length - 1; i++) {
                const { data } = await axios.get(`http://localhost:5000/users/` + datas[i]?.userId);
                for (let k = 0; k < data.length; k++) {
                    setNames(data)
                }
            }
            setStart(false)
        }
        */


    // onClick={getUserName}
    if (start) {
        return (
            <>
               hello
            </>)
    }
   
    const columns = [
        {
          title: "user name",
          dataIndex: "firstname",
          key: "firstname",
          className: "employee-data",
        },
        {
          title: "exam name ",
          dataIndex: "examname",
          key: "examname",
        },
    
        {
          title: "score",
          dataIndex: "grade",
          key: "grade",
        },
        {
          title: "Review",
          //dataIndex: "id",
          key: "id",
          render: (text, key) => (
            <Link to={`/examreview/${key.id}`}><Button>Click me</Button></Link>
          ),
        },
      ];
    return (
        <>
            <Header />
            <Container>
                <Title>Exam analysis</Title>
                <CustomTable
              tdata={examInfo}
              columns={columns}
              title={"Exams analysis"}
              //  filter="Total Cash"
              activeIndex={0}
             
             // style={styleTable}
            />
            
                 
              
            </Container>
            <Footer />
        </>
    )
}

export default Anlyze