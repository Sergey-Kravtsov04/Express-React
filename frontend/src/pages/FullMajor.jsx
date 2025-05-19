import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import instance from "../axios";
import {Major} from "../components/Major";

export const FullMajor = () => {
  const[data,setData] = useState();
  const[isLoading,setLoading] = useState(true);
  const {id} = useParams();

  useEffect(()=>{
    instance.get(`/majors/${id}`)
    .then(res => {
      setData(res.data);
      setLoading(false);
    })
    .catch(err => console.log(err))
  },[id])
  
  if(isLoading){
    return <Major isLoading={isLoading} isFullPost/>
  }

  return (
    <>
      <Major
        _id={data.major._id}
        title={data.major.title}
        description={data.major.description}
        isFullPost>
      </Major>
    </>
  );
};
