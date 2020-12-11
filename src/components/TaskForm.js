import React, {Component} from 'react';
import * as actions from '../actions/index';
import {connect} from 'react-redux';
//import toggleReducer from '../reducers/toggleReducer';

class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id :'',
      name : '',
      status : false
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if(nextProps && nextProps.taskEditing){
      this.setState({
        id: nextProps.taskEditing.id,
        name: nextProps.taskEditing.name,
        status: nextProps.taskEditing.status
      });
    }else {
      this.onClear();
    }
  }

  onClear = () => {
    this.setState({
      name : '',
      status : false
    })
  }

  onSave = (event) => {
    event.preventDefault();
    this.props.onSaveTask(this.state)
    this.onClear();
    this.onCloseForm();
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name === 'status'){
      value = target.value === 'true'? true : false
    }
    this.setState({
      [name] : value
    });
  }

  onCloseForm = () =>{
    this.props.onCloseForm();
  }

    render(){
      var {id} = this.state;
      if(!this.props.isDiplayForm) return '';
      return (
            <div className="panel panel-warning">
              <div className="panel-heading">
                <h3 className="panel-title">
                { id !== '' ? 'Cập nhật công việc' : 'Thêm Công Việc' }
                  <span
                  className="fa fa-times-circle text-right"
                  onClick={ this.onCloseForm }
                  ></span>
                </h3>
              </div>
              <div className="panel-body">
                <form onSubmit = {this.onSave}>
                  <div className="form-group">
                    <label>Tên :</label>
                    <input
                    type="text"
                    className="form-control" 
                    name = "name"
                    value= {this.state.name}
                    onChange={this.onChange}
                    />
                  
                  </div>
                  <label>Trạng Thái :</label>
                  <select
                  className="form-control"
                  required="required"
                  name = "status"
                  value={this.state.status}
                  onChange={this.onChange}
                  >
                    <option value={true}>Kích Hoạt</option>
                    <option value={false}>Ẩn</option>
                  </select>
                  <br />
                  <div className="text-center">
                    <button type="submit" className="btn btn-warning">Save</button>&nbsp;
                    <button type="submit" className="btn btn-danger" onClick={this.onClear}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
        );
      }
}

const mapStateToProps = (state) => {
  return {
    isDiplayForm : state.toggleReducer,
    taskEditing : state.editTaskReducer
  }
}

// Chuyển action lên reducer để thực thi
const mapDispatchToProps = (dispatch, props) => {
  return {
    onSaveTask: (task) => {
      dispatch(actions.saveTask(task))
    },
    onCloseForm : () => {
      dispatch(actions.closeForm());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
