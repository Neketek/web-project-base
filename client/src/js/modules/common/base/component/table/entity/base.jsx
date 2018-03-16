import Component from 'modules/common/base/react/component';

const OnClickEvent = ({uid,value})=>{
  return {
    uid,
    value
  }
}

const OnSelectEvent = ({uid,value},{selected})=>{
  return {
    uid,
    value,
    selected
  }
}


class TableEntityBase extends Component{

  onClick=()=>{
    this.props.onClick(OnClickEvent(this.props));
  }

  onSelect=()=>{
    if(!this.props.selectable){
      return;
    }
    this.state.selected = !this.state.selected;
    this.props.onSelect(OnSelectEvent(this.props,this.state));
    this.rerender();
  }


  static defaultProps = {
    uid:null,
    value:null,
    selected:false,
    selectable:true,
    disabled:false,
    onSelect(event){
      
    },
    onClick(event){

    }
  }

  static propTypes = {
    uid:PropTypes.any.isRequired,
    value:PropTypes.any.isRequired,
    selected:PropTypes.bool.isRequired,
    selectable:PropTypes.bool.isRequired,
    disabled:PropTypes.bool.isRequired
    onSelect:PropTypes.func.isRequired,
    onClick:PropTypes.func.isRequired
  }
}

export default TableEntityBase;
