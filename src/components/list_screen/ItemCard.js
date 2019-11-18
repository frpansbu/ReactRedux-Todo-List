import React from 'react';
import {Icon, Button} from 'react-materialize'
import {getFirestore} from 'redux-firestore';
import {Link} from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
class ItemCard extends React.Component {
    
    moveUp = (e) =>{
        e.stopPropagation();
        const fireStore = getFirestore();
        const todoList = this.props.todoList;
        const temp = todoList.items;
        const index = this.props.item.index;
        if(index != 0){
            const tempObj = temp[index-1];
            temp[index-1] = temp[index];
            temp[index] = tempObj
        }
        fireStore.collection("todoLists").doc(todoList.id).update({
            items: temp
        });
    }

    moveDown = (e) =>{
        e.stopPropagation();
        const fireStore = getFirestore();
        const todoList = this.props.todoList;
        const temp = todoList.items;
        const index = this.props.item.index;
        if(index != temp.length-1){
            const tempObj = temp[index+1];
            temp[index+1] = temp[index];
            temp[index] = tempObj
        }
        fireStore.collection("todoLists").doc(todoList.id).update({
            items: temp
        });
    }

    deleteItem = (e) =>{
        e.stopPropagation();
        const fireStore = getFirestore();
        const todoList = this.props.todoList;
        const temp = todoList.items;
        const index = this.props.item.index;
        
        for(var i = index; i < this.props.todoList.items.length - 1; i++){
            temp[i] = temp[i+1];
        }
        temp.pop();
        fireStore.collection("todoLists").doc(todoList.id).update({
            items: temp
        });
    }

    editItem = (e) =>{
        const todoList = this.props.todoList;
        /*return(
            <Link to={'/todoList/' + todoList.id + '/item/' + this.props.item.id} key={todoList.id}>
            </Link>
        )*/
        this.props.history.push('/todoList/' + todoList.id + '/item/' + this.props.item.id);
        
    }

    render() {
        const { item } = this.props;  
        let statusText = "Completed";
        let statusClass = "list_item_card_completed";
        if (!item.completed){
            statusClass = "list_item_card_not_completed";
            statusText = "Pending";
        }
        
        
        return (
            <div className="card z-depth-0 todo-list-link pink lighten-4" >
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{item.description}</span>    
                    <span className = "card-assigned">Assigned To: {item.assigned_to}</span>
                    <span className = "card-due">{item.due_date}</span>
                    <span className = {statusClass}>{statusText}</span>
                    <Button
                        floating
                        fab={{direction: 'left'}}
                        className="red"
                        small
                        onClick = {this.editItem.bind(this)}
                        >
                        <Button floating large className="blue" onClick={this.moveUp.bind(this)}>&#x21e7;</Button>
                        <Button floating large className="green" onClick={this.moveDown.bind(this)}>&#x21e9;</Button>
                        <Button floating large className="red" onClick={this.deleteItem.bind(this)}>&#10005;</Button>
                    </Button>
                </div>
            </div>
        );
    }
}
export default withRouter(ItemCard);