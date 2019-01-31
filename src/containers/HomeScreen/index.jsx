// @flow

import React from 'react';
import {
  DragDropContext,
  Draggable,
  Droppable
} from 'react-beautiful-dnd';
import {
  CardItem,
  Modal,
  CreateForm,
  EditForm
} from '../../components';

export class HomeScreen extends React.Component<Object, Object> {
  state = {
    cardList: [
      {
        id: '1',
        title: 'Card1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora!',
        color: '#ffffff'
      },
      {
        id: '2',
        title: 'Card2',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora!',
        color: '#ffffff'
      },
      {
        id: '3',
        title: 'Card3',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora!',
        color: '#ffffff'
      },
      {
        id: '4',
        title: 'Card4',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora!',
        color: '#ffffff'
      }
    ],
    editModal: false,
    createModal: false
  }

  onDragEnd = () => {

  }

  render() {
    const {
      state: {
        cardList,
        editModal,
        createModal
      },
      onDragEnd
    } = this;
    return (
      <React.Fragment>
        <h1>Home</h1>
        <div className="grid">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="cards">
              {(
                provided => (
                  <div ref={provided.innerRef}>
                    {
                      cardList.map(({
                        id,
                        title,
                        text,
                        color
                      }, index) => (
                        <Draggable index={index} key={id} draggableId={id}>
                          {dragProvider => (
                            <div ref={dragProvider.innerRef}>
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
                            </div>
                          )}
                        </Draggable>
                      ))
                    }
                  </div>
                )
              )}
            </Droppable>
          </DragDropContext>
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
          <EditForm
            onEdit={(editedCard) => {
              this.setState(({ cardList: list }) => ({
                list: [...list, { ...editedCard, id: cardList.length + 1 }]
              }));
            }}
          />
        </Modal>
      </React.Fragment>
    );
  }
}
