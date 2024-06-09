import React, {useState} from 'react';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Contact = () => {
  const [name,setName] = useState("");
  const [phone,setPhone] = useState("");
  const [message,setMessage] = useState("");
    // Function to handle key press and allow only numbers
  const handleKeyPress = (event) => {
    //console.log("event.target.name = ",event.target.name);
    if(event.target.name==="name")
      {setName(event.target.value)}
    else if(event.target.name==="phone")
      {setPhone(event.target.value)}
    else if(event.target.name==="message")
      {setMessage(event.target.value)}
    }

  const fun_upload_message = (e) =>{
    e.preventDefault();
    const data ={name, phone, message}
    fetch('http://localhost:3000/api/postAPI/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data }),
  })
      .then((response) => response.json())
      .then((data) => console.log({"success":"true"}));

  }
    
  return (
    <main
      className={`flex min-h-screen flex-col items-center  ${inter.className}`} /*justify-between p-24 removed*/    
    >
      <Form onSubmit={fun_upload_message}> 

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" placeholder="Enter Name" onChange={handleKeyPress}/>
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPhoneNumber">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control 
          type="tel" 
          name="phone"
          placeholder="Enter Phone Number" 
          pattern="[0-9]*"
          onChange={handleKeyPress}
        />
        <Form.Text className="text-muted">
         
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicMessage">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" name="message" aria-label="With textarea" onChange={handleKeyPress}/>
        <Form.Text className="text-muted">
          
        </Form.Text>
      </Form.Group>
      

      <Button variant="primary" type="submit" >
        Submit
      </Button>
    </Form>
    </main>
  )
}
export default Contact
