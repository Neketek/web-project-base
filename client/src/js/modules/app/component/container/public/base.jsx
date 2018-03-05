import AppContainerBase from 'modules/app/container/base';

class AppContainerPublicBase extends AppContainer{}

AppContainerPublicBase.updateDefaultProps({
  private:false
});

export default AppContainerPublicBase;
