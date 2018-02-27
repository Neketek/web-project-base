import ContainerBase from 'modules/common/base/container';
import LoginForm from 'modules/app/form/login';
import Grid from 'material-ui/Grid';

class LoginContainer extends ContainerBase{
  render(){
    return (
      <Grid container justify="center">
        <Grid xs={12} sm={6}>
          <LoginForm onChange={this.props.onChange}></LoginForm>
        </Grid>
      </Grid>
    );
  }
}

LoginContainer.updateDefaultProps({
  onChange(event){
    console.log(event);
  }
});
