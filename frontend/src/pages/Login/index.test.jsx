import {render,screen,fireEvent, findByText} from "@testing-library/react"
import { Login } from ".";
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

describe(("Login tests"),()=>{
    test('All labels',()=>{
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Login/>
                </Provider>
            </BrowserRouter>
        )
        expect(screen.getByText(/Вход в аккаунт/i)).toBeInTheDocument();
        expect(screen.getByText(/Войти/i)).toBeInTheDocument();
    });
    test('There is submit button',()=>{
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Login/>
                </Provider>
            </BrowserRouter>
        )
        expect(screen.getByRole("button",{name:/Войти/i})).toBeInTheDocument();
    });
    test('Click without data in the rows', async ()=>{
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Login/>
                </Provider>
            </BrowserRouter>
        )
        fireEvent.click(screen.getByText(/Войти/i))

        expect(await screen.getByText(/Войти/i)).toBeInTheDocument('Укажите почту');
        expect(await screen.getByText(/Войти/i)).toBeInTheDocument('Укажите пароль');
    });
    
})