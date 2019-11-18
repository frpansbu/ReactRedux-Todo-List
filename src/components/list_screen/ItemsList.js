import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';

import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
//import ItemScreen from '../item_screen/ItemScreen.js';

class ItemsList extends React.Component {
    addItem = () =>{
        const todoList = this.props.todoList;
        
        //this.props.history.push('/todoList/' + todoList.id + '/item/' + this.todoList.length);
        return(
            <Link to={'/todoList/' + todoList.id + '/item/' + todoList.length}>

            </Link>
        )
    }
    render() {
        let counter = 0;
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                {items && items.map(function(item) {
                    item.id = item.key;
                    item.index = counter;
                    counter++;
                    return (
                        //<Link to={'/todoList/' + todoList.id + '/item/' + item.id} key={todoList.id}>
                            <ItemCard todoList={todoList} item={item} />
                        //</Link>
                    );})
                }
                <div className = "add-item green lighten-4" id = "add-item-button"
                onClick = {this.addItem.bind(this)}
                >
                    +
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
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
    
)(ItemsList);

