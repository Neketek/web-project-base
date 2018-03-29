import React from 'react';
import {Check} from 'modules/common/base/component/input';
import CheckBox from 'material-ui/Checkbox';
import PropTypes from 'prop-types';


class CheckInput extends Check{

    onCheck = (event) => {

        console.log('Show Check: ' + event.target.checked);
        this.propagateValue(!this.state.value);
    }


    render() {
    
        const props = {...this.props};
        props.checked = this.state.value;
        props.onChange = this.onCheck;
        delete props.value;
        delete props.error;
        
        return this.input(CheckBox,props,{});
    }
}

export default CheckInput;