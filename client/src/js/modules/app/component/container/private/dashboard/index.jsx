import AppContainerPrivateBase from '../base';
import React from 'react';

class DashboardContainer extends AppContainerPrivateBase{
  container({render:container}){
    return (
      <div>Welcome to dashboard:{this.user().email}</div>
    );
  }
}

export default DashboardContainer.connect();
