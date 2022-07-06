// ** React Imports
import { useContext, useStat } from 'react'
import * as React from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { LocalizationProvider, StaticDatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import TableColumns from 'src/views/table/data-grid/TableColumns'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

const SchedulerPage = () => {
  // ** State
  const [date, setDate] = React.useState(new Date())
  const [shift, setShift] = React.useState('')
  const [openPlans, setOpenPlans] = React.useState(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  // ** Hooks
  const ability = useContext(AbilityContext)

  return (
    <Grid container spacing={6}>
      <Grid item md={4.5} xs={12}>
        <form>
          <Card>
            <CardHeader title='Set Availability' />
            <CardContent sx={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <StaticDatePicker
                  displayStaticWrapperAs='mobile'
                  value={date}
                  onChange={newValue => {
                    setDate(newValue)
                    console.log(newValue)
                    handlePlansClickOpen()
                  }}
                  onClick={handlePlansClickOpen}
                  renderInput={params => <TextField {...params} />}
                />
              </LocalizationProvider>
            </CardContent>

            <Dialog
              open={openPlans}
              onClose={handlePlansClose}
              aria-labelledby='user-view-plans'
              aria-describedby='user-view-plans-description'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, pt: 8, pb: 8 } }}
            >
              <DialogTitle id='user-view-plans' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Choose Your Shift
              </DialogTitle>

              <DialogContent>
                <DialogContentText variant='body2' sx={{ textAlign: 'center' }} id='user-view-plans-description'>
                  Select the shift that you would like to schedule.
                </DialogContentText>
              </DialogContent>

              <DialogContent
                sx={{
                  display: 'flex',
                  pb: 8,
                  pl: [6, 15],
                  pr: [6, 15],
                  alignItems: 'center',
                  flexWrap: ['wrap', 'nowrap'],
                  pt: theme => `${theme.spacing(2)} !important`
                }}
              >
                <FormControl fullWidth size='small' sx={{ mr: [0, 3], mb: [3, 0] }}>
                  <InputLabel id='user-view-plans-select-label'>Choose Plan</InputLabel>
                  <Select
                    label='Choose Plan'
                    defaultValue='Day'
                    id='user-view-plans-select'
                    labelId='user-view-plans-select-label'
                    // value={shift}
                    // onChange={newValue => {
                    //   setShift(newValue)
                    //   console.log(newValue)
                    // }}
                  >
                    <MenuItem value='Day'>Day</MenuItem>
                    <MenuItem value='Night'>Night</MenuItem>
                  </Select>
                </FormControl>
                <Button variant='contained' sx={{ minWidth: ['100%', 0] }}>
                  save
                </Button>
              </DialogContent>
            </Dialog>
          </Card>
        </form>
      </Grid>
      <Grid item md={7.5} xs={12}>
        <Card>
          <TableColumns />
        </Card>
      </Grid>
    </Grid>
  )
}
SchedulerPage.acl = {
  action: 'read',
  subject: 'scheduler-page'
}

export default SchedulerPage
