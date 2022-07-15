// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import DispatchTable from 'src/views/table/data-grid/DispatchTable'
import { Checkbox, Divider, FormControlLabel, FormGroup } from '@mui/material'

const DispatchPage = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <CardContent></CardContent>
        </Card>
      </Grid>
      <Grid item xs={3}>
        <Card sx={{ overflow: 'auto', maxHeight: '703px' }}>
          <CardContent>
            <Typography variant='h6'>Shift</Typography>
            <Divider />
            <FormGroup sx={{ mb: 3 }}>
              <FormControlLabel control={<Checkbox />} label='Day Shift' />
              <FormControlLabel control={<Checkbox />} label='Night Shift' />
            </FormGroup>
            <Typography variant='h6'>Abilities</Typography>
            <Divider />
            <FormGroup sx={{ mb: 3 }}>
              <FormControlLabel control={<Checkbox />} label='Legacy' />
              <FormControlLabel control={<Checkbox />} label='Vehicle' />
              <FormControlLabel control={<Checkbox />} label='Travel' />
              <FormControlLabel control={<Checkbox />} label='Priority List' />
              <FormControlLabel control={<Checkbox />} label='Labour' />
              <FormControlLabel control={<Checkbox />} label='Crew Parking' />
              <FormControlLabel control={<Checkbox />} label='Basecamp' />
              <FormControlLabel control={<Checkbox />} label='On Set' />
              <FormControlLabel control={<Checkbox />} label='Needs Potty' />
              <FormControlLabel control={<Checkbox />} label='ASAP calls' />
              <FormControlLabel control={<Checkbox />} label='Requested' />
            </FormGroup>
            <Typography variant='h6'>Location</Typography>
            <Divider />
            <FormGroup sx={{ mb: 3 }}>
              <FormControlLabel control={<Checkbox />} label='North' />
              <FormControlLabel control={<Checkbox />} label='East' />
              <FormControlLabel control={<Checkbox />} label='South' />
              <FormControlLabel control={<Checkbox />} label='West' />
            </FormGroup>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={9}>
        <DispatchTable />
      </Grid>
    </Grid>
  )
}
DispatchPage.acl = {
  action: 'manage',
  subject: 'dispatch-page'
}

export default DispatchPage
