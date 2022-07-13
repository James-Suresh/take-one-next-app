// ** React Imports
import { useEffect, useState } from 'react'

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
import AdapterDateFns from '@mui/lab/AdapterDateFns'

// ** Auth Imports
import { getLocalStorage, isAuth } from 'src/hooks/helpers'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Third Party Imports
import uploadFile from 'src/configs/firebase/uploadFile'
import { v4 as uuidv4 } from 'uuid'
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'
import { useRouter } from 'next/router'

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
  email2: ''
}

// ** Auth variables
// const auth = isAuth()
// const currentUser = auth

const TabAccount = ({ data }) => {
  // ** State
  // const [openAlert, setOpenAlert] = useState(true)
  const [basicPicker, setBasicPicker] = useState(new Date())
  const [imgSrc, setImgSrc] = useState(data.photoURL)
  const [newPhoto, setNewPhoto] = useState()
  const [submit, setSubmit] = useState('save changes')

  // ** Hooks
  const router = useRouter()

  const onChange = e => {
    const file = e.target.files[0]
    if (file) {
      setImgSrc(file)
      const newPhotoURL = URL.createObjectURL(file)
      setNewPhoto(newPhotoURL)
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
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })

  // Handle form submit to database
  const onSubmit = async data => {
    setSubmit('Saving...')
    const file = imgSrc
    if (file) {
      // define all variables to send to backend
      const since = basicPicker
      const imageName = uuidv4() + '.' + file
      const photoURL = await uploadFile(file, `profile/${data._id}/${imageName}`)
      const { firstName, lastName, nickName, phone1, phone2, email1, email2 } = data

      if (photoURL) {
        axios({
          method: 'PUT',
          url: 'http://localhost:8000/api/user/update/settings/account',
          data: {
            firstName,
            lastName,
            nickName,
            phone1,
            since,
            phone2,
            email1,
            email2,
            photoURL
          },
          headers: {
            Authorization: `Bearer ${storageChecked}`
          }
        })
          .then(response => {
            setSubmit('Save changes')
            console.log('User info update success', response)
            toast.success('Your profile has been updated! Please log in again to see updates.')
            router.push('/user-profile/')
          })
          .catch(error => {
            console.log('User info update FAILED', error.response.data)
            toast.error('Your profile failed to update. Please try again or contact support if the problem continues')
          })
      }
    }
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item xs={12} sx={{ my: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {newPhoto ? <ImgStyled src={newPhoto} alt='Profile Pic' /> : <ImgStyled src={imgSrc} alt='Profile Pic' />}
              {/* <ImgStyled src={photoURL} alt='Profile Pic' /> */}
              <Box>
                <ButtonStyled component='label' variant='contained' htmlFor='account-settings-upload-image'>
                  Upload New Photo
                  <input
                    hidden
                    type='file'
                    onChange={onChange}
                    accept='image/png, image/jpeg, application/pdf'
                    id='account-settings-upload-image'
                  />
                </ButtonStyled>
                <ResetButtonStyled color='error' variant='outlined' onClick={() => setImgSrc('/images/avatars/9.jpeg')}>
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

          {/* {openAlert ? (
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
          ) : null} */}

          <Grid item xs={12}>
            <Button variant='contained' sx={{ mr: 4 }} type='submit'>
              {submit}
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
