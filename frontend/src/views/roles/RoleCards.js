// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import axios from 'axios'
import { getLocalStorage } from 'src/hooks/helpers'

// ** Icons Imports

const cardData = [
  { totalUsers: 4, title: 'Administrators', avatars: ['1.png', '2.png', '3.png', '4.png'] },
  { totalUsers: 5, title: 'Users', avatars: ['4.png', '5.png', '6.png', '7.png', '8.png'] }
]

const RolesCards = () => {
  // ** States
  const [open, setOpen] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Add')

  // ** Hooks

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues: { name: '' } })
  const handleClickOpen = () => setOpen(true)

  const handleClose = () => {
    setOpen(false)
    setValue('name', '')
  }

  const onSubmit = data => {
    const { email } = data
    axios({
      method: 'POST',
      url: 'http://localhost:8000/api/whitelist/email',
      data: { email },
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
      .then(response => {
        console.log('whitelist SUCCESS', response)
        toast.success("Employee's email address has been whitelisted!")
        handleClose()
      })
      .catch(error => {
        console.log('whitelist ERROR', error.response.data)
        toast.error('Employee Onboarding failed')
      })
  }

  const renderCards = () =>
    cardData.map((item, index) => (
      <Grid item xs={12} sm={6} lg={4} key={index}>
        <Card>
          <CardContent>
            <Box sx={{ mb: 7, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant='body2'>Total {item.totalUsers} users</Typography>
              <AvatarGroup
                max={4}
                sx={{
                  '& .MuiAvatarGroup-avatar': { fontSize: '.875rem' },
                  '& .MuiAvatar-root, & .MuiAvatarGroup-avatar': { width: 40, height: 40 }
                }}
              >
                {item.avatars.map((img, index) => (
                  <Avatar key={index} alt={item.title} src={`/images/avatars/${img}`} />
                ))}
              </AvatarGroup>
            </Box>
            <Box>
              <Typography variant='h6' sx={{ color: 'text.secondary' }}>
                {item.title}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    ))

  return (
    <Grid container spacing={6} className='match-height'>
      {renderCards()}
      <Grid item xs={12} sm={6} lg={4}>
        <Card
          sx={{ cursor: 'pointer' }}
          onClick={() => {
            handleClickOpen()
            setDialogTitle('Add')
          }}
        >
          <Grid container sx={{ height: '100%' }}>
            <Grid item xs={5}>
              <Box sx={{ height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <img width={65} height={130} alt='add-role' src='/images/cards/pose_m1.png' />
              </Box>
            </Grid>
            <Grid item xs={7}>
              <CardContent>
                <Box sx={{ textAlign: 'right' }}>
                  <Button
                    variant='contained'
                    sx={{ mb: 3, whiteSpace: 'nowrap' }}
                    onClick={() => {
                      handleClickOpen()
                      setDialogTitle('Add')
                    }}
                  >
                    Add New
                  </Button>
                  <Typography variant='body2'>Onboard employee, if they don't already exist.</Typography>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Dialog fullWidth maxWidth='md' scroll='body' onClose={handleClose} open={open}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle sx={{ textAlign: 'center' }}>
            <Typography variant='h4' component='span'>
              {`${dialogTitle} New Employee`}
            </Typography>
            <Typography variant='body2'>Set a whitelisted email address for new employee's below</Typography>
          </DialogTitle>
          <DialogContent sx={{ p: { xs: 6, sm: 12 } }}>
            <Box sx={{ my: 4 }}>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      value={value}
                      label='Email Address'
                      onChange={onChange}
                      error={Boolean(errors.email)}
                      placeholder='Enter email address to whitelist'
                    />
                  )}
                />
                {errors.email && (
                  <FormHelperText sx={{ color: 'error.main' }}>Please enter a valid email address</FormHelperText>
                )}
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions sx={{ pt: 0, display: 'flex', justifyContent: 'center' }}>
            <Box className='demo-space-x'>
              <Button size='large' type='submit' variant='contained'>
                Submit
              </Button>
              <Button size='large' color='secondary' variant='outlined' onClick={handleClose}>
                Discard
              </Button>
            </Box>
          </DialogActions>
        </form>
      </Dialog>
    </Grid>
  )
}

export default RolesCards
