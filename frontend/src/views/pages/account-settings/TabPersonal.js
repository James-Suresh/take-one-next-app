// ** React Imports
import { useRouter } from 'next/router'
import { useState } from 'react'

// ** MUI Imports
import { FormHelperText } from '@mui/material'
import Button from '@mui/material/Button'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import Grid from '@mui/material/Grid'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'

// ** Auth Imports

// ** Config
import authConfig from 'src/configs/auth'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { getCookies } from 'src/store/actions/cookie-actions'
import { setUser } from 'src/store/slices/auth-slice'
import * as yup from 'yup'

const TabPersonal = ({ data }) => {
  // ** State
  const [submit, setSubmit] = useState('save changes')

  // ** Hooks
  const router = useRouter();
  const dispatch = useDispatch();


  const defaultValues = {
    address: data.address,
    postalCode: data.postalCode,
    city: data.city,
    province: data.province,
    country: data.country
  }

  // YUP validation rules
  const schema = yup.object().shape({
    address: yup.string().required(),
    city: yup.string().required(),
    province: yup.string().required(),
    postalCode: yup.string().required(),
    country: yup.string().required()
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

  // Handle form submit
  const onSubmit = async data => {
    setSubmit('Saving...')
    const token = getCookies()
    const { address, city, postalCode, province, country } = data

    axios({
      method: 'PUT',
      url: 'http://localhost:8000/api/user/update/settings/personal-tab',
      data: {
        address,
        city,
        postalCode,
        province,
        country
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(() => {
        axios
          .get(authConfig.meEndpoint, {
            headers: {
              Authorization: token
            }
          })
          .then(async response => {
            dispatch(setUser(response.data.userData))

            console.log('WORK INFO UPDATE SUCCESS', response)
            setSubmit('Save changes')
            toast.success('Your personal details have been successfully updated!')
            router.push('/user-profile')
          })
          .catch(error => {
            console.log('WORK INFO UPDATE ERROR', error.data)
            toast.error('Your personal details failed to update. Please try again!')
          })
      })
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={6}>
            <Controller
              name='address'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.address)}
                  required
                  fullWidth
                  label='Street Address'
                  placeholder='Leonard'
                />
              )}
            />
            {errors.address && <FormHelperText sx={{ color: 'error.main' }}>{errors.address.message}</FormHelperText>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='postalCode'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.postalCode)}
                  required
                  fullWidth
                  label='Postal Code'
                  placeholder='A0A 0A0'
                />
              )}
            />
            {errors.postalCode && (
              <FormHelperText sx={{ color: 'error.main' }}>{errors.postalCode.message}</FormHelperText>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name='city'
              control={control}
              rules={{ required: true }}
              render={({ field: { value, onChange, onBlur } }) => (
                <TextField
                  value={value}
                  onBlur={onBlur}
                  onChange={onChange}
                  error={Boolean(errors.city)}
                  required
                  fullWidth
                  label='City'
                  placeholder='Toronto'
                />
              )}
            />
            {errors.city && <FormHelperText sx={{ color: 'error.main' }}>{errors.city.message}</FormHelperText>}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='stepper-alternative-personal-province-select-label'>Province</InputLabel>
              <Controller
                name='province'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Select
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.province)}
                    required
                    id='stepper-alternative-personal-multiple-select'
                    labelId='stepper-alternative-personal-province-select-label'
                    input={<OutlinedInput label='Province' id='stepper-alternative-select-multiple-language' />}
                  >
                    <MenuItem value='Alberta'>Alberta</MenuItem>
                    <MenuItem value='British Columbia'>British Columbia</MenuItem>
                    <MenuItem value='Manitoba'>Manitoba</MenuItem>
                    <MenuItem value='New Brunswick'>New Brunswick</MenuItem>
                    <MenuItem value='Newfoundland and Labrador'>Newfoundland and Labrador</MenuItem>
                    <MenuItem value='Northwest Territories'>Northwest Territories</MenuItem>
                    <MenuItem value='Nunavut'>Nunavut</MenuItem>
                    <MenuItem value='Ontario'>Ontario</MenuItem>
                    <MenuItem value='Prince Edward Island'>Prince Edward Island</MenuItem>
                    <MenuItem value='Quebec'>Quebec</MenuItem>
                    <MenuItem value='Saskatchewan'>Saskatchewan</MenuItem>
                    <MenuItem value='Yukon'>Yukon</MenuItem>
                  </Select>
                )}
              />
              {errors.province && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.province.message}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel id='stepper-alternative-personal-select-label'>Country</InputLabel>
              <Controller
                name='country'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <Select
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.country)}
                    label='Country'
                    id='stepper-alternative-personal-select'
                    labelId='stepper-alternative-personal-select-label'
                  >
                    <MenuItem value='Canada'>Canada</MenuItem>
                  </Select>
                )}
              />
              {errors.country && <FormHelperText sx={{ color: 'error.main' }}>{errors.country.message}</FormHelperText>}
            </FormControl>
          </Grid>
          <Grid item xs={12} sx={{ pt: theme => `${theme.spacing(7)} !important` }}>
            <Button variant='contained' sx={{ mr: 4 }} type='submit'>
              {submit}
            </Button>
            {/* <Button type='reset' variant='outlined' color='secondary' onClick={() => setDate(null)}>
              Reset
            </Button> */}
          </Grid>
        </Grid>
      </form>
    </CardContent>
  )
}

export default TabPersonal
