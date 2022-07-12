// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'

// ** Component Imports
import { Grid } from '@mui/material'
import FormLayoutAdminNotes from 'src/views/forms/form-layouts/FormLayoutAdminNotes'
import ViewUserAvailabilityTable from 'src/views/table/data-grid/ViewUserAvailabilityTable'

const UserViewOverview = ({ viewedUser }) => {
  // ** States
  // const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty())

  return (
    <Fragment>
      <Grid item md={12} xs={12} sx={{ mb: 6 }}>
        <Card>
          <ViewUserAvailabilityTable viewedUser={viewedUser} />
        </Card>
      </Grid>
      <Grid item md={12} xs={12}>
        <FormLayoutAdminNotes viewedUser={viewedUser} />
      </Grid>
      {/* <UserViewTimeline /> */}
    </Fragment>
  )
}

export default UserViewOverview
