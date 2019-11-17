import React from 'react';
import {Icon, Button} from 'react-materialize'

class ItemCard extends React.Component {
    test = () =>{
        console.log("test" + this.props.item.index);
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
            <div className="card z-depth-0 todo-list-link pink lighten-4" onClick = {this.test}>
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
                        >
                        <Button floating large className="blue" /*onClick = {this.props.swapAbove}*/>&#x21e7;</Button>
                        <Button floating large className="green">&#x21e9;</Button>
                        <Button floating large className="red">&#10005;</Button>
                    </Button>
                </div>
            </div>
        );
    }
}
export default ItemCard;