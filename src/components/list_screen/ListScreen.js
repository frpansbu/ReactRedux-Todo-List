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
                    <Modal header="Modal Header"
                    trigger={<Button id = "list_trash" 
                    data-target="delete-modal" >&#128465;</Button>}
                    //add actions(buttons) here
                    >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    </Modal>
                    </h3>
                </div>
                <div className="input-field">
                    <label htmlFor="email">Name</label>
                    <input className="active" type="text" name="name" id="name" onChange={this.handleChange} defaultValue={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password">Owner</label>
                    <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} defaultValue={todoList.owner} />
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