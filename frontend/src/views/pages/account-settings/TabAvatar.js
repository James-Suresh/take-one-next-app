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
import { getLocalStorage, isAuth } from 'src/hooks/helpers'
import uploadFile from 'src/configs/firebase/uploadFile'
import { fetchData } from 'src/store/apps/user'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

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

const TabAccount = () => {
  // ** State
  const [imgSrc, setImgSrc] = useState('/images/avatars/1.png')

  // ** Hooks
  const auth = isAuth()

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  // const onChange = file => {
  //   const reader = new FileReader()
  //   const { files } = file.target
  //   if (files && files.length !== 0) {
  //     reader.onload = () => setImgSrc(reader.result)
  //     reader.readAsDataURL(files[0])
  //   }
  // }

  // const onChange = e => {
  //   const file = e.target.files[0]
  //   if (file) {
  //     const photoURL = URL.createObjectURL(file)
  //     setImgSrc(photoURL)
  //   }
  // }

  const onChange = e => {
    const file = e.target.files[0]
    if (file) {
      // const photoURL = URL.createObjectURL(file)
      setImgSrc(file)
    }
  }
  console.log(imgSrc)

  const updateAvatar = async (currentUser, imgSrc) => {
    const file = imgSrc
    if (file) {
      const imageName = uuidv4() + '.' + file
      const photoURL = await uploadFile(file, `profile/${currentUser._id}/${imageName}`)
      if (photoURL) {
        console.log('after If', photoURL)
        axios({
          method: 'PUT',
          url: 'http://localhost:8000/api/user/avatar/update',
          data: { photoURL },
          headers: {
            Authorization: `Bearer ${storageChecked}`
          }
        })
          .then(response => {
            console.log('URL update success', response)
            toast.success('Your profile picture has been updated! Please log in again to see updates.')
          })
          .catch(error => {
            console.log('URL update FAILED', error.response.data)
            toast.error('Your profile picture was not updated.')
          })
      }
    }
  }

  const onSubmit = e => {
    e.preventDefault()
    const currentUser = auth
    updateAvatar(currentUser, imgSrc)
    console.log('imgSOURCE', imgSrc)
  }

  return (
    <CardContent>
      <form onSubmit={onSubmit}>
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

          <Grid item xs={12}>
            <Button variant='contained' sx={{ mr: 4 }} type='submit'>
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
