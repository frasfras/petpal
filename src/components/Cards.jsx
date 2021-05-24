import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Card, CardTitle, CardBody, CardActions } from '@progress/kendo-react-layout';

export const Cards = () => {
  return <div style={{
    display: 'flex',
    justifyContent: 'space-evenly'
  }}>
            <div className='k-card-list'>
              <Card style={{
        width: 200
      }}>
                <CardBody>
                  <CardTitle>Card Title</CardTitle>
                  <CardTitle>Card Subtitle</CardTitle>
                   <img src='https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/51586265/2/?bust=1621389638&width=300' /> 
                  <p>Some quick example text to build on the card title and make up the bulk of the card content.</p>
                </CardBody>
                <CardActions>
                  <span className="k-button k-flat k-primary">Action 1</span>
                  <span className="k-button k-flat k-primary">Action 2</span>
                </CardActions>
              </Card>
              
            </div>
          </div>;
};

export default Cards;