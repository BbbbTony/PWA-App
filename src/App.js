import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Navbar, Container,Nav, Row, Col} from 'react-bootstrap';
import grid1 from './img/grid1.png';
import grid2 from './img/grid2.png';
import grid3 from './img/grid3.png';
import grid4 from './img/grid4.png';
import data from './data'
import { createContext, lazy, Suspense, useEffect, useState } from 'react';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom'
//import Detail from './routes/Detail';
import Category from './components/Category';
import axios from 'axios';
//import Cart from './routes/Cart';
import { useQuery } from 'react-query';
import TransitionTest from './routes/TransitionTest.js';

const Detail = lazy(()=>import('./routes/Detail.js'));
const Cart = lazy(()=>import('./routes/Cart.js'));


export let context1 = createContext();

function App() {

  let [inventory] = useState([10,11,12]);

  let [category ,setCategory] = useState(data);
  let navigate = useNavigate();
  let [clickCount ,setClickCount] = useState(1);
  const categoryImage = [grid1,grid2,grid3,grid4];

  useEffect(()=>{
    if(localStorage.getItem('watched')==null)
    localStorage.setItem('watched',JSON.stringify([]))
  },[])

  let watchGoods = localStorage.getItem('watched')
  watchGoods = JSON.parse(watchGoods)
  
  let userName = useQuery(['userName'],()=>
    axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      return a.data
    })
  )


  return (
    <div className="App">

      <Navbar bg="white" data-bs-theme="white">
        <Container>
          <Navbar.Brand onClick={()=>{navigate('/')}}>YOUICO</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/detail/1')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>Hi {userName.isLoading ? '로딩중' : userName.data.name}</Nav>

        </Container>
      </Navbar>

      <Suspense fallback={<div>로딩중</div>}>
      <Routes>
        <Route path='/' element={
        <>
          <div className='bg-img'></div>
          <br/>
          최근 본 상품
          <div className='watched'>
          { watchGoods.map((a,i)=>{
            return(
              <>
              <div key={i}>{category[a].title}</div>
              <h6>{category[a].content}</h6>
              </>
            )
          })}
          </div>
          <div>
            <Container>
              
                {
                  category.map((a,i)=>{
                    return(
                   
                     <Link to={`detail/${i}`}>
                      <Category key={i} category = {category[i]} i = {i} image = {categoryImage[i]}/>
                     </Link> 
                    
                    )
                  })
                }
              
            </Container>
          </div>
          <button onClick={()=>{
            //로딩중 ui 띄우기 
            setClickCount(clickCount + 1)
            if(clickCount <= 3){
            axios.get(`https://codingapple1.github.io/shop/data${clickCount}.json`)
            .then((result)=>{
              let data2 = result.data;
              console.log(data2)
              let copy = [...category, ...data2]
              setCategory(copy);
            }) // 로딩중 ui 숨기기
            .catch(()=>{
              console.log('실패함');
            })
          } else{
            alert('더보기 없음')
          }
          }}>더보기</button>
        </>
      }/>
      
        <Route path='/detail/:id' element={
          <context1.Provider value={{inventory}}>
          <Detail category = {category} image={categoryImage}/>
          </context1.Provider>}/>
        <Route path='*' element={<div>꺼지쇼</div>}/>
        <Route path='cart' element={
          <Cart/>
        } />
        <Route path='test' element={<TransitionTest/>}/>
      </Routes>
      </Suspense>
    </div>
  );
}


export default App;

