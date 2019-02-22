import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  CreateFormWithHooks
} from '../../components';

import { createCardRequest } from '../../redux/cards/actions';

const Home = () => {
  const [cardList, useList] = useState([
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
  ]);
  const [editModal, useEdit] = useState(false);
  const [selectedId, selectId] = useState('');
  const [createModal, useCreate] = useState(false);

  const onDragEnd = ({
    source,
    destination,
  }: Object) => {
    if (!destination) return;
    type DroppableId = 'cards';
    const sourceId: DroppableId = source.droppableId;
    const destinationId: DroppableId = destination.droppableId;

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

    useList(destinationAnswersUpdated);
  };

  const SelectedCard = () => cardList.find(item => item.id === selectedId);

  return (
    <React.Fragment>
      <h1>Home</h1>
      <button style={{ margin: '15px auto' }} onClick={() => { useCreate(true); }}>
          + Add Item
      </button>
      <div className="grid">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="column">
            <Droppable droppableId="cards">
              {(
              provided => (
                <div ref={provided.innerRef}>
                  {
                    cardList.map(({
                      id,
                      title,
                      text,
                      color,
                      disabled
                    }, index) => (
                      <Draggable index={index} key={id} draggableId={id}>
                        {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
                          <div
                            ref={innerRef}
                            {...draggableProps}
                            {...dragHandleProps}
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
                                useList(cardList.filter(card => card.id !== id));
                              }}
                              onEditItem={() => {
                                useEdit(true);
                                selectId(id);
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
          </div>
        </DragDropContext>
      </div>

      <Modal
        opened={createModal}
        onCloseModal={() => {
          useCreate(false);
        }}
      >
        <CreateFormWithHooks
          onSubmit={(createdCard) => {
            useList([...cardList, { ...createdCard, id: cardList.length + 1 }]);
          }}
        />
      </Modal>

      <Modal
        opened={editModal}
        onCloseModal={() => {
          useEdit(false);
        }}
      >
        <CreateFormWithHooks
          {...SelectedCard}
          onSubmit={(editedCard) => {
            useList([...cardList, { ...editedCard, id: cardList.length + 1 }]);
          }}
        />
      </Modal>
    </React.Fragment>
  );
};

export const HomeScreen = connect(
  state => ({
    cardList: state.cardList
  }),
  dispatch => ({
    cardActions: bindActionCreators({ createCardRequest }, dispatch)
  })
)(Home);

Home.propTypes = {
  createCardRequest: PropTypes.func.isRequired
};
