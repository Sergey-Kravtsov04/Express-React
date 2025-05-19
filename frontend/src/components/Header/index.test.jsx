import {render,screen} from "@testing-library/react"
import { Header } from "."
import { Provider } from 'react-redux';
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


describe("Header tests", ()=>{
    test('There is header text',()=>{
        render(
           <BrowserRouter>
            <Provider store={store}>
                <Header />
            </Provider>
           </BrowserRouter>
          );
        const linkElement = screen.getByText(/Приемная комиссия 2025/i);
        expect(linkElement).toBeInTheDocument();
    });
    test('There is log in button',()=>{
      render(
         <BrowserRouter>
          <Provider store={store}>
              <Header />
          </Provider>
         </BrowserRouter>
        );
        expect(screen.getByText(/Войти/i)).toBeInTheDocument();
        expect(screen.getByRole("button",{name:/Войти/i})).toBeInTheDocument();
  });
  test('There is register button',()=>{
    render(
       <BrowserRouter>
        <Provider store={store}>
            <Header />
        </Provider>
       </BrowserRouter>
      );
      expect(screen.getByText(/Создать аккаунт/i)).toBeInTheDocument();
      expect(screen.getByRole("button",{name:/Создать аккаунт/i})).toBeInTheDocument();
  });
  test('Only two buttons(no hiddens)',()=>{
    render(
       <BrowserRouter>
        <Provider store={store}>
            <Header />
        </Provider>
       </BrowserRouter>
      );
      expect(screen.getAllByRole("button").length).toBe(2);
  });

});

