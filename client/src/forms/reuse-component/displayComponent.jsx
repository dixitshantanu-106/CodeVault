import {Typography,TextField,MenuItem} from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
//reusable Typography field
export const renderText = ({label,color,align,varient}) => (
    <Typography
     color={color ?color:"primary"}
     align={align? align:"center"}
     varient={varient? varient:"h6"}
    >{label}</Typography>
);


//reusable TextField field
export const renderInputText = ({label,color,name,state,handleOnChange}) =>{
    const {data,errors} = state;
    return(
        <TextField  
                label={label}
                color={color? color:"primary"}
                varient="outlined"
                fullWidth={true}
                size='small'
                name={name}
                value={data[name]}
                error={errors[name]?true:false}
                helperText={errors[name]}
                onChange={handleOnChange}
        />
    );
}

//reusable Select field
export const renderSelect = ({label,color,name,state,handleOnChange,options}) =>{
    const {data,errors} = state;
    return(
        <TextField  
                select
                label={label}
                color={color? color:"primary"}
                varient="outlined"
                fullWidth={true}
                size='small'
                name={name}
                value={data[name]}
                error={errors[name]?true:false}
                helperText={errors[name]}
                onChange={handleOnChange}
        >
        {options.map((item)=>(
            <MenuItem key={item.value} value={item.value}>
                {item.key}
            </MenuItem>
        ))}
        </TextField>
    );
}

export const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));


export const renderDate = ({defaultValue,label,classes})=>{
    <TextField
    id="date"
    label={label}
    type="date"
    defaultValue={defaultValue}
    className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
}
