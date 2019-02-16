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
  CreateFormWithHooks,
  EditFormWithHooks
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
    filterParam: 'default',
    editModal: false,
    selectedId: '',
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
      cardList,
      filterParam
    } = this.state;

    return cardList.filter(item => (item.importancy === filterParam));
  }

  get SelectedCard() {
    const {
      cardList,
      selectedId
    } = this.state;

    return cardList.find(item => item.id === selectedId);
  }

  render() {
    const {
      state: {
        cardList,
        editModal,
        createModal,
        filterParam
      },
      FilteredCards,
      onDragEnd,
      SelectedCard
    } = this;
    return (
      <React.Fragment>
        <h1>Home</h1>
        <div className="grid">

          {/* <div>
            <button onClick={() => { this.setState({ filterParam: '' }); }}>All</button>
            <button onClick={() => { this.setState({ filterParam: 'default' }); }}>Default</button>
            <button onClick={() => { this.setState({ filterParam: 'important' }); }}>Important</button>
            <button onClick={() => { this.setState({ filterParam: 'veryImportant' }); }}>Very Important</button>
          </div> */}

          <button
            className="btn btn-md"
            onClick={() => {
              this.setState({ createModal: true });
            }}
          >
            + Add Item
          </button>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="cards">
              {provided => (
                <div className="grid" ref={provided.innerRef}>
                  {(filterParam ? cardList : FilteredCards).map(
                      ({
                        id, title, text, color, disabled
                        }, index) => (
                          <Draggable index={index} key={id} draggableId={id}>
                            {(provided, { isDragging }) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
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
                                                            cardList: list.filter(
                                                              card => card.id !== id
                                                            )
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
                                              )
                    )}
                  {provided.placeholder}
                </div>
                )}
            </Droppable>
          </DragDropContext>
        </div>

        <Modal
          opened={createModal}
          onCloseModal={() => {
            this.setState({
              createModal: false
            });
          }}
        >
          <CreateFormWithHooks
            onCreate={(createdCard) => {
              this.setState(state => ({
                cardList: [
                  ...state.cardList,
                  { ...createdCard, id: state.cardList.length + 1 }
                ],
                createModal: false
              }));
            }}
          />
        </Modal>

        <Modal
          opened={editModal}
          onCloseModal={() => {
            this.setState({
              editModal: false
            });
          }}
        >
          <EditFormWithHooks
            {...SelectedCard}
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
