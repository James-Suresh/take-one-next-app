// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Select from '@mui/material/Select'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import DialogTitle from '@mui/material/DialogTitle'
import FormControl from '@mui/material/FormControl'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import InputAdornment from '@mui/material/InputAdornment'
import LinearProgress from '@mui/material/LinearProgress'
import FormControlLabel from '@mui/material/FormControlLabel'
import DialogContentText from '@mui/material/DialogContentText'

// ** Icons Imports
import WorkRoundedIcon from '@mui/icons-material/WorkRounded'
import Poll from 'mdi-material-ui/Poll'
import Check from 'mdi-material-ui/Check'
import Circle from 'mdi-material-ui/Circle'
import StarOutline from 'mdi-material-ui/StarOutline'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Third Party Imports
import toast from 'react-hot-toast'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import axios from 'axios'
import { getLocalStorage } from 'src/hooks/helpers'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Styled <sup> component
const Sup = styled('sup')(({ theme }) => ({
  top: '0.2rem',
  left: '-0.6rem',
  position: 'absolute',
  color: theme.palette.primary.main
}))

// ** Styled <sub> component
const Sub = styled('sub')({
  fontWeight: 400,
  fontSize: '.875rem',
  lineHeight: '1.25rem',
  alignSelf: 'flex-end'
})

const roleColors = {
  admin: 'error',
  support: 'info',
  author: 'warning',
  user: 'success',
  subscriber: 'primary'
}

const positionColors = {
  LSP: 'success',
  LPA: 'warning',
  ALM: 'secondary'
}

const booleanColors = {
  true: 'success',
  false: 'warning'
}

// ** Default state values
const defaultValues = {
  legacy: false,
  crewParking: false,
  baseCamp: false,
  travel: false,
  requested: false,
  set: false,
  andyPriorityList: false,
  needsPotty: false,
  burned: false,
  doNotBook: false
}

const ViewProfileLeft = ({ data }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // YUP validation rules
  const schema = yup.object().shape({
    legacy: yup.boolean(),
    crewParking: yup.boolean(),
    baseCamp: yup.boolean(),
    travel: yup.boolean(),
    andyPriorityList: yup.boolean(),
    needsPotty: yup.boolean(),
    burned: yup.boolean(),
    doNotBook: yup.boolean()
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
    const { legacy, crewParking, baseCamp, travel, requested, set, andyPriorityList, needsPotty, burned, doNotBook } =
      data

    axios({
      method: 'PUT',
      url: 'http://localhost:8000/api/user/update',
      data: {
        legacy,
        crewParking,
        baseCamp,
        travel,
        requested,
        set,
        andyPriorityList,
        needsPotty,
        burned,
        doNotBook
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
                  <Typography variant='body2' sx={{ textTransform: 'capitalize' }}>
                    {data.role}
                  </Typography>
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
                  <Typography variant='body2'>{data.email1}</Typography>
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
                  <Typography variant='body2'>{data.shift}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Legacy:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={data.legacy.toString()}
                    color={booleanColors[data.legacy.toString()]}
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
                  <Typography variant='body2'>{data.labour}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Crew Parking:
                  </Typography>
                  <Typography variant='body2'>{data.email}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Basecamp:
                  </Typography>
                  <Typography variant='body2'>{data.baseCamp}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Travel:
                  </Typography>
                  <Typography variant='body2'>{data.travel}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Requested:
                  </Typography>
                  <Typography variant='body2'>{data.requested}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    On Set:
                  </Typography>
                  <Typography variant='body2'>{data.set}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Priority List:
                  </Typography>
                  <Typography variant='body2'>{data.andyPriorityList}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Needs Potty:
                  </Typography>
                  <Typography variant='body2'>{data.needsPotty}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Burned:
                  </Typography>
                  <Typography variant='body2'>{data.burned}</Typography>
                </Box>
                <Box sx={{ display: 'flex', mb: 2.7 }}>
                  <Typography variant='subtitle2' sx={{ mr: 2, color: 'text.primary' }}>
                    Do Not Book:
                  </Typography>
                  <Typography variant='body2'>{data.doNotBook}</Typography>
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

                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='legacy'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControlLabel
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.legacy)}
                            control={<Switch defaultChecked />}
                            label='Legacy employee'
                          />
                        )}
                      />
                      {errors.legacy && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.legacy.message}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControlLabel control={<Switch defaultChecked />} label='Email me when someone' />
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

export default ViewProfileLeft
