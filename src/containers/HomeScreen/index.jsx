// @flow

import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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

import { createCardRequest } from '../../redux/cards/actions';


export class Home extends React.Component<Object, Object> {
  state = {
    cardList: [
      {
        id: '1',
        title: 'Card1',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora!',
        importancy: 'default',
        color: '#ffffff',
        disabled: false
      },
      {
        id: '2',
        title: 'Card2',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora!',
        importancy: 'default',
        color: '#ffffff',
        disabled: false
      },
      {
        id: '3',
        title: 'Card3',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora!',
        importancy: 'default',
        color: '#ffffff',
        disabled: false
      },
      {
        id: '4',
        title: 'Card4',
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, tempora!',
        importancy: 'default',
        color: '#ffffff',
        disabled: false
      }
    ],
    filter: 'default',
    editModal: false,
    createModal: false
  }

  onDragEnd = ({
    source,
    destination,
  }: Object) => {
    if (!destination) return;
    type DroppableId = 'cards';
    const sourceId: DroppableId = source.droppableId;
    const destinationId: DroppableId = destination.droppableId;

    const {
      cardList = []
    } = this.state;

    const sourceAnswers = sourceId === 'cards' ? cardList : [];
    const destinationAnswers = destinationId !== 'cards' ? [] : cardList;

    const destinationAnswersMaxCount: number = ({
      cards: 1000,
    }[destinationId] || 1000);

    const sourceAnswersUpdated = [...sourceAnswers];
    // use same list if sourceId === destinationId
    const destinationAnswersUpdated = sourceId === destinationId
      ? sourceAnswersUpdated
      : [...destinationAnswers];

    const [removed] = sourceAnswersUpdated.splice(source.index, 1);
    // swap items if destination list is filled
    if (destinationAnswers.length === destinationAnswersMaxCount && sourceId !== destinationId) {
      const [removedDest] = destinationAnswersUpdated.splice(destination.index, 1);
      sourceAnswersUpdated.splice(source.index, 0, removedDest);
    }
    destinationAnswersUpdated.splice(destination.index, 0, removed);

    this.setState({
      [sourceId]: sourceAnswersUpdated,
      [destinationId]: destinationAnswersUpdated,
    });
  };

  get FilteredCards() {
    const {
      state: {
        cardList,
        filter: filterParam
      }
    } = this;
    return cardList.filter((item: Object) => (item.importancy === filterParam));
  }

  render() {
    const {
      state: {
        cardList,
        editModal,
        createModal,
        filter
      },
      FilteredCards,
      onDragEnd
    } = this;
    return (
      <React.Fragment>
        <h1>Home</h1>
        <div className="grid">
          <button
            onClick={() => {
              this.setState({ createModal: true });
            }}
          >
            <div>
              <button onClick={() => { this.setState({ filter: '' }); }}>All</button>
              <button onClick={() => { this.setState({ filter: 'default' }); }}>Default</button>
              <button onClick={() => { this.setState({ filter: 'important' }); }}>Important</button>
              <button onClick={() => { this.setState({ filter: 'veryImportant' }); }}>Very Important</button>
            </div>
            + Add Item
          </button>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="cards">
              {(
                provided => (
                  <div ref={provided.innerRef}>
                    {(filter ? cardList : FilteredCards).map(({
                        id,
                        title,
                        text,
                        color,
                        disabled
                      }, index) => (
                        <Draggable index={index} key={id} draggableId={id}>
                          {({ innerRef }, { isDragging }) => (
                            <div ref={innerRef}>
                              <CardItem
                                id={id}
                                title={title}
                                text={text}
                                color={color}
                                disabled={disabled}
                                style={{
                                  border: isDragging
                                  ? '2px solid #cc0000'
                                  : '1px solid #2b2b2b'
                                }}
                                onDeleteItem={() => {
                                    this.setState(({ cardList: list }) => ({
                                      cardList: list.filter(card => card.id !== id)
                                    }));
                                }}
                                onEditItem={() => {
                                  this.setState({
                                    editModal: true
                                  });
                                }}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))
                    }
                    {provided.placeholder}
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

export const HomeScreen = connect(
  state => ({
    cardList: state.cardList
  }),
  dispatch => ({
    cardActions: bindActionCreators({ createCardRequest }, dispatch)
  })
)(Home);
