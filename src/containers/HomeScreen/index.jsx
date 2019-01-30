// @flow

import React from 'react';
import {
  DragAndDropContext,
  Draggable,
  Droppable
} from 'react-beautiful-dnd';
import {
  CardItem,
  Modal,
  CreateForm
} from '../../components';

export class HomeScreen extends React.Component<Object, Object> {
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
    ],
    editModal: false,
    createModal: false
  }

  render() {
    const {
      state: {
        cardList,
        editModal,
        createModal
      }
    } = this;
    return (
      <React.Fragment>
        <h1>Home</h1>
        <div className="grid">
          <DragAndDropContext>
            <Droppable droppableId="cards">
              {provider => (
                <div>
                  {
                    cardList.map(({
                      id,
                      title,
                      text,
                      color
                    }, index) => (
                      <Draggable index={index} key={id} draggableId={id}>
                        {dragProvider => (
                          <div>
                            <CardItem
                              id={id}
                              title={title}
                              text={text}
                              color={color}
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
        <Modal
          opened={editModal}
          onCloseModal={() => {
            this.setState({
              editModal: false
            });
          }}
        >
          <CreateForm
            onCreate={(createdCard) => {
              this.setState(({ cardList: list }) => ({
                list: [...list, { ...createdCard, id: cardList.length + 1 }]
              }));
            }}
          />
        </Modal>

        <Modal
          opened={createModal}
          onCloseModal={() => {
            this.setState({
              createModal: false
            });
          }}
        >
          <div>
            <h1>modal</h1>
          </div>
        </Modal>
      </React.Fragment>
    );
  }
}
