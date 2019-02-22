// Story component
import React from 'react'
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';


const Container = styled.div`
    border: 1px solid lightgrey;
    border-radius: 2px;
    padding: 8px;
    margin-bottom: 8px;
    background-color:${props => (props.isDragging ? 'lightgreen':'white')};

    display:flex;
`;

const Handle = styled.div`
    width: 20px;
    height: 20px;
    background-color: orange;
    border-radius: 4px;
    margin-right: 8px;
`;
export default class Story extends React.Component {
    render(){
        const isDragDisabled = this.props.story.id ==='story-3';
        return (
            <Draggable 
                draggableId={this.props.story.id} 
                index={this.props.index}
                isDragDisabled= {isDragDisabled}
            >
                {(provided, snapshot) => (
                    <Container
                        {...provided.draggableProps}
                        // {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                        isDragDisabled={isDragDisabled}
                    >
                    <Handle {...provided.dragHandleProps}/>
                        {this.props.story.content}
                    </Container>
                )}
            </Draggable>
           
        )
    }
}

