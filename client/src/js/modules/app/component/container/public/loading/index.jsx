import AppContainerPublicBase from '../base';
import { Facebook } from 'modues/common/base/data/api';


class LoadingContainer extends AppContainerPublicBase{
  constructor(props){
    super(props);
  }

  container({render}){
    return <div>Loading</div>
  }

}

export default LoadingContainer.connect();
