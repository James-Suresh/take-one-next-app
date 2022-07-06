// ** React Imports
import * as React from 'react'

// ** Context Imports

// ** MUI Imports
import { LocalizationProvider, StaticDatePicker } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import UserAvailabilityTable from 'src/views/table/data-grid/UserAvailabilityTable'
import { getLocalStorage } from 'src/hooks/helpers'

const defaultValues = {
  shift: '',
  availabilityDate: new Date()
}

const SchedulerPage = () => {
  // ** State
  const [openPlans, setOpenPlans] = React.useState(false)

  // Handle Upgrade Plan dialog
  const handlePlansClickOpen = () => setOpenPlans(true)
  const handlePlansClose = () => setOpenPlans(false)

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  // YUP validation rules
  const schema = yup.object().shape({
    shift: yup.string(),
    availabilityDate: yup.string()
  })

  // React Hook controller
  const {
    control,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    const { shift, availabilityDate } = data
    console.log(shift)
    console.log(availabilityDate)

    axios({
      method: 'POST',
      url: 'http://localhost:8000/api/availabilities/create/new',
      data: {
        shift,
        availabilityDate
      },
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
      .then(response => {
        console.log('add availability success', response)
        toast.success(`New availability date added for ${shift} shift on ${availabilityDate}`)
      })
      .catch(error => {
        console.log('add availability ERROR', error.response.data)
        toast.error('Adding new availability date failed. Please try again or contact support.')
      })

    handlePlansClose()
  }

  return (
    <Grid container spacing={6}>
      <Grid item md={4.5} xs={12}>
        <Card>
          <CardHeader title='Set Availability' />
          <CardContent sx={{ display: 'grid', justifyContent: 'center', alignContent: 'center' }}>
            <Controller
              name='availabilityDate'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <StaticDatePicker
                    value={value}
                    onBlur={onBlur}
                    onChange={e => {
                      onChange(e), handlePlansClickOpen()
                    }}
                    error={Boolean(errors.availabilityDate)}
                    displayStaticWrapperAs='mobile'
                    renderInput={params => <TextField {...params} />}
                  />
                </LocalizationProvider>
              )}
            />
            {errors.availabilityDate && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.availabilityDate.message}</FormHelperText>
            )}
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

            <form onSubmit={handleSubmit(onSubmit)}>
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
                  <InputLabel id='user-view-plans-select-label'>Choose Shift</InputLabel>
                  <Controller
                    name='shift'
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <Select
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.shift)}
                        label='Choose Plan'
                        defaultValue='Day'
                        id='user-view-plans-select'
                        labelId='user-view-plans-select-label'
                      >
                        <MenuItem value='Day'>Day</MenuItem>
                        <MenuItem value='Night'>Night</MenuItem>
                      </Select>
                    )}
                  />
                  {errors.shift && <FormHelperText sx={{ color: 'error.main' }}>{errors.shift.message}</FormHelperText>}
                </FormControl>
                <Button variant='contained' sx={{ minWidth: ['100%', 0] }} type='submit'>
                  save
                </Button>
              </DialogContent>
            </form>
          </Dialog>
        </Card>
      </Grid>
      <Grid item md={7.5} xs={12}>
        <Card>
          <UserAvailabilityTable />
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
