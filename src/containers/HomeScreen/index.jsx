import React from 'react';
import {
  DragAndDropContext,
  Draggable,
  Droppable
} from 'react-beautiful-dnd';
import { CardItem } from '../../components';

export class HomeScreen extends React.Component {
  state = {
    cardList: [
      {
        id: '1',
        title: 'Card1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora!'
      },
      {
        id: '2',
        title: 'Card2',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora!'
      },
      {
        id: '3',
        title: 'Card3',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora!'
      },
      {
        id: '4',
        title: 'Card4',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora!'
      }
    ]
  }

  render() {
    const {
      state: {
        cardList
      }
    } = this;
    return (
      <React.Fragment>
        <h1>Home</h1>
        <div className="grid">
          <DragAndDropContext>
            <Droppable droppableId="cards">
              {(provider, snapshot) => (
                <div>
                  {
                    cardList.map(({
                      id,
                      title,
                      text
                    }, index) => (
                      <Draggable index={index} key={id} draggableId={id}>
                        {(dragProvider, dragSnapshot) => (
                          <div>
                            <CardItem
                              id={id}
                              title={title}
                              text={text}
                              onDeleteItem={() => {
                                  this.setState(({ cardList: list }) => ({
                                    cardList: list.filter(card => card.id !== id)
                                  }));
                                }}
                              onEditItem={() => {}}
                            />
                            { dragProvider }
                          </div>
                        )}
                      </Draggable>
                    ))
                  }
                  { provider }
                </div>
              )}
            </Droppable>
          </DragAndDropContext>
        </div>
      </React.Fragment>
    );
  }
}
