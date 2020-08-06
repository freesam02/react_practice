import React, {useState, useContext} from 'react';

import { Navbar,Nav,NavDropdown,Form,Button,FormControl,Jumbotron } from 'react-bootstrap';
import Data from './data.js'
import Detail from './Detail.js'
import { Link, Route, Switch } from 'react-router-dom';
import Axios from 'axios';

let 재고context = React.createContext();

function App() {
  let [shoes, shoes변경] = useState(Data);
  let [재고,재고변경] = useState([10,11,12]);
  return (
    <div className="App">

<Navbar bg="light" expand="lg">
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link as={Link} to="/">Home</Nav.Link>
      <Nav.Link as={Link} to="/detail">Detail</Nav.Link>
      <NavDropdown title="Dropdown" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Form inline>
      <FormControl type="text" placeholder="Search" className="mr-sm-2" />
      <Button variant="outline-success">Search</Button>
    </Form>
  </Navbar.Collapse>
</Navbar>


    <Switch>
      <Route exact path="/"> 
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for calling
            extra attention to featured content or information.
          </p>
          <p>
            <Button variant="primary">Learn more</Button>
          </p>
        </Jumbotron>

        <div className="container">
          <재고context.Provider value={재고}>
          <div className="row">
            { 
              shoes.map((a,i)=>{
              return <Card shoes={shoes[i]} i={i} />
              })
            }
        </div>
        </재고context.Provider>
        <button className="btn btn-primary" onClick={()=>

        {Axios.get('https://codingapple1.github.io/shop/data2.json').then((result)=>{
          //console.log(result.data)
          shoes변경([...shoes,...result.data]);
        })
        .catch(()=>{
          console.log('Fail')
        })
        }}>더보기</button>
      
      </div>
      </Route>

      <Route path="/detail/:id">
        <Detail shoes={shoes} 재고={재고}/>
      </Route>


      <Route path="/:id">
        <div>아무거나 적었을 때 보여주셈</div>
      </Route>
      </Switch>
    </div>
  )
}

function Card(props){

  let 재고 = useContext(재고context);
  return (
    <div className="col-md-4">
      <img src={ 'https://codingapple1.github.io/shop/shoes' + (props.i+1) + '.jpg' } width="100%"/>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.content } & { props.shoes.price }</p>
      <p>{재고[props.i]}</p>
    </div>
  )
}



export default App;
