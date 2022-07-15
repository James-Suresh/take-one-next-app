// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'

// ** Custom Components
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomChip from 'src/@core/components/mui/chip'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getLocalStorage } from 'src/hooks/helpers'
import * as yup from 'yup'

// ** Utils Import

const roleColors = {
  admin: 'royal',
  support: 'warning',
  user: 'info'
}

const positionColors = {
  LSP: 'info',
  LPA: 'error',
  ALM: 'warning'
}

const booleanColors = {
  true: 'success',
  false: 'error'
}

const shiftColors = {
  Day: 'yeild',
  Night: 'info'
}

// ** Default state values
const defaultValues = {
  vehicle: false,
  travel: false,
  labour: false
}

const UserViewLeft = ({ data }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Get viewed user ID from useEffect props
  const viewedUserId = data._id

  // YUP validation rules
  const schema = yup.object().shape({
    vehicle: yup.boolean(),
    travel: yup.boolean(),
    labour: yup.boolean()
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
  const onSubmit = data => {
    const { vehicle, travel, labour } = data

    console.log(travel)

    axios({
      method: 'PUT',
      url: 'http://localhost:8000/api/user/update/admin',
      data: {
        vehicle,
        travel,
        labour,
        viewedUserId
      },
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
      .then(response => {
        console.log('User Edit Success', response)
        toast.success('Employee information has been edited!')
      })
      .catch(error => {
        console.log('User Edit ERROR', error.response.data)
        toast.error('Employee information edit failed. Please try again or contact support!')
      })
  }

  const renderUserAvatar = () => {
    if (data) {
      if (data.photoURL.length) {
        return (
          <CustomAvatar
            alt='User Image'
            src={data.photoURL}
            variant='rounded'
            sx={{ width: 120, height: 120, mb: 4 }}
          />
        )
        // }
        // else {
        //   return (
        //     <CustomAvatar
        //       skin='light'
        //       variant='rounded'
        //       color={data.avatarColor}
        //       sx={{ width: 120, height: 120, fontWeight: 600, mb: 4, fontSize: '3rem' }}
        //     >
        //       {getInitials(data.fullName)}
        //     </CustomAvatar>
        //   )
      }
    } else {
      return null
    }
  }
  if (data) {
    return (
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardContent sx={{ pt: 15, display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
              {renderUserAvatar()}
              <Typography variant='h6' sx={{ mb: 4 }}>
                {`${data.firstName} ${data.lastName}`}
              </Typography>
              <CustomChip
                skin='light'
                size='small'
                label={data.role}
                color={roleColors[data.role]}
                sx={{
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                  textTransform: 'capitalize',
                  '& .MuiChip-label': { mt: -0.25 }
                }}
              />
            </CardContent>

            <CardContent sx={{ my: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}></Box>
            </CardContent>

            <CardContent>
              <Typography variant='h6'>Account Details</Typography>
              <Divider sx={{ mt: 4 }} />
              <Box sx={{ pt: 2, pb: 1 }}>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Name:
                  </Typography>
                  <Typography variant='body2'>{`${data.firstName} ${data.lastName}`}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography sx={{ mr: 2, fontWeight: 500, fontSize: '0.875rem' }}>Role:</Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.role}
                    color={roleColors[data.role]}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Position:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.position}
                    color={positionColors[data.position]}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Phone 1:
                  </Typography>
                  <Typography variant='body2'>{data.phone1}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Phone 2:
                  </Typography>
                  <Typography variant='body2'>{data.phone2}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email 1:
                  </Typography>
                  <Typography variant='body2'>{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Email 2:
                  </Typography>
                  <Typography variant='body2'>{data.email2}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Street Address:
                  </Typography>
                  <Typography variant='body2'>{data.address}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    City:
                  </Typography>
                  <Typography variant='body2'>{data.city}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Postal Code:
                  </Typography>
                  <Typography variant='body2'>{data.postalCode}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Country:
                  </Typography>
                  <Typography variant='body2'>{data.country}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Region:
                  </Typography>
                  <Typography variant='body2'>{data.email}</Typography>
                </Box>
                <Typography sx={{ mt: 6 }} variant='h6'>
                  Work Details
                </Typography>
                <Divider sx={{ mt: 4 }} />
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Shift:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.shift}
                    color={shiftColors[data.shift]}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Labour:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.labour.toString()}
                    color={booleanColors[data.labour.toString()]}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>

                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Vehicle:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.vehicle.toString()}
                    color={booleanColors[data.vehicle.toString()]}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Travel:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.travel.toString()}
                    color={booleanColors[data.travel.toString()]}
                    sx={{
                      height: 20,
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderRadius: '5px',
                      textTransform: 'capitalize'
                    }}
                  />
                </Box>
              </Box>
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant='contained' sx={{ width: '100%' }} onClick={handleEditClickOpen}>
                Edit
              </Button>
            </CardActions>

            <Dialog
              open={openEdit}
              onClose={handleEditClose}
              aria-labelledby='user-view-edit'
              sx={{ '& .MuiPaper-root': { width: '100%', maxWidth: 650, p: [2, 10] } }}
              aria-describedby='user-view-edit-description'
            >
              <DialogTitle id='user-view-edit' sx={{ textAlign: 'center', fontSize: '1.5rem !important' }}>
                Edit User Information
              </DialogTitle>
              <DialogContent>
                <DialogContentText variant='body2' id='user-view-edit-description' sx={{ textAlign: 'center', mb: 7 }}>
                  Updating user details will receive a privacy audit.
                </DialogContentText>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='First Name' defaultValue={data.firstName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth label='Last Name' defaultValue={data.lastName} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField fullWidth type='email' label='Email' defaultValue={data.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='user-view-status-label'>Position</InputLabel>
                        <Select
                          label='Status'
                          defaultValue={data.position}
                          id='user-view-status'
                          labelId='user-view-status-label'
                        >
                          <MenuItem value='LSP'>LSP</MenuItem>
                          <MenuItem value='LPA'>LPA</MenuItem>
                          <MenuItem value='ALM'>ALM</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <Box sx={{ my: 4, display: 'flex', alignItems: 'center' }}>
                        <WorkRoundedIcon sx={{ fontSize: '1.75rem', mr: 2 }} />
                        <Typography variant='h6'>Work Details</Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Controller
                        name='vehicle'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControlLabel
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.travel)}
                            control={<Switch />}
                            label='Has a vehicle'
                          />
                        )}
                      />
                      {errors.travel && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.travel.message}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name='travel'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControlLabel
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.travel)}
                            control={<Switch />}
                            label='Willing to travel'
                          />
                        )}
                      />
                      {errors.travel && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.travel.message}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12}>
                      <Controller
                        name='labour'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControlLabel
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.travel)}
                            control={<Switch />}
                            label='Can do physical Labour'
                          />
                        )}
                      />
                      {errors.travel && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.travel.message}</FormHelperText>
                      )}
                    </Grid>
                  </Grid>
                  <DialogActions sx={{ justifyContent: 'center', mt: 10 }}>
                    <Button variant='contained' sx={{ mr: 2 }} type='submit' onClick={handleEditClose}>
                      Submit
                    </Button>
                    <Button variant='outlined' color='secondary' onClick={handleEditClose}>
                      Discard
                    </Button>
                  </DialogActions>
                </form>
              </DialogContent>
            </Dialog>
          </Card>
        </Grid>
      </Grid>
    )
  } else {
    return null
  }
}

export default UserViewLeft
