import React from 'react';
import {FileBase} from 'modules/common/base/component/input';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';


class FileInput extends FileBase{

  onChange = (event) => {
    console.log('this is file fired!');
    console.log("Number of files: " + event.target.files.length);
    this.propagateValue([...event.target.files]);
  }

  render() {
    let override = {
      component: 'label',
      variant: 'raised'
    };
    const props = this.inputProps(this.props, override);

    delete props.error;

    return (
        <Button {...props} >
          {this.props.name}
          <input
            multiple
            type="file"
            style={{display: 'none'}}
          />
        </Button>
    )
  }
}


export default FileInput;
