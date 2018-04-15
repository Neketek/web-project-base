import React from 'react';
import Base from "./base";
class IndexContainer extends Base{
  container({render:{container}}){
    return <div>Index Container</div>;
  }
}

IndexContainer.updateDefaultProps({
  authRequired:false
});

export default IndexContainer;
