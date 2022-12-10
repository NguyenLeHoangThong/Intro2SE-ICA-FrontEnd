import './App.scss';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useState, useMemo, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {

  const schema = useMemo(() => {
    return yup.object().shape({
      name: yup.string().required("Please fill in employee's name"),
      age: yup.number().typeError("Please fill in a number").required("Please fill in employee's age"),
      country: yup.string().required("Please fill in employee's country"),
      position: yup.string().required("Please fill in employee's position"),
      wage: yup.number().typeError("Please fill in a number").required("Please fill in employee's wage"),
    })
  });

  const {
    register,
    handleSubmit,
    watch,
    reset,
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
      <div className="AddEmployee">
        <form onSubmit={handleSubmit(onSubmit)}>

          <label>Name:</label>
          <input {...register("name")} />
          <p>{errors?.name && errors?.name?.message}</p>

          <label>Age:</label>
          <input {...register("age")} />
          <p>{errors?.age && errors?.age?.message}</p>

          <label>Country:</label>
          <input {...register("country")} />
          <p>{errors?.country && errors?.country?.message}</p>

          <label>Position:</label>
          <input {...register("position")} />
          <p>{errors?.position && errors?.position?.message}</p>

          <label>Wage (year):</label>
          <input {...register("wage")} />
          <p>{errors?.wage && errors?.wage?.message}</p>

          <button type='submit'>Add Employee</button>

          <button type='button'>View Employee</button>
        </form>
      </div>

      <div className="ViewEditEmployees">
        <h1>All Employees: </h1>
        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Country</th>
            <th>Position</th>
            <th>Wage</th>
          </tr>
          <tr>
            <td>Name</td>
            <td>Age</td>
            <td>Country</td>
            <td>Position</td>
            <td>Wage</td>
          </tr>
        </table>
      </div>
    </div>
  );
}

export default App;
