import React from 'react';
import { connect } from 'react-redux';
import { todoDelete, todoUpdateState } from './actions';

class ToDoTask extends React.Component {

	constructor(props){
		super(props);

		this.onStatusClick = this.onStatusClick.bind(this);
		this.onDeleteClick = this.onDeleteClick.bind(this);
	}

	onStatusClick(e) {
		e.preventDefault();

		fetch(`tasks/${this.props.task._id}`, {
			method: 'PATCH',
			body: JSON.stringify({
				done: !this.props.task.done
			}),
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((res) => {

			if (res.status === 200) {
				this.props.dispatch(
					todoUpdateState(this.props.task._id)
				);
			}
		});
	}

	onDeleteClick(e){
		e.preventDefault();

		fetch(`tasks/${this.props.task._id}`, {
			method: 'DELETE'
		}).then((res) => {

			if (res.status === 200) {
				this.props.dispatch(
					todoDelete(this.props.task._id)
				);
			}
		});
	}

	render() {

		const done = this.props.task.done;

		return (

			<div className={`modern-task ${done ? 'done' : ''}`}>

				<div className="task-content">

					<h3>
						{this.props.task.name}
					</h3>

					<p>
						{this.props.task.description}
					</p>

				</div>

				<div className="task-actions">

					<span className={`status ${done ? 'status-done' : 'status-todo'}`}>
						{done ? 'Done' : 'Todo'}
					</span>

					<button
						className="btn btn-status"
						onClick={this.onStatusClick}
					>
						Change
					</button>

					<button
						className="btn btn-delete"
						onClick={this.onDeleteClick}
					>
						Delete
					</button>

				</div>

			</div>
		)
	}
}

export default connect()(ToDoTask);