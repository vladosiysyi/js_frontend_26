import React from 'react';
import { useNavigate } from 'react-router-dom';

class ToDoTaskAddInner extends React.Component {
	constructor(props){
		super(props)
		
		this.state = {
			name: '',
			description: '',
		}
		
		this.onNameChange = this.onNameChange.bind(this);
		this.onDecriptionChange = this.onDecriptionChange.bind(this);
		this.onAddFormSubmit  = this.onAddFormSubmit.bind(this);

	}
	
	  onNameChange(e) {
		  e.preventDefault();
		  
		  this.setState({
			  name: e.target.value
		  });
		 
	  }
	  
	  onDecriptionChange(e) {
		  e.preventDefault();
		  
		  this.setState({
			  description: e.target.value
		  });
		 
	  }
	  
	  
	  onAddFormSubmit(e) {
			  e.preventDefault();

			  fetch('tasks', {
				method: 'POST',
				body: JSON.stringify({
				  name: this.state.name,
				  description: this.state.description
				}),
				headers:{
					'Content-Type': 'application/json'
				}
			  }).then((res) => {
				
				return res.json();
			  }).then((data) => {
				this.props.onTaskAdd(data);
				this.props.history('/');
			  });
			}


	  render() {
			 return (
					<form onSubmit={this.onAddFormSubmit}>
						<input type="text" value={this.state.name} onChange={this.onNameChange} placeholder="Name" />
						<input type="text" value={this.state.description} onChange={this.onDecriptionChange} placeholder="Decription" />
						<input type="submit" value="Add" />
					</form>
				  )
	  }
}
const ToDoTaskAdd = (props) =>{
	return (
		<ToDoTaskAddInner {...props} history={useNavigate()} />
	)
}

export default ToDoTaskAdd;