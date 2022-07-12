// ** React Imports
import { Fragment } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Table from '@mui/material/Table'
import Avatar from '@mui/material/Avatar'
import Divider from '@mui/material/Divider'
import TableRow from '@mui/material/TableRow'
import { styled } from '@mui/material/styles'
import TimelineDot from '@mui/lab/TimelineDot'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TimelineItem from '@mui/lab/TimelineItem'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import AvatarGroup from '@mui/material/AvatarGroup'
import CardContent from '@mui/material/CardContent'
import TimelineContent from '@mui/lab/TimelineContent'
import TableContainer from '@mui/material/TableContainer'
import LinearProgress from '@mui/material/LinearProgress'
import TimelineSeparator from '@mui/lab/TimelineSeparator'
import TimelineConnector from '@mui/lab/TimelineConnector'
import MuiTimeline from '@mui/lab/Timeline'
import { Grid } from '@mui/material'

// ** Table Imports
import DealMemoTable from 'src/views/table/data-grid/DealMemoTable'
import UserAvailabilityTable from 'src/views/table/data-grid/UserAvailabilityTable'

const UserViewOverview = ({ viewedUser }) => {
  return (
    <Fragment>
      <Grid item md={12} xs={12} sx={{ mb: 6 }}>
        <Card>
          <UserAvailabilityTable viewedUser={viewedUser} />
        </Card>
      </Grid>
      <Grid item md={12} xs={12}>
        <DealMemoTable />
      </Grid>

      {/* <UserViewTimeline /> */}
    </Fragment>
  )
}

export default UserViewOverview
