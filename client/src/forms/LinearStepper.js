import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {useForm,FormProvider,useFormContext,Controller} from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

//global setting for adding header in each axios request
axios.interceptors.request.use(
  config => {
    config.headers.xauthheader = `${localStorage.getItem('token')}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Enter class name",
    "Add Students",
    "Create class",
  ];
}

//function for validation and setting error message to fields

const ClassName = () =>{
  const {control,formState:{errors}} = useFormContext();
  return (
    <>
      <Controller
      control={control}
      name="className"
      rules = {{
        required:"class name is required*",
      }}
      render={({field})=>
        <TextField
        id="class-name"
        label="Class Name"
        variant="outlined"
        inputProps={{
              autoComplete: 'off'
        }}
        placeholder="Enter Class Name"
        fullWidth
        margin="normal"
        {...field}
        error={errors.className}
        helperText={errors.className?.message}
      />
      }
      />
     <ToastContainer/>
    </>
  );
};
const AddStudent = () =>{
  const {control,formState:{errors}} = useFormContext();
  return (
    <>
    <Controller
      control={control}
      name="sEmail"
      rules = {{
        trim:true,
        required:"student email is require*",
        pattern:{
          value:/^[a-zA-Z0-9.!#$%&`*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]+(?:\.[a-zA-Z0-9-]+)*$/,
          message:"enter valid email address"
        }
      }}
      render={({field})=>
        <TextField
        id="email"
        label="E-mail"
        variant="outlined"
        placeholder="Enter Student E-mail Address"
        fullWidth
        margin="normal"
        inputProps={{
              autoComplete: 'off'
        }}
        {...field}
        error={errors.sEmail}
        helperText={errors.sEmail?.message}
      />
      }
      />
    <Controller
      control={control}
      name="name"
      rules = {{
        required:"student name is required*"
      }}
      render={({field})=>
        <TextField
        id="student-name"
        label="Studnet Name"
        variant="outlined"
        placeholder="Enter Student Name"
        inputProps={{
              autoComplete: 'off'
        }}
        fullWidth
        margin="normal"
        {...field}
        error={errors.name}
        helperText={errors.name?.message}
      />
      }
    /> 
    <ToastContainer/> 
    </>
  );
};
const CreateClass = () =>{
  return (
    <>
     <Typography
         varient="h1"
         component="h1"
         color="primary"
         gutterBottom
         paragraph="true"
      >
      Click create class to create new class or back to add more students.
      </Typography>          
  </>
  );
};
function getStepContent(step) {
  switch (step) {
    case 0:
      //ClassName
      return <ClassName/>

    case 1:
      //AddStudent
      return <AddStudent/>
    case 2:
      return <CreateClass/>
        //create Class message wala from
    default:
      return "unknown step";
  }
}

async function callAddClassAPI(data){
  console.log(data.name);
  console.log(data.sEmail);
  console.log(data.className);
  axios.post('/codevault.com/students/',data)
        .then(res=>{
            toast.success("Student added to class",{position:"top-center"});
            })
        .catch(err=>{toast.error('error while adding student',{position:"top-center"});console.log(err)})

}

const LinaerStepper = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const methods = useForm({
    defaultValues:{
      className:"",
      sEmail:"",
      name:"",
    },
  }
  );


  const isStepOptional = (step) => {
    return step === 1 || step === 4;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

  const handleNext = (data) => {
      console.log(data);
      setActiveStep(activeStep + 1);
      setSkippedSteps(skippedSteps.filter((skipItem) => skipItem !== activeStep));

  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };

  //method to validate and perform operation on data here database connection all will be done
  const onSubmit = async(data) =>{
    console.log(data);
    var clsname = data.className;
    //here add logic of adding data to backend
    // calling api and disabling buttons
    methods.isdisable = true;
    await callAddClassAPI(data);
    methods.isdisable = false;
    //then reset the fields
    methods.reset({"name":"","sEmail":"","className":clsname});
  }

  //method to check if validtion is true or false so that we can change icon
  const isValidate = ()=>{
    return Boolean(Object.keys(methods.formState.errors).length); //if no of errors are greater than zero means true
  }
  var isdisable = false;
  return (
    
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                *multiple
              </Typography>
            );
          }
          //changing the icon if error is present
          if(isValidate() && activeStep==index){
            labelProps.error = true;
          }

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
        <Typography variant="h3" align="center">
          Class Created
        </Typography>
      ) : (
        <>
          
            <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
            {getStepContent(activeStep)}
            <Button
            className={classes.button}
            onClick={handleBack}
            disabled={activeStep===0}
          >
            Back
          </Button>
          {isStepOptional(activeStep) && (
            <Button
              className={classes.button}
              variant="contained"
              color="primary"
              onClick={methods.handleSubmit(onSubmit)}
              disabled={methods.isdisable}
            >
              {/* {activeStep === 1 ? "Add Student" : "Add Student"} */}
              Add Student
            </Button>)
          }
          <Button
            className={classes.button}
            variant="contained"
            color="primary" 
            type="submit"
            disabled={methods.isdisable}
          >
            {activeStep === steps.length - 1 ? "Create Class" : "Next"}
          </Button>
          </form>
          </FormProvider> 
        </>
      )}
    </div>
  );
};

export default LinaerStepper;
