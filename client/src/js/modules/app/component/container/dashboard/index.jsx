import Base from "../base";
import React from "react";
import ProfileContainer from "../profile";
import { Link } from "react-router-dom";

class DashboardContainer extends Base{

  Profile=(props)=>{
    return this.renderContainer(ProfileContainer,{...props,name:"profile"});
  }

  routes=()=>{
    const {Profile} = this;
    const {match:{url}} = this.props;
    return [
      {
        path:`${url}/get/profile`,
        component:Profile
      }
    ]
  }

  Links=()=>{
    const {match:{url}} = this.props;
    return (
      <ul>
        <li>
          <Link to={`${url}/get/profile`}>Profiles</Link>
        </li>
      </ul>
    );
  }

  container({render:{container}}){
    const {Routing,Links} = this;
    return (
      <div>
        <Links/>
        <Routing routes={this.routes()}/>
      </div>
    )
  }
}

DashboardContainer.updateDefaultProps({
  auth:"fetch"
});

export default DashboardContainer.connect();
