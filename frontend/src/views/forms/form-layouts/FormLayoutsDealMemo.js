// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { FormControlLabel, FormHelperText, FormLabel } from '@mui/material'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import FileUploaderMultipleDealMemo from '../form-elements/file-uploader/FileUploaderMultipleDealMemo'
import axios from 'axios'
import { getLocalStorage } from 'src/hooks/helpers'

// const CustomInput = forwardRef((props, ref) => {
//   return <TextField fullWidth {...props} inputRef={ref} label='Season Start Date' autoComplete='off' />
// })

const defaultValues = {
  showName: '',
  season: '',
  seasonStartDate: '',
  payrollPhone: '',
  payrollEmail: '',
  onboardingLink: ''
}

const FormLayoutsDealMemo = () => {
  // ** States
  const [date, setDate] = useState(null)
  const [basicPicker, setBasicPicker] = useState(new Date())

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  function refreshPage() {
    window.location.reload()
  }

  const schema = yup.object().shape({
    showName: yup.string().required(),
    season: yup.string().required(),
    seasonStartDate: yup.string().required(),
    payrollPhone: yup.string().required(),
    payrollEmail: yup.string().required(),
    onboardingLink: yup.string()
  })

  // YUP controller
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

  // Handle form submit
  const onSubmit = data => {
    const { showName, season, seasonStartDate, payrollPhone, payrollEmail, onboardingLink } = data

    axios({
      method: 'POST',
      url: 'http://localhost:8000/api/dealmemo/create/new',
      data: {
        showName,
        season,
        seasonStartDate,
        payrollPhone,
        payrollEmail,
        onboardingLink
      }
      // headers: {
      //   Authorization: `Bearer ${storageChecked}`
      // }
    })
      .then(response => {
        console.log('signup success', response)
        toast.success('New deal memo added!')
      })
      .catch(error => {
        console.log('Signup ERROR', error.response.data)
        toast.error('Failed to create new deal memo. Please try again.')
      })
  }

  return (
    <Card>
      <CardHeader title='Deal Memo Update Form' titleTypographyProps={{ variant: 'h6' }} />
      <Divider sx={{ m: 0 }} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600 }}>
                1. Account Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='showName'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.showName)}
                    fullWidth
                    label='Name of Show'
                  />
                )}
              />
              {errors.showName && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.showName.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='season'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.season)}
                    fullWidth
                    label='Current Season'
                  />
                )}
              />
              {errors.season && <FormHelperText sx={{ color: 'error.main' }}>{errors.season.message}</FormHelperText>}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='seasonStartDate'
                control={control}
                rules={{ required: true }}
                render={({ field: { basicPicker, onChange, onBlur } }) => (
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      onBlur={onBlur}
                      onChange={onChange}
                      error={Boolean(errors.seasonStartDate)}
                      value={basicPicker}
                      label='Season Start Date'
                      sx={{ width: '10px' }}
                      renderInput={params => <TextField fullWidth {...params} />}
                    />
                  </LocalizationProvider>
                )}
              />
              {errors.seasonStartDate && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.seasonStartDate.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='payrollEmail'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.payrollEmail)}
                    fullWidth
                    type='email'
                    label='Payroll Email'
                    placeholder='carterleonard@gmail.com'
                  />
                )}
              />
              {errors.payrollEmail && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.payrollEmail.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='payrollPhone'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.payrollPhone)}
                    fullWidth
                    label='Payroll Phone No.'
                    placeholder='+1-123-456-8790'
                  />
                )}
              />
              {errors.payrollPhone && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.payrollPhone.message}</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name='onboardingLink'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.onboardingLink)}
                    fullWidth
                    label='Onboarding Link'
                    placeholder='Leave empty if none'
                  />
                )}
              />
              {errors.onboardingLink && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.onboardingLink.message}</FormHelperText>
              )}
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: 2 }} />
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, paddingBottom: '25px' }}>
                2. Deal Memo File Upload
              </Typography>
              <FileUploaderMultipleDealMemo />
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: 2 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            Submit
          </Button>
          <Button size='large' color='secondary' variant='outlined' onClick={refreshPage}>
            Cancel
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

export default FormLayoutsDealMemo
