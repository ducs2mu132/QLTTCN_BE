import React, { Component } from 'react';
import './App.css';
import Control from './components/Control';
import TastList from './components/TaskList';
import TaskForm from './components/TaskForm';
import {connect} from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisplayForm: false,
        filter : {
          name: '',
          status: -1
        },
        keyword: ''
      }
  }

  onToggleForm = () => {
    var {taskEditing} = this.props
    if(taskEditing && taskEditing.id != ''){
        this.props.onOpenForm();
    }
    else{
    this.props.onToggleForm();
    }
    this.props.onClearTask({
      id: '',
      name: '',
      status: false
    });
  }

  onCloseForm = () => {
    //this.props.onCloseForm();
  }

  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    })
  }

  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id); 
    if(index !== -1){
      tasks.splice(index, 1)
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm()
  }

  onUpdateData = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id); 
    var taskEditing = tasks[index];
    this.setState({
      taskEditing: taskEditing
    });
    this.onShowForm();
  }

  findIndex = (id) => {
    var { tasks } = this.state
    var result = -1;
    tasks.forEach((task, index)=>{
      if(task.id === id){
        result = index
      }
    });
    return result;
  }
  onFilter = (filterName, filterStatus) => {
       var filterStatusNum = +filterStatus;
       this.setState({
        filter: {
          name : filterName.toLowerCase(),
          status : filterStatusNum
        }
       });
     
  }
  render(){
    var {filter} = this.state; // var tasks = this.state.tasks
    // if(filter){
    //   if(filter.name){
    //     tasks = tasks.filter((task) => {
    //       return task.name.toLowerCase().indexOf(filter.name) !==-1;
    //     });
    //   }
    //     tasks = tasks.filter((task) => {
    //       if(filter.status === -1){
    //         return task;
    //       }
    //       else{
    //         return task.status === (filter.status === 1 ? true: false);
    //       }
    //     });
    // }


    var {isDisplayForm} = this.props;
 
    return (
      <div className="container">
      <div className="text-center">
        <h1>Quản Lý Công Việc</h1>
        <hr />
      </div>
      <div className="row">
      <div className={ isDisplayForm ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4'
      : ''}>
     <TaskForm/>
      </div>
        <div className={ isDisplayForm ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8'
        : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
          <button
           type="button"
           className="btn btn-primary"
           onClick = { this.onToggleForm }>
           <span className="fa fa-plus mr-5" />Thêm Công Việc
          </button>
          <Control/>
          <TastList
           onFilter = {this.onFilter}
            />
        </div>
      </div>
      </div>
  );
}
}
const mapStateToProps = state => {
  return {
      isDisplayForm : state.toggleReducer,
      taskEditing : state.tasksReducer
  };
}

const mapDispathToProps = (dispatch, props) => {
  return {
    onToggleForm : () => {
        dispatch(actions.toggleForm());
    },
    onClearTask : (task) => {
      dispatch(actions.editTask(task));
  },
    onOpenForm : () => {
      dispatch(actions.openForm());
  }
  };
}
export default connect (mapStateToProps, mapDispathToProps) (App);
