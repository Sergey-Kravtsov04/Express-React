import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';

import {Major}  from '../components/Major';
import { useDispatch,useSelector } from 'react-redux';
import { fetchMajors } from '../redux/slices/majors';

export const Home = () => {

  const dispatch = useDispatch();
  const {majors} = useSelector(state => state.majors)
  const majorsItems = Object.keys(majors.items).map(key => majors.items[key]);  

  const isMajorsLoading = majors.status === "loading";
  useEffect(()=>{
    dispatch(fetchMajors());
  },[])
  return (
    <>
        <Grid xs={8} item>
          {
          (isMajorsLoading ?
            [...Array(5)] : majorsItems).map((obj,index) => 
              
              isMajorsLoading ? 
              (
                <Major key ={index} />
              ) : (
                
                <Major
                  key ={index}
                  _id={obj._id}
                  title={obj.title}
                  description={obj.description}
                  // applicants={obj.applicants}
                  isEditable
                />
            )
          )
          }
        </Grid>
    </>
  );
};
