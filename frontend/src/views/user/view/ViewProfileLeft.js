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
import { styled } from '@mui/material/styles'
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
import * as yup from 'yup'

// ** Utils Import
import { getCookies } from 'src/store/actions/cookie-actions'

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
  support: 'warning',
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
  false: 'error'
}

const shiftColors = {
  Day: 'yeild',
  Night: 'info'
}

const ViewProfileLeft = ({ data }) => {
  // ** States
  const [openEdit, setOpenEdit] = useState(false)

  // Tokenization for server request
  const token = getCookies();


  // Handle Edit dialog
  const handleEditClickOpen = () => setOpenEdit(true)
  const handleEditClose = () => setOpenEdit(false)

  // Get viewed user ID from useEffect props
  const viewedUserId = data._id

  // ** Default state values
  const defaultValues = {
    legacy: data.legacy,
    crewParking: data.crewParking,
    baseCamp: data.baseCamp,
    travel: data.travel,
    requested: data.requested,
    set: data.set,
    andyPriorityList: data.andyPriorityList,
    needsPotty: data.needsPotty,
    burned: data.burned,
    doNotBook: data.doNotBook
  }

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

  const workDetailsLabel = value => (value === null ? 'No Record' : value.toString())

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

    console.log(travel)

    axios({
      method: 'PUT',
      url: 'http://localhost:8000/api/user/update/admin',
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
        doNotBook,
        viewedUserId
      },
      headers: {
        Authorization: `Bearer ${token}`
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
                    Legacy:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={workDetailsLabel(data.legacy)}
                    color={booleanColors[workDetailsLabel(data.legacy)]}
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
                    label={workDetailsLabel(data.labour)}
                    color={booleanColors[workDetailsLabel(data.labour)]}
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
                    Crew Parking:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={workDetailsLabel(data.crewParking)}
                    color={booleanColors[workDetailsLabel(data.crewParking)]}
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
                    Basecamp:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={workDetailsLabel(data.baseCamp)}
                    color={booleanColors[workDetailsLabel(data.baseCamp)]}
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
                    label={workDetailsLabel(data.travel)}
                    color={booleanColors[workDetailsLabel(data.travel)]}
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
                    Requested:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={workDetailsLabel(data.requested)}
                    color={booleanColors[workDetailsLabel(data.requested)]}
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
                    On Set:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={workDetailsLabel(data.set)}
                    color={booleanColors[workDetailsLabel(data.set)]}
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
                    Priority List:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={workDetailsLabel(data.andyPriorityList)}
                    color={booleanColors[workDetailsLabel(data.andyPriorityList)]}
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
                    Needs Potty:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={workDetailsLabel(data.needsPotty)}
                    color={booleanColors[workDetailsLabel(data.needsPotty)]}
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
                    Burned:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={workDetailsLabel(data.burned)}
                    color={booleanColors[workDetailsLabel(data.burned)]}
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
                    Do Not Book:
                  </Typography>
                  <CustomChip
                    skin='light'
                    size='small'
                    label={workDetailsLabel(data.doNotBook)}
                    color={booleanColors[workDetailsLabel(data.doNotBook)]}
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
                            control={<Switch />}
                            label='Legacy Employee'
                          />
                        )}
                      />
                      {errors.legacy && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.legacy.message}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='crewParking'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControlLabel
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.crewParking)}
                            control={<Switch />}
                            label='Crew Parking'
                          />
                        )}
                      />
                      {errors.crewParking && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.crewParking.message}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='baseCamp'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControlLabel
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.baseCamp)}
                            control={<Switch />}
                            label='Base Camp'
                          />
                        )}
                      />
                      {errors.baseCamp && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.baseCamp.message}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
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
                            defaultValue={data.travel}
                            control={<Switch />}
                            label='Travel'
                          />
                        )}
                      />
                      {errors.travel && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.travel.message}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='requested'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControlLabel
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.requested)}
                            control={<Switch />}
                            label='Requested'
                          />
                        )}
                      />
                      {errors.requested && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.requested.message}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='set'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControlLabel
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.set)}
                            control={<Switch />}
                            label='Set Floater'
                          />
                        )}
                      />
                      {errors.set && <FormHelperText sx={{ color: 'error.main' }}>{errors.set.message}</FormHelperText>}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='andyPriorityList'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControlLabel
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.andyPriorityList)}
                            control={<Switch />}
                            label='Priority List'
                          />
                        )}
                      />
                      {errors.andyPriorityList && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.andyPriorityList.message}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='needsPotty'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControlLabel
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.needsPotty)}
                            control={<Switch />}
                            label='Needs Potty'
                          />
                        )}
                      />
                      {errors.needsPotty && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.needsPotty.message}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='burned'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControlLabel
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.burned)}
                            control={<Switch />}
                            label='Burned'
                          />
                        )}
                      />
                      {errors.burned && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.burned.message}</FormHelperText>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Controller
                        name='doNotBook'
                        control={control}
                        rules={{ required: true }}
                        render={({ field: { value, onChange, onBlur } }) => (
                          <FormControlLabel
                            value={value}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={Boolean(errors.doNotBook)}
                            control={<Switch />}
                            label='Do Not Book'
                          />
                        )}
                      />
                      {errors.doNotBook && (
                        <FormHelperText sx={{ color: 'error.main' }}>{errors.doNotBook.message}</FormHelperText>
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

export default ViewProfileLeft
