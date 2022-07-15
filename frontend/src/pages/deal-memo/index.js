// ** React Imports
import { useContext } from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'

// ** Table Imports
import DealMemoTable from 'src/views/table/data-grid/DealMemoTable'

// ** Form Imports
import FormLayoutsDealMemo from 'src/views/forms/form-layouts/FormLayoutsDealMemo'

const DealMemoPage = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)

  return (
    <Grid container spacing={6}>
      {ability?.can('manage', 'dealmemo-form') ? (
        <Grid item xs={12}>
          <FormLayoutsDealMemo />
        </Grid>
      ) : null}
      <Grid item xs={12}>
        <DealMemoTable />
      </Grid>
    </Grid>
  )
}
DealMemoPage.acl = {
  action: 'manage',
  subject: 'dealmemo-page'
}

export default DealMemoPage
