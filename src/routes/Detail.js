import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { context1 } from "./../App";
import { useDispatch } from "react-redux";
import { addCart } from "./../store";

function Detail(props) {

    let {inventory} = useContext(context1);

    let {id} = useParams();
    let findProduct = props.category.find((x)=> x.id == id);

    let [timeEvent, setTimeEvent] = useState(true);
    let [num, setNum] = useState('');
    let [tab, setTab] = useState(0);
    let [fade2, setFate2] =useState('');

    let dispatch = useDispatch();


    useEffect(()=>{
        let a = setTimeout(()=>{setTimeEvent(false)},2000)

        return() =>{
            clearTimeout(a);
        }
    })

    useEffect(()=>{
        if(isNaN(num) == true){
            alert('그러지마')
        }
    },[num])

    useEffect(()=>{
        setFate2('end');

        return ()=>{
            
            setFate2('');
        }
    })

    useEffect(()=> {
        let watched = localStorage.getItem('watched')
        watched = JSON.parse(watched)
        watched.push(findProduct.id)
        watched = new Set(watched)   // set 자료형 이거는 중복을 허용하지 않는 array자료
        watched = Array.from(watched)
        localStorage.setItem('watched',JSON.stringify(watched))
    },[])
    

    return(
        
        <div className={`container start ${fade2}`}>
            {
            timeEvent == true ? <div className="alert alert-warning">2초 안에 구매시 50% 할인</div> : null 
            }
            
            <div className="row">
                <div className="col-md-6">
                    <img src={props.image[id]} width = "100%"/>
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{findProduct.title}</h4>
                    <p>{findProduct.content}</p>
                    <p>220000</p>
                    <input 
                    type="text" 
                    placeholder="수량을 입력하세요" 
                    onfocus="this.placeholder=''"
                    onChange={(e)=>{setNum(e.target.value)}}></input>
                    <br/>
                    <button className="btn btn-danger" onClick={()=>{
                        dispatch(addCart({id : findProduct.id, title : findProduct.title, count : findProduct.count}))
                    }}>주문하기</button>
                </div>
            </div>

            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tab={tab}/>

        </div>
    )
}

function TabContent({tab}) {
        // if (tab == 0)
        //     return <div>내용0</div>
        // if (tab == 1)
        //     return <div>내용1</div>
        // if (tab == 2)
        //     return <div>내용2</div>
        // if 보기 싫다

        let [fade, setFade] = useState('');
        let {inventory} = useContext(context1);

        useEffect(()=>{
            let a = setTimeout(()=>{setFade('end')},10)
            return()=>{
                clearTimeout(a);
                setFade('');
            }
        },[tab])

    return (
        <div className={`start ${fade}`}>
            {[<div>내용0</div>,<div>내용1</div>,<div>내용2</div>][tab]}
        </div>
    )
}

export default Detail;