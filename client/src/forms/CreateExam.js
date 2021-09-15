import {Box, FormControl, Grid, Paper,makeStyles} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React,{Component} from 'react';
import { propTypes } from 'react-bootstrap/esm/Image';
import { PropTypes } from 'prop-types';
import {style} from '../css/style';
import {TextField} from '@material-ui/core';
import {renderText,renderInputText,renderSelect,renderDate} from "./reuse-component/displayComponent";

class CreateExam extends Component{
  state = {
    data:{
        date: "", 
        stime: "",  
        etime: "", 
        pLang: "", 
        className:"", //form 1 field finisheh here

        question: "",  //form 2 field finishesh here

        testCases: "",  //form 3 field finishesh here
        
    },
    errors:{
      
    },
  }

  useStyles = makeStyles((theme) => ({
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

  render(){
    const {classes} = this.props;
    const handleChange = ({target})=>{
      const {data,errors} = this.state;
      target.value.length<=1 ? errors[target.name] = `${target.name} please enter programming language`: errors[target.name]="";
      data[target.name] = target.value;
      this.setState({data,errors})
      console.log('eventTarget',target.name,"target value",target.value);
    }
    return(
      <Grid container className={classes.formContainer}>
          <Grid item xs={12} sm={7}>
              <Box p={2} mb={2} component={Paper}>
                   {renderText({label:"Stipeer goes here"})} 
              </Box>
              <Box component={Paper}>
                <form className={classes.form}>
                <Box mb={2}>
                  {renderText({label:"Fill the detail's"})}
                </Box>
                  <Grid container style={{marginBottom:"15px"}}>
                    <Grid item xs={12} pd={2}>
                      {renderSelect({
                        label:"Select Class",
                        name:"className",
                        state:this.state,
                        options:[{key:"key1",value:"Value1"},{key:"key2",value:"Value2"}],
                        handleOnChange:handleChange,
                      })}
                    </Grid>
                  </Grid>
                  
                  <Grid container style={{marginTop:"5px"}}>
                    <Grid item xs={12} pd={2}>
                      {renderSelect({
                        label:"Programing Language",
                        name:"className",
                        state:this.state,
                        options:[{key:"C",value:"C"},{key:"Python",value:"Python"},{key:"Java",value:"Java"}],
                        handleOnChange:handleChange,
                      })}
                    </Grid>
                  </Grid>

                  <Grid container style={{marginTop:"5px"}}>
                    <Grid item xs={12} pd={2}>
                      {renderDate({
                        label:"ExamDate",
                        state:this.state,
                        defaultValue:""+new Date().getFullYear()+"-"+new Date().getMonth()+1+"-"+new Date().getDate(),
                        handleOnChange:handleChange,
                      })}
                    </Grid>
                  </Grid>
                </form>
              </Box>
          </Grid>
      </Grid>
    )
  }
}

CreateExam.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(style)(CreateExam);