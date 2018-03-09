import React from 'react';
import {Form,Rule} from 'modules/common/base/component/form';
import {Text,Date,DateTime,Time,Select,Button,InputError} from 'modules/common/component/input';
import Grid from 'material-ui/Grid';

const FIRST_NAME_FIELD_NAME = "first";
const LAST_NAME_FIELD_NAME = "last";

class NameForm extends Form{

  form=({render:{field,error}})=>{

    const {labels}=this.props;

    const commonProps = (name)=>{
      return {
        name,
        label:labels[name],
        fullWidth:true,
        required:true
      }
    };


    const firstNameProps = {
      ...commonProps("first")
    };

    const lastNameProps = {
      ...commonProps("last")
    };

    return (
        <Grid container justify='center' spacing={16} alignItems='center'>
            <Grid item xs={12}>
              {field(Text,firstNameProps)}
              {error(InputError,{name:firstNameProps.name})}
            </Grid>
            <Grid item xs={12}>
              {field(Text,lastNameProps)}
              {error(InputError,{name:lastNameProps.name})}
            </Grid>
        </Grid>
    );
  }

}


NameForm.updateDefaultProps({
  labels:{
    first:"First name",
    last:"Last name"
  },
  values:{
    first:"",
    last:""
  },
  rules:{
    first:[
      Rule.String.notEmpty("Should not be empty!")
    ],
    last:[
      Rule.String.notEmpty("Should not be empty!")
    ],
  }
});

export default NameForm;
