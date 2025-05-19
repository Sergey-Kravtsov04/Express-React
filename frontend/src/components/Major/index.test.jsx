import {render,screen} from "@testing-library/react"
import {Major} from ".";
import { Provider} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { majorsReducer } from "../../redux/slices/majors";
import { usersReducer } from "../../redux/slices/users";
import { authReducer } from "../../redux/slices/auth";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom/extend-expect';

const store = configureStore({
    reducer: {
      majors:majorsReducer,
      users: usersReducer,
      auth: authReducer,
    },
  });

  const mockState = {users:{
    _id:"6804f8e6f2b4dec3234d4c24",
    fullName:"Иванов Иван Иванович",
    email:"ivan676@mail.ru"
  }
}
const mockReducer = (state = mockState) => state;
const mockStore = configureStore(
    {reducer:{
    majors:majorsReducer,
      users: mockReducer,
      auth: authReducer,
    }});

describe("Major tests",()=>{
    test("There is no applicants",()=>{
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Major _id="test" title="test" description="test" isFullPost/> //Несуществующий _id,что бы не было абитуриентов
                </Provider>
            </BrowserRouter>
        )
        expect(screen.getByText(/Абитуриентов еще нет/i)).toBeInTheDocument();
    })
    test("There is applicants",()=>{
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Major _id="67ff839a21bd30ba508665df" isFullPost/>
                </Provider>
            </BrowserRouter>
        )
        expect(screen.getByText(/id: 6804f8e6f2b4dec3234d4c24/i)).toBeInTheDocument();
    })
    test("Some content",()=>{
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Major _id="67ff839a21bd30ba508665df" isFullPost/>
                </Provider>
            </BrowserRouter>
        )

        expect(screen.getByRole("heading",{level:2})).toBeInTheDocument();
        expect(screen.getByRole("heading",{level:3})).toBeInTheDocument();
    })
})