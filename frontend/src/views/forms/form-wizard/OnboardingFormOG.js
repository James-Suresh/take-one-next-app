// ** React Imports
import { Fragment, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Step from '@mui/material/Step'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Stepper from '@mui/material/Stepper'
import MenuItem from '@mui/material/MenuItem'
import StepLabel from '@mui/material/StepLabel'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputLabel from '@mui/material/InputLabel'
import CardContent from '@mui/material/CardContent'
import FormControl from '@mui/material/FormControl'
import OutlinedInput from '@mui/material/OutlinedInput'
import InputAdornment from '@mui/material/InputAdornment'
import Select from '@mui/material/Select'
import MobileDatePicker from '@mui/lab/MobileDatePicker'

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline'
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline'

// ** Custom Components Imports
import StepperCustomDot from './StepperCustomDot'

// ** Third Party Imports
import toast from 'react-hot-toast'

// ** Styled Component
import StepperWrapper from 'src/@core/styles/mui/stepper'
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

const steps = [
  {
    title: 'Account Details',
    subtitle: 'Setup Information'
  },
  {
    title: 'Personal Info',
    subtitle: 'Setup Information'
  },
  {
    title: 'Labour Details',
    subtitle: 'Work Information'
  }
]

const OnboaringForm = () => {
  // ** States
  const [streetAddress, setStreetAddress] = useState('')
  const [city, setCity] = useState('')
  const [postalCode, setPostalCode] = useState('')
  const [province, setProvince] = useState('')
  const [country, setCountry] = useState('')
  const [email1, setEmail1] = useState('')
  const [email2, setEmail2] = useState('')
  const [google, setGoogle] = useState('')
  const [since, setSince] = useState('')
  const [twitter, setTwitter] = useState('')
  const [nickname, setNickname] = useState('')
  const [facebook, setFacebook] = useState('')
  const [linkedIn, setLinkedIn] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone1, setPhone1] = useState('')
  const [phone2, setPhone2] = useState('')
  const [activeStep, setActiveStep] = useState(0)

  const [state, setState] = useState({
    password: '',
    password2: '',
    showPassword: false,
    showPassword2: false
  })

  // Handle Stepper
  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
    if (activeStep === steps.length - 1) {
      toast.success('Form Submitted')
    }
  }

  const handleReset = () => {
    setStreetAddress('')
    setCity('')
    setProvince('')
    setCountry('')
    setPostalCode('')
    setEmail1('')
    setEmail2('')
    setGoogle('')
    setCountry('')
    setTwitter('')
    setNickname('')
    setLastName('')
    setFacebook('')
    setLinkedIn('')
    setFirstName('')
    setPhone1('')
    setPhone2('')
    setSince('')
    setActiveStep(0)
    setState({ ...state, password: '', password2: '' })
  }

  // Handle Language
  const handleSelectChange = event => {
    setProvince(event.target.value)
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <Fragment>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label='First Name'
                placeholder='Leonard'
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Last Name'
                placeholder='Carter'
                value={lastName}
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Nick Name'
                value={nickname}
                placeholder='carterLeonard'
                onChange={e => setNickname(e.target.value)}
              />
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <MobileDatePicker
                fullWidth
                label='Working Since'
                inputFormat='MM/dd/yyyy'
                value={since}
                onChange={e => setSince(e.target.value)}
                renderInput={params => <TextField {...params} variant='outlined' />}
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Phone 1'
                value={phone1}
                placeholder='123-456-7891'
                onChange={e => setPhone1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='number'
                label='Phone 2'
                value={phone2}
                placeholder='carterleonard@gmail.com'
                onChange={e => setPhone2(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='email'
                label='Email 1'
                value={email1}
                placeholder='carterleonard@gmail.com'
                onChange={e => setEmail1(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type='email'
                label='Email 2'
                value={email2}
                placeholder='carterleonard@gmail.com'
                onChange={e => setEmail2(e.target.value)}
              />
            </Grid>
          </Fragment>
        )
      case 1:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Street Address'
                placeholder='Leonard'
                value={streetAddress}
                onChange={e => setStreetAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='Postal Code'
                placeholder='A0A 0A0'
                value={postalCode}
                onChange={e => setPostalCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label='City'
                placeholder='Toronto'
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='stepper-alternative-personal-province-select-label'>Province</InputLabel>
                <Select
                  value={province}
                  onChange={handleSelectChange}
                  id='stepper-alternative-personal-multiple-select'
                  labelId='stepper-alternative-personal-province-select-label'
                  input={<OutlinedInput label='Language' id='stepper-alternative-select-multiple-language' />}
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
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id='stepper-alternative-personal-select-label'>Country</InputLabel>
                <Select
                  label='Country'
                  value={country}
                  id='stepper-alternative-personal-select'
                  onChange={e => setCountry(e.target.value)}
                  labelId='stepper-alternative-personal-select-label'
                >
                  <MenuItem value='Canada'>Canada</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Fragment>
        )
      case 2:
        return (
          <Fragment key={step}>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ padding: '10px' }}>
                <FormLabel id='demo-radio-buttons-group-label'>Do you prefer day, night or both shifts?</FormLabel>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='radio-buttons-group'
                  sx={{ padding: '20px' }}
                >
                  <FormControlLabel value='Day' control={<Radio />} label='Day' />
                  <FormControlLabel value='Night' control={<Radio />} label='Night' />
                  <FormControlLabel value='Day, Night' control={<Radio />} label='Both' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ padding: '10px' }}>
                <FormLabel id='demo-radio-buttons-group-label'>
                  Are you able and interested in doing labour shifts? The ability to move heavy objects is required.
                </FormLabel>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='radio-buttons-group'
                  sx={{ padding: '20px' }}
                >
                  <FormControlLabel value='Day' control={<Radio />} label='Day' />
                  <FormControlLabel value='Night' control={<Radio />} label='Night' />
                  <FormControlLabel value='Day, Night' control={<Radio />} label='Both' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl sx={{ padding: '10px' }}>
                <FormLabel id='demo-radio-buttons-group-label'>
                  Are you able and interested in doing labour shifts? The ability to move heavy objects is required.
                </FormLabel>
                <RadioGroup
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='radio-buttons-group'
                  sx={{ padding: '20px' }}
                >
                  <FormControlLabel value='Day' control={<Radio />} label='Day' />
                  <FormControlLabel value='Night' control={<Radio />} label='Night' />
                  <FormControlLabel value='Day, Night' control={<Radio />} label='Both' />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Fragment>
        )
      default:
        return 'Unknown Step'
    }
  }

  const renderContent = () => {
    if (activeStep === steps.length) {
      return (
        <Fragment>
          <Typography>All steps are completed!</Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size='large' variant='contained' onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </Fragment>
      )
    } else {
      return (
        <form onSubmit={e => e.preventDefault()}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Typography variant='body2' sx={{ fontWeight: 600, color: 'text.primary' }}>
                {steps[activeStep].title}
              </Typography>
              <Typography variant='caption' component='p'>
                {steps[activeStep].subtitle}
              </Typography>
            </Grid>
            {getStepContent(activeStep)}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                size='large'
                variant='outlined'
                color='secondary'
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button size='large' variant='contained' onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </form>
      )
    }
  }

  return (
    <Fragment>
      <StepperWrapper>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={StepperCustomDot}>
                  <div className='step-label'>
                    <div>
                      <Typography className='step-title'>{step.title}</Typography>
                      <Typography className='step-subtitle'>{step.subtitle}</Typography>
                    </div>
                  </div>
                </StepLabel>
              </Step>
            )
          })}
        </Stepper>
      </StepperWrapper>
      <Card sx={{ mt: 4 }}>
        <CardContent>{renderContent()}</CardContent>
      </Card>
    </Fragment>
  )
}

export default OnboaringForm
