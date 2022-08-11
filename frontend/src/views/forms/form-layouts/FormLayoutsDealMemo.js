// ** React Imports
import { useState } from 'react'

// ** MUI Imports
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import DatePicker from '@mui/lab/DatePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { FormHelperText } from '@mui/material'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import uploadFile from 'src/configs/firebase/uploadFile'
import * as yup from 'yup'

// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { styled } from '@mui/material/styles'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'
import FileDocumentOutline from 'mdi-material-ui/FileDocumentOutline'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import { getCookies } from 'src/store/actions/cookie-actions'
import { v4 as uuidv4 } from 'uuid'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(10)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 250
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

// const CustomInput = forwardRef((props, ref) => {
//   return <TextField fullWidth {...props} inputRef={ref} label='Season Start Date' autoComplete='off' />
// })

const defaultValues = {
  showName: '',
  season: '',
  payrollPhone: '',
  payrollEmail: '',
  onboardingURL: ''
}

const FormLayoutsDealMemo = () => {
  // ** States
  // const [date, setDate] = useState(null)
  const [basicPicker, setBasicPicker] = useState(new Date())
  const [files, setFiles] = useState([])
  const [submit, setSubmit] = useState('Submit')

  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles)
      console.log(Object.values(acceptedFiles)[0])
    }
  })

  const handleLinkClick = event => {
    event.preventDefault()
  }

  const handleRemoveAllFiles = () => {
    setFiles([])
  }

  const handleRemoveFile = file => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter(i => i.name !== file.name)
    setFiles([...filtered])
  }

  function refreshPage() {
    window.location.reload()
  }

  const schema = yup.object().shape({
    showName: yup.string().required(),
    season: yup.string().required(),
    payrollPhone: yup.string().required(),
    payrollEmail: yup.string().required(),
    onboardingLink: yup.string()
  })

  // YUP controller
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
    setSubmit('submitting data')


    const token = getCookies();



    const file = Object.values(files)[0]
    const { showName, season, payrollPhone, payrollEmail, onboardingURL } = data
    if (file) {
      console.log(file)
      const fileName = uuidv4() + '.' + file
      const fileURL = await uploadFile(file, `dealmemo/${fileName}`)
      if (fileURL) {
        const dealMemoURL = fileURL
        const seasonStartDate = basicPicker
        console.log(dealMemoURL)

        axios({
          method: 'POST',
          url: 'http://localhost:8000/api/dealmemo/create/new',
          data: {
            showName,
            season,
            seasonStartDate,
            payrollPhone,
            payrollEmail,
            onboardingURL,
            dealMemoURL
          },
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
          .then(response => {
            console.log('signup success', response)
            setSubmit('submit')
            toast.success('New deal memo added!')
            refreshPage()
          })
          .catch(error => {
            console.log('Signup ERROR', error.response.data)
            toast.error('Failed to create new deal memo. Please try again.')
          })
      }
    }
    axios({
      method: 'POST',
      url: 'http://localhost:8000/api/dealmemo/create/new',
      data: {
        showName,
        season,
        seasonStartDate,
        payrollPhone,
        payrollEmail,
        onboardingURL
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log('signup success', response)
        setSubmit('submit')
        toast.success('New deal memo added!')
        refreshPage()
      })
      .catch(error => {
        console.log('Signup ERROR', error.response.data)
        toast.error('Failed to create new deal memo. Please try again.')
      })
  }

  const renderFilePreview = file => {
    // if (file.type.startsWith('image')) {
    //   return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file)} />
    // } else {
    return <FileDocumentOutline />
    // }
  }

  const fileList = files.map(file => (
    <ListItem key={file.name}>
      <div className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </div>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Close fontSize='small' />
      </IconButton>
    </ListItem>
  ))

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
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='Season Start Date'
                  value={basicPicker}
                  onChange={newValue => setBasicPicker(newValue)}
                  renderInput={params => <TextField fullWidth {...params} />}
                />
              </LocalizationProvider>
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
                name='onboardingURL'
                control={control}
                rules={{ required: true }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextField
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={Boolean(errors.onboardingURL)}
                    fullWidth
                    label='Onboarding Link'
                    placeholder='Leave empty if none'
                  />
                )}
              />
              {errors.onboardingURL && (
                <FormHelperText sx={{ color: 'error.main' }}>{errors.onboardingURL.message}</FormHelperText>
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
              <div
                {...getRootProps({ className: 'dropzone' })}
                style={{
                  border: '2px solid #DBDBDB',
                  borderStyle: 'dashed',
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '25px',
                  borderRadius: '10px'
                }}
              >
                <input {...getInputProps()} />
                <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
                  <Img width={300} alt='Upload img' src='/images/misc/upload.png' />
                  <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
                    <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
                    <Typography color='textSecondary'>
                      Drop files here or click{' '}
                      <Link href='/' onClick={handleLinkClick}>
                        browse
                      </Link>{' '}
                      thorough your machine
                    </Typography>
                  </Box>
                </Box>
              </div>
              {files.length ? (
                <Fragment>
                  <List>{fileList}</List>
                  <div className='buttons'>
                    <Button color='error' variant='outlined' onClick={handleRemoveAllFiles}>
                      Remove All
                    </Button>
                    <Button variant='contained' sx={{ margin: '20px' }}>
                      Upload Files
                    </Button>
                  </div>
                </Fragment>
              ) : null}
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: 2 }} />
        <CardActions>
          <Button size='large' type='submit' sx={{ mr: 2 }} variant='contained'>
            {submit}
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
