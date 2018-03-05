import AppContainerPrivateBase from 'modules/app/container/private/base';

class DashboardContainer extends AppContainerPrivateBase{
  container({render:container}){
    return (
      <div>Welcome to dashboard</div>
    );
  }
}

export DashboardContainer.connect();
