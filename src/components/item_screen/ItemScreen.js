import React from 'react';
import {getFirestore} from 'redux-firestore';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

class ItemScreen extends React.Component{
    constructor(props){
        super(props);
    }
    state = {
            newDesc: '',
            newAssign: '',
            newDate: '',
            newStatus: false,
    }
    
    

    goBack = () =>{
        var str = window.location.href;
        var listID = str.substr(
            str.lastIndexOf("List/") + 5, str.lastIndexOf("/item")
        );
        listID = listID.substr(
            0, listID.indexOf("/")
        );
        this.props.history.push('/todoList/' + listID);
    }

    changeDesc = (e) =>{
        const { target } = e;
        this.setState({newDesc: target.value});
        
    }
    changeAssign = (e) =>{
        const { target } = e;
        this.setState({newAssign: target.value});
        
    }
    changeDate = (e) =>{
        const { target } = e;
        this.setState({newDate: target.value});
        
    }
    changeStatus = (e) =>{
        const { target } = e;
        this.setState({newStatus: target.checked});
    }
    
    submit = () =>{
        const fireStore = getFirestore();
        var str = window.location.href;
        var listID = str.substr(
            str.lastIndexOf("List/") + 5, str.lastIndexOf("/item")
        );
        listID = listID.substr(
            0, listID.indexOf("/")
        );
        var itemIndex = str.substr(
            str.lastIndexOf("/") + 1, str.length
        );
        var todoListRef = fireStore.collection("todoLists").doc(listID);
        var value = (Math.floor(Math.random() * 1000 + 30));
        /*if(itemIndex != -1){
            todoListRef.get().then(function(doc){
                if (doc.exists){
                    console.log(doc.data().items[itemIndex].key);
                    value = (doc.data().items[itemIndex].key);
                    
                }
            });
        }*/

        const newItem = {
            "key": value,
            "description": this.state.newDesc,
            "due_date": this.state.newDate,
            "assigned_to": this.state.newAssign,
            "completed": this.state.newStatus
        }

        console.log(this.state.newDesc)
        console.log(this.state.newAssign)
        console.log(this.state.newDate)
        console.log(this.newStatus)
        console.log("key: "+ value);
        console.log("index: " + itemIndex);
        
        todoListRef.get().then(function(doc){
            if (doc.exists){
                let temp = (doc.data().items);
                if(itemIndex != -1){
                    temp[itemIndex] = newItem;
                }else{
                    temp.push(newItem);
                }
                fireStore.collection("todoLists").doc(listID).update({
                    items: temp
                });
            }
        })
        var str = window.location.href;
        var listID = str.substr(
            str.lastIndexOf("List/") + 5, str.lastIndexOf("/item")
        );
        listID = listID.substr(
            0, listID.indexOf("/")
        );
        this.props.history.push('/todoList/' + listID);
    }
    render(){
        
        return(
            <div>
            <h3 id="item_heading">Item</h3>
            <div id="item_form_container">
                <div id="item_description_prompt" class="item_prompt">Description:</div>
                <input id="item_description_textfield" class="item_input" type="input" 
                defaultValue = {this.state.newDesc}
                onChange = {this.changeDesc}
                />
                <div id="item_assigned_to_prompt" class="item_prompt">Assigned To:</div>
                <input id="item_assigned_to_textfield" class="item_input" type="input" 
                defaultValue = {this.state.newAssign}
                onChange = {this.changeAssign}
                />
                <div id="item_due_date_prompt" class="item_prompt">Due Date:</div>
                <input id="item_due_date_picker" class="item_input" type="date" 
                defaultValue = {this.state.newDate}
                onChange = {this.changeDate}
                />
                <p>
                    <label>
                    <input type="checkbox" 
                    defaultValue = {this.state.newDate}
                    onChange = {this.changeStatus}
                    />
                    <span>Completed?</span>
                    </label>
                </p>
                
                
                
            </div>
                <button id="item_form_submit_button" class="item_button"
                onClick = {this.submit.bind(this)}
                >Submit</button>
                <button id="item_form_cancel_button" class="item_button"
                onClick = {this.goBack.bind(this)}
                >Cancel</button>
            </div>
        
        )
    }
    
}

export default withRouter(ItemScreen);
