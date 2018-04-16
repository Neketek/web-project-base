import React from 'react';
import {FileBase} from 'modules/common/base/component/input';
import Button from 'material-ui/Button';
import PropTypes from 'prop-types';
import List, {ListItem, ListItemText} from 'material-ui/List';
import ListSubheader from 'material-ui/List/ListSubheader';


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
      <div>
        <Button {...props} >
          {"upload"}
          <input
            multiple
            type="file"
            style={{display: 'none'}}
          />
        </Button>
        <div>
          <ListFiles files={this.state.value} />
        </div>
      </div>
    )
  }
}

const ListFiles = (props) => {
  console.log('files: ' + props.files);
  const files = props.files.map(file =>
    <ListItem button>
      <ListItemText
        primary={file.name}
        secondary={(file.size / 1024).toFixed(1) + 'KB'}
      />
    </ListItem>
  );


  return(
    <List
      component="nav"
      subheader={<ListSubheader>Files for Uploading</ListSubheader>}
    >
      {files}
    </List>
  );
}


export default FileInput;
