import './App.css';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useState, useMemo, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {

  const schema = useMemo(() => {
    return yup.object().shape({
      example: yup.number().required("This fied is required").typeError("This field must be number"),
      example2: yup.string()
    })
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange"
  });

  const onSubmit = (data) => {
    console.log("data: ", data)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit(onSubmit)}>

        <input {...register("example")} />
        {errors?.example && errors?.example?.message}

        <input {...register("example2")} />
        {errors?.example2 && errors?.example?.message}

        <button type='submit'>Submit !</button>
      </form>
    </div>
  );
}

export default App;
