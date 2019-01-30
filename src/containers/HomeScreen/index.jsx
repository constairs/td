import React from 'react';
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
          {
            cardList.map(({
              id,
              title,
              text
            }) => (
              <CardItem
                key={id}
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
            ))
          }
        </div>
      </React.Fragment>
    );
  }
}
