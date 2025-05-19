import React, { useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import SimpleMDE from 'react-simplemde-editor';

import 'easymde/dist/easymde.min.css';
import styles from './AddMajor.module.scss';
import { useSelector } from 'react-redux';
import { isAuthSelector } from '../../redux/slices/auth';
import { useNavigate,Navigate,useParams } from 'react-router-dom';
import instance from '../../axios';


export const AddMajor = () => {
  const {id} = useParams()
  const isEditing = Boolean(id)
  const navigate = useNavigate();
  const [description, setDescription] = React.useState('');
  const [title, setTitle] = React.useState('');

  const handleChangeFile = () => {};
  const onChange = React.useCallback((value) => {
    setDescription(value);
  }, []);

  const onSubmit = async () =>{
    try{
      const fields = {
        title,
        description
      }
      const {data} = isEditing ? 
      await instance.patch(`/majors/${id}`,fields):
      await instance.post('/majors',fields)
      
      const _id = isEditing ? id : data._id
      navigate(`/majors/${_id}`)
    }catch(err) {
      console.warn(err);
      alert("Ошибка при создании")
    }
  };

  useEffect(()=>{
    if(id){
      instance.get(`/majors/${id}`)
      .then(({data}) => {
        setTitle(data.major.title)
        setDescription(data.major.description)
      })
    }
  },[])

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const isAuth = useSelector(isAuthSelector);
  if(!window.localStorage.getItem('token') && !isAuth){
      window.alert("Создание не доступно незарегистрированным пользователям");
      return <Navigate to="/"/>
    }

  return (
    <Paper style={{ padding: 30 }}>
      <input type="file" onChange={handleChangeFile} hidden />
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок специальности..."
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        fullWidth
      />
      <SimpleMDE className={styles.editor} value={description} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Сохранить": "Создать"}
        </Button>
        <a href="/">
          <Button size="large">Отмена</Button>
        </a>
      </div>
    </Paper>
  );
};
