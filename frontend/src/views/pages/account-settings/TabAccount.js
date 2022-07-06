// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Alert from '@mui/material/Alert'
import Select from '@mui/material/Select'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import AlertTitle from '@mui/material/AlertTitle'
import IconButton from '@mui/material/IconButton'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Button from '@mui/material/Button'
import { FormHelperText } from '@mui/material'
import { LocalizationProvider, MobileDatePicker } from '@mui/lab'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { getLocalStorage } from 'src/hooks/helpers'

const ImgStyled = styled('img')(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(5),
  borderRadius: theme.shape.borderRadius
}))

const ButtonStyled = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    textAlign: 'center'
  }
}))

const ResetButtonStyled = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    marginLeft: 0,
    textAlign: 'center',
    marginTop: theme.spacing(4)
  }
}))

const defaultValues = {
  firstName: '',
  lastName: '',
  nickName: '',
  phone1: '',
  phone2: '',
  email1: '',
  email2: '',
  since: new Date()
}

const TabAccount = () => {
  // ** State
  const [openAlert, setOpenAlert] = useState(true)
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')
  const [basicPicker, setBasicPicker] = useState(new Date())

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  const onChange = file => {
    const reader = new FileReader()
    const { files } = file.target
    if (files && files.length !== 0) {
      reader.onload = () => setImgSrc(reader.result)
      reader.readAsDataURL(files[0])
    }
  }

  // YUP validation rules
  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    nickName: yup.string().required(),
    phone1: yup.string().required(),
    phone2: yup.string().required(),
    email1: yup.string().email().required(),
    email2: yup.string().email().required()
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

  // Handle form submit
  const onSubmit = (data, photoURL) => {
    const { firstName, lastName, nickName, phone1, phone2, email1, email2 } = data

    axios({
      method: 'PUT',
      url: 'http://localhost:8000/api/user/update',
      data: {
        firstName,
        lastName,
        nickName,
        phone1,
        phone2,
        email1,
        email2
      },
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
      .then(response => {
        console.log('signup success', response)
        toast.success('Employee Onboarded!')
      })
      .catch(error => {
        console.log('Signup ERROR', error.response.data)
        toast.error('Employee Onboarding failed')
      })
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ my: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <ImgStyled src={imgSrc} alt='Profile Pic' />
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/1.png')}>
                  Reset
                </ResetButtonStyled>
                <Typography sx={{ mt: 4 }} component='p' variant='caption'>
                  Allowed PNG or JPEG. Max size of 800K.
                </Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Controller
              name='firstName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.firstName)}
                  required
                  fullWidth
                  label='First Name'
                  placeholder='Leonard'
                />
              )}
            />
            {errors.firstName && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.firstName.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='lastName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.lastName)}
                  required
                  fullWidth
                  label='Last Name'
                  placeholder='Carter'
                />
              )}
            />
            {errors.lastName && <FormHelperText sx={{ color: 'error.main' }}>{errors.lastName.message}</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='nickName'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.nickName)}
                  required
                  fullWidth
                  label='Nick Name'
                  placeholder='carterLeonard'
                />
              )}
            />
            {errors.nickName && <FormHelperText sx={{ color: 'error.main' }}>{errors.nickName.message}</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <MobileDatePicker
                label='Season Start Date'
                value={basicPicker}
                sx={{ width: '10px' }}
                onChange={newValue => setBasicPicker(newValue)}
                renderInput={params => <TextField fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='phone1'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.phone1)}
                  required
                  fullWidth
                  label='Phone 1'
                  placeholder='123-456-7891'
                />
              )}
            />
            {errors.phone1 && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone1.message}</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='phone2'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.phone2)}
                  required
                  fullWidth
                  label='Phone 2'
                  placeholder='123-456-7891'
                />
              )}
            />
            {errors.phone2 && <FormHelperText sx={{ color: 'error.main' }}>{errors.phone2.message}</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='email1'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.email1)}
                  required
                  fullWidth
                  type='email'
                  label='Email 1'
                  placeholder='carterleonard@gmail.com'
                />
              )}
            />
            {errors.email1 && <FormHelperText sx={{ color: 'error.main' }}>{errors.email1.message}</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='email2'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.email2)}
                  required
                  fullWidth
                  type='email'
                  label='Email 2'
                  placeholder='carterleonard@gmail.com'
                />
              )}
            />
            {errors.email2 && <FormHelperText sx={{ color: 'error.main' }}>{errors.email2.message}</FormHelperText>}
          </Grid>

          {openAlert ? (
            <Grid item xs={12}>
              <Alert
                severity='warning'
                sx={{ '& a': { fontWeight: 400 } }}
                action={
                  <IconButton size='small' color='inherit' aria-label='close' onClick={() => setOpenAlert(false)}>
                    <Close fontSize='inherit' />
                  </IconButton>
                }
              >
                <AlertTitle sx={{ mb: '.15rem' }}>Your email is not confirmed. Please check your inbox.</AlertTitle>
                <Link href='/' onClick={e => e.preventDefault()}>
                  Resend Confirmation
                </Link>
              </Alert>
            </Grid>
          ) : null}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ mr: 4 }}>
              Save Changes
            </Button>
            <Button type='reset' variant='outlined' color='secondary'>
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabAccount
