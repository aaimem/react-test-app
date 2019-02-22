import React from 'react';
import ReactDOM from 'react-dom';
import 'reset-css';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
    display: flex;
`;


class InnerList extends React.PureComponent {
    render(){
        const { column, storiesMap, index} = this.props;
        const stories = column.storyIds.map(storyId => storiesMap[storyId]);
        return <Column column={column} stories={stories} index={index} />;

    }
}


class App extends React.Component{
    // set app intitial state 
    state = initialData;

    onDragStart = start => {
        const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);

        this.setState({
            homeIndex,
        });
    }
   

    // sync update the state to reflect the drop and drog result
    onDragEnd = result => {
 
        this.setState({
            homeIndex: null,
        });
        const { destination, source, draggableId, type } = result;

        // exit if no destination
        if(!destination){
            return;
        }

        // Check if location of the item changed
        if(destination.droppableId === source.droppableId &&
         destination.index  === source.index   
        ){
            return;
        }

        // Check if user is dropping a story or a column

        if (type==='column'){
            const newColumnOrder= Array.from(this.state.columnOrder);
            newColumnOrder.splice(source.index, 1);
            newColumnOrder.splice(destination.index, 0, draggableId);

            const newState = {
                ...this.state,
                columnOrder: newColumnOrder
            };
            this.setState(newState);
            return;

            
        }

        // reorder the storyIds array between columns
        const start = this.state.columns[source.droppableId];
         const finish = this.state.columns[destination.droppableId];

         // reorder within same column
         if(start === finish){
            // Create new object to avoid mutation
            const newStoryIds = Array.from(start.storyIds);

            // move taskId from its old index to its new one
            newStoryIds.splice(source.index, 1);
            newStoryIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                storyIds: newStoryIds,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            // update state
            this.setState(newState);
            return;
         }

         // Moving from one column to another

         const startStoryIds = Array.from(start.storyIds);
         startStoryIds.splice(source.index, 1);
         const newStart = {
             ...start,
             storyIds: startStoryIds,
         };

         const finishStoryIds = Array.from(finish.storyIds);
         finishStoryIds.splice(destination.index, 0, draggableId);
         const newFinish = {
             ...finish,
             storyIds: finishStoryIds,
         }

         // Updated columns

         const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        // update state
        this.setState(newState);


    
    };
    render(){
        //Render columns by order
        return(
            <DragDropContext onDragEnd= {this.onDragEnd}
                onDragStart= {this.onDragStart}
                // onDragUpdate= {this.onDragUpdate}
            >
                <Droppable 
                    droppableId="all-columns" 
                    direction="horizontal" 
                    type="column"
                >
                    {provided => (
                        <Container
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {this.state.columnOrder.map((columnId, index)=> {
                                const column = this.state.columns[columnId];
                                //stories assosiated to each column
                                const stories = column.storyIds.map((storyId, index)=>this.state.stories[storyId]);

                                const isDropDisabled= index < this.state.homeIndex;
                                return <InnerList
                                            key={column.id} 
                                            column={column} 
                                            storiesMap={this.state.stories} 
                                            index={index}
                                            isDropDisabled={isDropDisabled}
                                        />;
                            })}        
                            {provided.placeholder}
                        </Container>
                    )}

                </Droppable>
     
            </DragDropContext>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));

