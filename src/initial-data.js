const initialData={
    // List of stories
    stories:{
        'story-1':{id:'story-1'},
        'story-2':{id:'story-2'},
        'story-3':{id:'story-3'},
        'story-4':{id:'story-4'},
    }, 
    // List of columns
    columns:{
        'column-1':{
            id:'column-1',
            title:'Not Started',
            storyIds:['story-1', 'story-2','story-3','story-4'],
        },
        'column-2':{
            id:'column-2',
            title:'In progress',
            storyIds:[],
        },
        'column-3':{
            id:'column-3',
            title:'Done',
            storyIds:[],
        },
    }, 
    columnOrder : ['column-1', 'column-2', 'column-3'],
};

export default initialData;  