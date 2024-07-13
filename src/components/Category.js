import { Row,  Col } from "react-bootstrap";

function Category(props) {
    return(
    
        <Row> 
            <img src={props.image} width='100%'/>
            <h6>{props.category.title}</h6>
            <p>{props.category.content}</p>
        </Row> 
    
    )   
}   

export default Category;