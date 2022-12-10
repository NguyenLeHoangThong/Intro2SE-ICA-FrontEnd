import './App.scss';
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useState, useMemo, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Axios from "axios";

function App() {
  const [employees, setEmployees] = useState([]);
  const [toggleView, setToggleView] = useState(false);
  const [successNoti, setSuccessNoti] = useState(false);

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

  useEffect(() => {
    Axios.get("http://localhost:3001/employees")
      .then((res) => {
        setEmployees(res?.data);
      })
      .catch((err) => {
        console.log("Error: ", err)
      })
  }, [])

  useEffect(() => {
    if (successNoti) {
      setSuccessNoti(false);
    }
  }, [watch("name"), watch("age"), watch("country"), watch("position"), watch("wage")])

  const onSubmit = (data) => {
    Axios.post("http://localhost:3001/employees", {
      name: data?.name,
      age: data?.age,
      position: data?.position,
      country: data?.country,
      wage: data?.wage
    })
      .then((res) => {
        setEmployees([...employees, res.data]);
        setSuccessNoti(true);
        reset();
      })
      .catch((err) => {
        console.log("Error: ", err)
      })
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
          {successNoti && <p className="AddEmployeeSuccessMessage">Successfully add employee !</p>}

          <button type='button' onClick={() => setToggleView(!toggleView)}>View Employee</button>
        </form>
      </div>

      {
        toggleView && (
          <div className="ViewEditEmployees">
            <h1>All Employees: </h1>
            <table>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Country</th>
                <th>Position</th>
                <th>Wage</th>
              </tr>
              {
                employees?.length && employees?.map((item) => (
                  <tr>
                    <td>{item?.id}</td>
                    <td>{item?.name}</td>
                    <td>{item?.age}</td>
                    <td>{item?.country}</td>
                    <td>{item?.position}</td>
                    <td>{item?.wage}</td>
                  </tr>
                ))
              }
            </table>
          </div>
        )
      }

    </div>
  );
}

export default App;
