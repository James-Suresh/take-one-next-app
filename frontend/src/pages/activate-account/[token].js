// ** Next Imports
import { useRouter } from 'next/router'

// ** MUI Components
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiCard from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

// ** Third Party Imports
import toast from 'react-hot-toast'
import axios from 'axios'

// ** Configs
import themeConfig from 'src/configs/themeConfig'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Styled Components
const Card = styled(MuiCard)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: 450 }
}))

const TypographyStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: '0.18px',
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down('md')]: { marginTop: theme.spacing(8) }
}))

const ActivateAccountPage = () => {
  // ** Hooks
  const router = useRouter()
  const { token } = router.query

  const clickSubmit = event => {
    event.preventDefault()
    // console.log(token)
    axios({
      method: 'POST',
      url: 'http://localhost:8000/api/account-activation',
      data: { token }
    })
      .then(response => {
        toast.success(response.data.message)
        router.push('/login')
      })
      .catch(error => {
        toast.error(error.response.data.error)
      })
  }

  return (
    <Box className='content-center'>
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ p: theme => `${theme.spacing(13, 7, 6.5)} !important` }}>
          <Box sx={{ mb: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img width='60' height='33' alt='Github' src='/images/logos/Logo-TO.png' style={{ marginRight: '7px' }} />
            <Typography variant='h6' sx={{ ml: 2, lineHeight: 1, fontWeight: 700, fontSize: '1.5rem !important' }}>
              {themeConfig.templateName}
            </Typography>
          </Box>
          <Box sx={{ mb: 6 }}>
            <TypographyStyled variant='h5'>{`Activate your account! 🔑`}</TypographyStyled>
            <Typography variant='body2'>
              Please click the button below to activate and sign-in to your new account
            </Typography>
          </Box>
          <form noValidate autoComplete='off'>
            <Button fullWidth onClick={clickSubmit} size='large' type='submit' variant='contained' sx={{ my: 7 }}>
              Activate Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
ActivateAccountPage.getLayout = page => <BlankLayout>{page}</BlankLayout>
ActivateAccountPage.guestGuard = true

export default ActivateAccountPage
