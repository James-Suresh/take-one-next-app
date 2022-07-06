// ** React Imports
import React, { Fragment } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'

// ** Demo Component Imports
import { CardContent, Grid, Typography } from '@mui/material'
import { Editor, EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import ViewUserAvailabilityTable from 'src/views/table/data-grid/ViewUserAvailabilityTable'

const UserViewOverview = ({ viewedUser }) => {
  const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty())

  return (
    <Fragment>
      <Grid item md={12} xs={12}>
        <Card sx={{ mb: 6, height: '350px' }}>
          <CardContent>
            <Typography variant='h6'>Administrator Notes</Typography>
            <Editor editorState={editorState} onChange={setEditorState} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item md={12} xs={12}>
        <Card>
          <ViewUserAvailabilityTable viewedUser={viewedUser} />
        </Card>
      </Grid>
      {/* <UserViewTimeline /> */}
    </Fragment>
  )
}

export default UserViewOverview
