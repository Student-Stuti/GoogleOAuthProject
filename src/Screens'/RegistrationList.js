import React from 'react'
import  { useState, useEffect } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import AdminHeader from './AdminHeader';

function RegistrationList() {
    
    const [user , setUser] = useState([])
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [show, setShow] = useState(false);
    const [showAdd, setShowAdd] = useState(false); 
    

    const[editID , setEditID] = useState('')
    const [editUserName , setEditUserName] = useState('')
    const[editEmail , setEditEmail] = useState('')
    const[editRole , setEditRole] = useState('')

    

    const url = "https://localhost:7092/api/Admin/UserList";
    const fetchInfo = () => { 
        return axios.get(url) 
                 .then((response) => 
                  setUser(response.data));
      }
      
      useEffect(() => { 
            fetchInfo(); 
      }, [])
      
      const handleEdit =(id) =>{
       const selectedUser = user.find((item) => item.id === id);
       if(selectedUser){
        setEditID(selectedUser.id);
        setEditEmail(selectedUser.email);
        setEditUserName(selectedUser.userName);
        console.log(id);
       }
        
        handleShow();
        console.log(id);
      }

      const handleAddShow = () => {
        clear(); // Clear the form when adding a new user
        setShowAdd(true);
      };
    
      const handleAddClose = () => {
        setShowAdd(false);
      };
  
       debugger
      const handleDelete =(id) =>{
        const data={
          id : id
        }
        console.log(id);
        if(window.confirm("Are you sure to delete this employee") === true)
        {
          const url =`https://localhost:7092/api/Admin/DeleteUser/${id}`;
          axios.delete(url)
          .then((result)=>{
            console.log(result.data)
            if(result.status === 200){
              alert("Employee has been deleted");
              fetchInfo();
            }
          })
          .catch((error)=>{
            alert(error);
          })
  
        }
       
      }
      const clear = ()=>{
        setEditUserName('');
        setEditEmail('');
      }
      const handleUpdate =(id) =>{
        handleShow();
        const data ={
          id: editID,
          email: editEmail,
          userName : editUserName,
          
          
        }
        const url ="https://localhost:7092/api/Admin/UpdateUser/${id}";
        axios.put(url,data)
        .then((result)=>{
          console.log(result.data)
          fetchInfo();
          alert("Employee has been updated")
          clear();
        }).catch((error)=>{
          alert(error);
        })
      }
  return (
   <>
   <AdminHeader/>
   <div className='row'>
   <div><h3 className='userlist' >USER LIST</h3></div>
   <div > 
   <Button className='btn btn-success' onClick={handleAddShow} m-2> + Add User</Button>
   </div>
   </div>
   
<Table className = "table table-striped" >
      <thead>
        <tr>
          <th></th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
          
        </tr>
      </thead>
      <tbody>
        {

            user.map((item , index) => (
              <tr key={item.id }>
                 <td>{index+1}</td> 
                <td>{item.userName}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
                    
                      <td colSpan={2}>
                        <button className='btn btn-primary' onClick={()=> handleEdit(item.id)}>Edit</button> &nbsp;
                        <button className='btn btn-danger' onClick={()=> handleDelete(item.id)}>Delete</button>

                      </td>


                    </tr>
                
            )
            
        )}
        
        
      </tbody>
    </Table>
    
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modify/Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Container>
      
      <Row><input type="text" className='form-control' placeholder='Enter UserName' value ={editUserName} 
        onChange={(e)=>setEditUserName(e.target.value)}/>  </Row>
        <br></br>
        <Row><input type="text" className='form-control' placeholder='Enter Email' value={editEmail}
        onChange={(e)=>setEditEmail(e.target.value)}/></Row>
        <br></br>
    </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add user model */}
      <Modal show={showAdd} onHide={handleAddClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <input
                type="text"
                className="form-control"
                placeholder="Enter UserName"
                value={editUserName}
                onChange={(e) => setEditUserName(e.target.value)}
              />
            </Row>
            <br></br>
            <Row>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
              />
            </Row>
            <br></br>
            <Row>
              <div className="form-outline mb-4">
                <select
                  className="form-control"
                  id="form3Example1"
                  name="role"
                  onChange={(e) => setEditRole(e.target.value)}
                  required
                >
                  <option value="">Select Role</option>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAddClose}>
            Close
          </Button>
          <Button variant="primary">
            Add User
          </Button>
        </Modal.Footer>
      </Modal>



      {/* Add user model */}
      {/* <Modal show={show} onHide={handleAddClose}>
        <Modal.Header closeButton>

          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>

        <Modal.Body>
        <Container>
      
      <Row><input type="text" className='form-control' placeholder='Enter UserName' value ={editUserName} 
        onChange={(e)=>setEditUserName(e.target.value)}/>  </Row>
        <br></br>
        <Row><input type="text" className='form-control' placeholder='Enter Email' value={editEmail}
        onChange={(e)=>setEditEmail(e.target.value)}/></Row>
        <br></br>
        
    </Container>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
    {/* </div> */}
   </>
   )
}

export default RegistrationList