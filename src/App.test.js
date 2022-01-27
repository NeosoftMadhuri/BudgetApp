// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
import React from "react";
import {mount} from 'enzyme'
import App from "./App";
import Dashboard from './Components/Dashboard'
describe('The input field',()=>{
  // let wrapper;
  // beforeEach(()=>{
  //   wrapper=mount(<App/>);
  // })
  const wrapper=mount(<Dashboard/>)
  it('form contains a inputfield',()=>{
    expect(wrapper.find('.inputField')).toBeTruthy()
  })

})