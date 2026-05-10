import React from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { todoAdd } from './actions';

class ToDoTaskAddInner extends React.Component {

	constructor(props){
		super(props);

		this.state = {
			name: '',
			description: '',
		}

		this.onNameChange = this.onNameChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onAddFormSubmit = this.onAddFormSubmit.bind(this);
	}

	onNameChange(e) {
		this.setState({
			name: e.target.value
		});
	}

	onDescriptionChange(e) {
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
		})
		.then((res) => res.json())
		.then((data) => {

			this.props.dispatch(
				todoAdd(
					data._id,
					data.name,
					data.description
				)
			);

			this.props.history('/');
		});
	}

	render() {

		return (

			<div className="add-page">

				<div className="add-card">

					<h1>Add new task</h1>

					<NavLink className="back-link" to="/">
						← Back
					</NavLink>

					<form onSubmit={this.onAddFormSubmit}>

						<input
							type="text"
							value={this.state.name}
							onChange={this.onNameChange}
							placeholder="Task title"
							className="modern-input"
						/>

						<textarea
							value={this.state.description}
							onChange={this.onDescriptionChange}
							placeholder="Task description"
							className="modern-textarea"
						/>

						<button
							type="submit"
							className="btn btn-add"
						>
							Add Task
						</button>

					</form>

				</div>

			</div>
		)
	}
}

const ToDoTaskAdd = (props) => {
	return (
		<ToDoTaskAddInner
			{...props}
			history={useNavigate()}
		/>
	)
}

export default connect()(ToDoTaskAdd);