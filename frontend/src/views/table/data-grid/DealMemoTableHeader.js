// ** RSUITE Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'

// ** Icons Imports
import ExportVariant from 'mdi-material-ui/ExportVariant'
import { Typography } from '@mui/material'

const DealMemoTableHeader = props => {
  // ** Props
  const { plan, handlePlanChange, handleFilter, value } = props

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* <Button sx={{ mr: 4, mb: 2 }} color='secondary' variant='outlined' startIcon={<ExportVariant />}>
        Export
      </Button>
      <TextField
        size='small'
        value={value}
        placeholder='Search User'
        sx={{ mr: 6, mb: 2 }}
        onChange={e => handleFilter(e.target.value)}
      /> */}
      <Typography variant='h6' sx={{ my: 4 }}>
        All Current Deal Memos
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <FormControl size='small' sx={{ mb: 2 }}></FormControl>
      </Box>
    </Box>
  )
}

export default DealMemoTableHeader
