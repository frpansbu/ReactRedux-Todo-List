import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';

import {getFirestore} from 'redux-firestore';
import {Modal, Button} from 'react-materialize';


class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;
        const fireStore = getFirestore();
        const todoList = this.props.todoList;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));
        if(target.id == "name"){
            fireStore.collection('todoLists').doc(todoList.id).update({
                name: target.value,
            });
        }else{
            fireStore.collection('todoLists').doc(todoList.id).update({
                owner: target.value,
            });
        }
    }

    deleteAction = (e) =>{
        const fireStore = getFirestore();
        const todoList = this.props.todoList;
        this.props.history.push("/");
        fireStore.collection('todoLists').doc(todoList.id).delete();
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <div className="container white">
                <div className="seperator">
                    <h3 className="grey-text text-darken-3">Todo List
                    <Modal header="Delete List?"
                    trigger={<Button id = "list_trash" 
                    data-target="delete-modal" >&#128465;</Button>}
                    actions = {
                        <div>
                            <Button modal="close" waves="light" className="red darken-2" onClick={ this.deleteAction.bind(this) }>Yes</Button>
                            <Button flat modal="close" waves="light">No</Button>   
                        </div>
                    }
                    >
                    <h5>Are you sure you want to delete this list?</h5>
                    This list will not be retrievable.
                    </Modal>
                    </h3>
                </div>
                <div className="input-field">
                    <label htmlFor="email" class = "active">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} defaultValue={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password" class = "active">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} defaultValue={todoList.owner} />
                </div>
                <div className = "column-headers red lighten-2">
                    <div className = "task-header">Task</div>
                    <div className = "due-date-header" >Due Date</div>
                    <div className = "status-header" >Status</div>
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

  return {
    todoList,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'todoLists' },
  ]),
)(ListScreen);