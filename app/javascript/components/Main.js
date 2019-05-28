import React from 'react'
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from 'semantic-ui-react'

import FileNodesList from './FileNodesList'

const FixedMenuLayout = (props) => {
  return (
    <div>
      <Menu fixed='top' inverted>
        <Container>
          <Menu.Item as='a' header>
            Notes
          </Menu.Item>
        </Container>
      </Menu>

      <Container text style={{ marginTop: '7em' }}>
        <Header as='h1'>Notes App</Header>
        <Divider />
        <FileNodesList tree={props.tree}/>
      </Container>
    </div>
  )
}

export default FixedMenuLayout