import React, { useState, useEffect } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { useSelector, useDispatch } from "react-redux";
import {
  addTodoLoading,
  addTodoSucces,
  addTodoError,
  getTodoLoading,
  getTodoSucces,
  getTodoError,
} from "../Todos/action";
import Navbar from "./Navbar";

// const useStyles = makeStyles((theme) => ({
//   button: {
//     marginRight: theme.spacing(1),
//   },
// }));

function getSteps() {
  return ["Name", "Email", "Password", "Date of birth"];
}
const BasicForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="firstName"
        render={({ field }) => (
          <TextField
            id="first-name"
            label="First Name"
            variant="outlined"
            placeholder="Enter Your First Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="lastName"
        render={({ field }) => (
          <TextField
            id="last-name"
            label="Last Name"
            variant="outlined"
            placeholder="Enter Your Last Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const ContactForm = () => {
  const { control } = useFormContext();

  return (
    <>
      <Controller
        control={control}
        name="emailAddress"
        render={({ field }) => (
          <TextField
            id="email"
            type="email"
            label="E-mail"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const PersonalForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <TextField
            id="password"
            type="password"
            label="Password"
            variant="outlined"
            placeholder="Enter Your Password"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="confirmpassword"
        render={({ field }) => (
          <TextField
            id="confirmpassword"
            type="password"
            label="Confirm Password"
            variant="outlined"
            placeholder="Enter Your Confirm Password"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const PaymentForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="dob"
        render={({ field }) => (
          <TextField
            id="dob"
            label="Date of birth"
            variant="outlined"
            type="date"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};

function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;

    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    case 3:
      return <PaymentForm />;
    default:
      return "unknown step";
  }
}

const Form = () => {
  const { loading, todos, error } = useSelector(
    (state) => ({
      loading: state.loading,
      todos: state.todos,
      error: state.error,
    })
    //Ram@789123
  );
  const dispatch = useDispatch();

  const methods = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      emailAddress: "",
      address1: "",
      address2: "",
      dob: "",
    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const getdata = () => {
    dispatch(addTodoLoading());
    dispatch(getTodoLoading());
    fetch("http://localhost:3005/form", {
      method: "GET",
      headers: { "Content-type": "application/json;charset=UTF-8" },
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(getTodoSucces(json));
        // setActualData(json);
      })
      .catch((err) => {
        console.log(err);
        dispatch(getTodoError(err));
      });
  };

  useEffect(() => {
    getdata();
  }, []);

  const handleNext = (data) => {
    dispatch(addTodoLoading());

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].emailAddress === data.emailAddress) {
        alert("this email are already exitist");
        getdata();
        return;
      }
    }

    if (activeStep == steps.length - 1) {
      fetch("http://localhost:3005/form", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-type": "application/json; charset=UTF-8" },
      })
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          dispatch(addTodoSucces(json));
        })
        .catch((err) => {
          console.log(err);
          dispatch(addTodoError(err));
        });
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3005/form/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
      });
    getdata();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div>
      <Navbar />
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>age</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((item) => {
              return (
                <tr key={item.id}>
                  <td>
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{item.emailAddress}</td>
                  <td>{item.dob}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <Button
                // className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                back
              </Button>
              <Button
                // className={classes.button}
                variant="contained"
                color="primary"
                // onClick={handleNext}
                type="submit"
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}
    </div>
  );
};

export default Form;
