import Base from "../base";
import React from "react";

class DashboardContainer extends Base{

  container({render:{container}}){
    const {
      user:{
        id,
        name,
        email,
        datetime,
        timezone
      }
    } = this.props;
    return (
      <div>
        <div>
          id:{id}
        </div>
        <div>
          {name.first} {name.last}
        </div>
        <div>
          {email}
        </div>
        <div>
          <div>
            timezone:{timezone}
          </div>
          <div>
            modification time:{datetime.modification}
          </div>
          <div>
            creation time:{datetime.creation}
          </div>
        </div>
      </div>
    )
  }
}

DashboardContainer.updateDefaultProps({
  auth:"fetch"
});

export default DashboardContainer.connect();
