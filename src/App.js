import React from 'react';
import Customer from './components/Customer'
import './App.css';

/*function App() {
  return (
    <Customer/>

  );
}*/

const customers = [
 {
  'id':1,
  'image':'https://placeimg.com/64/64/1',
  'name':'박미안',
  'birthday':'770210',
  'gender':'male',
  'job':'대학생'
 },
 {
  'id':2,
  'image':'https://placeimg.com/64/64/2',
  'name':'박미1',
  'birthday':'770210',
  'gender':'male',
  'job':'대학생'
 },
 {
  'id':3,
  'image':'https://placeimg.com/64/64/3',
  'name':'박미2',
  'birthday':'770210',
  'gender':'male',
  'job':'대학생'
 }
]


class App extends React.Component {
  render() {
    return (
      <div>

        {
          customers.map(x=> {
            return (
              <Customer 
                key={x.id}
                id={x.id} 
                image={x.image}
                name={x.name}
                birthday={x.birthday}
                gender={x.gender}
                jon={x.job}
              />
            );
          })
        }
      </div>
      
    )
  }
}

export default App;
