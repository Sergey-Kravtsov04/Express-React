import React, { useEffect } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import styles from './Login.module.scss';
import { useDispatch,useSelector } from "react-redux";
import { fetchUserRegister,isAuthSelector } from "../../redux/slices/auth";
import {useForm} from 'react-hook-form';
import {Navigate} from "react-router-dom"
import { fetchMajors } from '../../redux/slices/majors';
import { MenuItem } from '@mui/material';


export const Registration = () => {

  const dispatch = useDispatch();
    const isAuth = useSelector(isAuthSelector);
    const {majors} = useSelector(state => state.majors)    
    useEffect(()=>{
      dispatch(fetchMajors());
    },[])
    const majorsItems = Object.keys(majors.items).map(key => majors.items[key]);  
    const {register,handleSubmit,setError,formState:{errors,isValid}} = useForm({
      defaultValues:{
        fullName:'',
        email:'',
        password:'',
        major:''
      },
      mode:"onChange"
    })
    const isMajorsLoading = majors.status === "loading";
    if(isMajorsLoading){
      return 0;
    }

    const onSubmit = async (values) =>{
        const data = await dispatch(fetchUserRegister(values))
        if(!data.payload){
          return alert("Не удалось зарегистрироваться")
        }
    
        if("token" in data.payload){
          window.localStorage.setItem("token",data.payload.token)
        }
      }
    
      if(isAuth){
        return <Navigate to="/"/>
      }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)} method="POST">
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <TextField 
      error={Boolean(errors.fullName?.message)}
      helperText={errors.fullName?.message}
      {...register('fullName',{required:'Укажите полное имя'})}
      className={styles.field} label="Полное имя" fullWidth />
      <TextField 
      error={Boolean(errors.email?.message)}
      helperText={errors.email?.message}
      {...register('email',{required:'Укажите почту'})}
      className={styles.field} label="E-Mail" fullWidth />
      <TextField 
      error={Boolean(errors.password?.message)}
      helperText={errors.password?.message}
      {...register('password',{required:'Укажите пароль'})}
      className={styles.field} label="Пароль" fullWidth />
      <TextField {...register('major',{required:"Выберите специальность"})} id="select" label="Специальность"  select style={{width:"100%", marginBottom:"1em"}}>
      {
          majorsItems.map((obj,index)=>{
            return <MenuItem value={obj._id}>{obj.title}</MenuItem>
          })
        }
      </TextField>

      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
        Зарегистрироваться
      </Button>
      </form>
    </Paper>
  );
};
