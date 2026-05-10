import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import ToDoTask from './ToDoTask';

class ToDoList extends React.Component {

	render() {

		return (

			<div className="todo-page">

				<div className="todo-container">

					<div className="todo-header">

						<h1>
							My Tasks
						</h1>

						<NavLink
							to="/add"
							className="add-task-link"
						>
							<span style={{marginRight: '8px'}}>✚</span>
							Add Task
						</NavLink>

					</div>

					{
						this.props.tasks.length === 0
						?
						<div className="empty-tasks">
							No tasks yet 
						</div>
						:
						this.props.tasks.map((task) => {

							return (
								<ToDoTask
									key={task._id}
									task={task}
								/>
							)
						})
					}

				</div>

			</div>
		)
	}
}

function mapStateProps(state){
	return {
		tasks: [...state.tasks]
	}
}

export default connect(mapStateProps)(ToDoList);