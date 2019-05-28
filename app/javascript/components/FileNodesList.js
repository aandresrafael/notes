import React, { Component } from 'react'
import { List, Button, Icon, Modal, Form, Label, Divider } from 'semantic-ui-react'
import { map } from 'ramda'
import axios from 'axios'
import Search from './Search'

class ListNotes extends Component {
  constructor(props) {
    super(props)
    this.state ={
      nodeSelected: null,
      open: false,
      option: '',
      name: '',
      tree: props.tree,
      errors: []
    }
  }

  handleClick = (nodeId, type, e) => {
    e.stopPropagation()
    if(type === 'file') {
      return null
    } else {
      this.setState({ nodeSelected: nodeId })
    }
  }

  handleChange = (e) => {
    this.setState({ name: e.target.value })
  }

  showModal = (option, e) => {
    e.stopPropagation()
    this.setState({ open: true, option })
  }

  handleClose = () => this.setState({ open: false })

  handleAddNewNode = (e) => {
    e.stopPropagation()
    axios.post('/file_nodes', {
     file_node: {
        name: this.state.name,
        file_node_type: this.state.option,
        parent_id: this.state.nodeSelected
     }
    })
    .then(response => {
      this.setState({ open: false, tree: response.data.tree })
    })
    .catch(error => {
      this.setState({errors: error.response.data.errors})
    });
  }

  handleSearch = (query) => {
    axios.post('/search', {
      query: query
     })
     .then(response => {
       console.log(response)
       this.setState({ tree: response.data.tree })
     })
  }

  renderNodes(nodes) {
    return nodes.map(node => (
      <List.Item
        key={node.id}
        onClick={(e) => this.handleClick(node.id, node.type, e)}
        className={this.state.nodeSelected === node.id ? 'nodeSelected' : ''}
      >
      <List.Icon name={node.type} />
      <List.Content>
        <List.Header>{node.name}</List.Header>
        <List.List>
          {this.renderNodes(node.children)}
        </List.List>
      </List.Content>
    </List.Item>
    ))
  }

  renderErrors() {
    return this.state.errors.map((error, index) => (
      <Label color="red" key={index}>{error}</Label>
    ))
  }

  render() {
    return(
      <React.Fragment>
        <Button primary onClick={(e) => this.showModal('folder', e)}><Icon name="folder" />Add New Folder</Button>
        <Button primary onClick={(e) => this.showModal('file', e)}><Icon name="file" />Add New Note</Button>
        <Divider />
        <Search onSearch={this.handleSearch} />
        <Divider />
        <Modal size='mini' open={this.state.open}  onClose={this.handleClose}>
          <Modal.Content>
            {!this.state.nodeSelected && (
              <p><strong>You will add a {this.state.option} to the root.</strong></p>
            )}
            <Form>
              <Form.Field>
                <label>Name</label>
                <input placeholder='Name' onChange={this.handleChange} />
              </Form.Field>
            </Form>
            {this.state.errors && (<div>{this.renderErrors()}</div>)}
          </Modal.Content>
          <Modal.Actions>
            <Button  onClick={this.handleClose}>Cancel</Button>
            <Button
              type='submit'
              onClick={(e) => this.handleAddNewNode(e)}
              primary
              disabled={!this.state.name}>
              Submit
            </Button>
          </Modal.Actions>
        </Modal>

        <List>
          <List.Item>
            <List.Icon name='folder' />
            <List.Content>
              <List.Header>src</List.Header>
              <List.Description>
                {this.state.tree && this.state.tree.length ? 'Select a sub folder to add a new folder or file.' : 'No folders found' }

              </List.Description>
              <List.List>
                {this.renderNodes(this.state.tree)}
              </List.List>
            </List.Content>
          </List.Item>
        </List>
      </React.Fragment>
    )
  }
}

export default ListNotes