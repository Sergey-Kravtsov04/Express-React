import React, {  useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import styles from './Major.module.scss';
import { MajorSkeleton } from './Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../redux/slices/users';
import { fetchRemoveMajor } from '../../redux/slices/majors';

// import ReactMarkdown from "react-markdown";

export const Major = ({
  _id,
  title,
  description,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  useEffect( ()=>{
    dispatch(fetchUsers());
  },[dispatch])
  const {users} = useSelector (state => state.users)
  
  if (isLoading) {
    return <MajorSkeleton />;
  }

  const onClickRemove = () => {
    if(window.confirm("Вы действительно хотите удалить статью")){
          dispatch(fetchRemoveMajor(_id));
          console.log("Вы удалили статью")
        }
  };

  const usersItems = Object.keys(users.items).map(key => users.items[key]);  

  const filterUsers = usersItems.filter((item) => {
    if(item.major === _id)
      {return item}
    return false
  })

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/majors/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      <div className={styles.wrapper}>
        <div className={styles.indention}>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/majors/${_id}`}>{title}</Link>}
          </h2>
           <div className={styles.content}>
            {/* <ReactMarkdown children={description}/> */}
            {description}
           </div>
          {isFullPost && 
            <div className={styles.user__section}>
              <h3>Список абитуриентов</h3>
              {
                filterUsers.length > 0 ?
                filterUsers.map((obj,index)=>{
                      return (
                        <div className={styles.user__single} key={index}>
                          <h4>id: {obj._id}</h4>
                          <p>Полное имя: {obj.fullName}</p>
                          <p>Эл. почта: {obj.email}</p>
                        </div>
                      )
                })
                :
                (<div style={{margin:"1em",alignSelf:"flex-start"}}>Абитуриентов еще нет</div>)

              }
            </div>
          }
        </div>
      </div>
      
    </div>
  );
};
