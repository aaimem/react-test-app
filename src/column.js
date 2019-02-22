// Column Component
import React from 'react'
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Story from './story';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 220px;
    background-color: white;
    display:flex;
    flex-direction: column;
`;
const Title = styled.h3`
    font-weight: bold
    padding: 8px;
`;
const StoryList = styled.div`
    padding: 8px;
    transition: background-color 0.2s ease;
    background-color:${props => (props.isDraggingOver ? 'lightgrey':'inherit')};
    flex-grow: 1;
    min-height: 100px;
`;



class InnerList extends React.Component {

    shouldComponentUpdate(nextProps){
        if(nextProps.stories === this.props.stories){
            return false;
        }

        return true;
    }

    render(){
        return this.props.stories.map((story, index) => (
            <Story key={story.id} story={story} index={index} />
        ));
    }
}

export default class Column extends React.Component {
    render(){
        return (
            <Draggable draggableId={this.props.column.id} index={this.props.index}>
                {provided=>(
                    <Container
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                    >
                    <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
                         <Droppable 
                             droppableId= {this.props.column.id}
                             type="story"
                             // type={this.props.column.id === 'column-3' ? 'done' : 'active'}
                             isDropDisabled = {this.props.isDropDisabled}
                         >
     
                             {(provided, snapshot) => (
                             <StoryList   
                                 {...provided.droppableProps}     
                                 ref={provided.innerRef}
                                 isDraggingOver={snapshot.isDraggingOver}              
                             >
                                 {/* {this.props.stories.map((story, index) => <Story key={story.id} story={story} index={index} />)} */}
                                 <InnerList stories={this.props.stories} />
                                 {provided.placeholder}
                             </StoryList>)}
                         </Droppable>
                     </Container>
                )}
            </Draggable>
        )    
    }
}
