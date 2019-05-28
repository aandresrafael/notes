import React, { Component } from 'react'
import { Form } from 'semantic-ui-react'

class Search extends Component {
  state = {}

  handleChange = (e) => {
    this.setState({ name: e.target.value })
  }

  render() {
    return (
      <Form onSubmit={(e) => this.props.onSearch(this.state.name)} >
        <Form.Group inline>
          <label>Search</label>
          <Form.Input
            placeholder='Name'
            name='name'
            onChange={this.handleChange}
          />
          <Form.Button content='Submit' />
          <a href='/'>Show All</a>
        </Form.Group>
      </Form>
    )
  }
}

export default Search
