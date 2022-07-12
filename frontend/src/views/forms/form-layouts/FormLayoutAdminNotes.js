import React, { Fragment, useState } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'

// ** Demo Component Imports
import { Box, Button, CardContent, Grid, TextField, Typography } from '@mui/material'
import { Editor, EditorState } from 'draft-js'
import 'draft-js/dist/Draft.css'
import { getLocalStorage } from 'src/hooks/helpers'
import axios from 'axios'
import toast from 'react-hot-toast'

const FormLayoutAdminNotes = ({ viewedUser }) => {
  // ** States
  const [notes, setNotes] = useState()
  // const [editorState, setEditorState] = React.useState(() => EditorState.createEmpty())

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  // Get viewed user info from useEffect props
  const viewedUserId = viewedUser._id
  const userNotes = viewedUser.generalNotes
  const generalNotes = notes

  const handleNotesOnChange = event => {
    setNotes(event.target.value)
  }

  const handleSubmit = () => {
    axios({
      method: 'PUT',
      url: 'http://localhost:8000/api/user/update/admin/generalnotes',
      data: {
        generalNotes,
        viewedUserId
      },
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
      .then(response => {
        console.log('Your notes have been SUCCESS saved!', response)
        toast.success('Your notes have been successfully saved!')
      })
      .catch(error => {
        console.log('Your notes failed to save. ERROR', error.response.data)
        toast.error('Your notes failed to save. Please try again or contact support if the problem reoccurs!')
      })
  }

  return (
    <Fragment>
      <Card sx={{ mb: 6, height: '420px' }}>
        <CardContent>
          <Typography variant='h6'>Administrator Notes</Typography>
          {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
          <form onSubmit={handleSubmit}>
            <Box sx={{ my: 4 }} width='100%'>
              <TextField
                sx={{ width: '100%' }}
                fullwidth
                rows={10}
                multiline
                value={notes}
                onChange={handleNotesOnChange}
                variant='outlined'
                label='Type employee notes here'
                id='textarea-filled-static'
                defaultValue={userNotes}
              />
            </Box>
            <Grid item xs={12} sx={{ mt: 5 }}>
              <Button type='submit' variant='contained'>
                Save Notes
              </Button>
            </Grid>
          </form>
        </CardContent>
      </Card>
      {/* <UserViewTimeline /> */}
    </Fragment>
  )
}

export default FormLayoutAdminNotes
