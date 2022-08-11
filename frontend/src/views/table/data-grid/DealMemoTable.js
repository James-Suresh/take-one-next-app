// ** React Imports
import React, { useCallback, useEffect, useState } from 'react'

// ** Next Images
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { DataGrid } from '@mui/x-data-grid'

// ** Icons Imports
import AccountOutline from 'mdi-material-ui/AccountOutline'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CogOutline from 'mdi-material-ui/CogOutline'
import Laptop from 'mdi-material-ui/Laptop'
import PencilOutline from 'mdi-material-ui/PencilOutline'

// ** Store Imports

// ** Custom Components Imports

// ** Utils Import

// ** Actions Imports

// ** Custom Components Imports
import axios from 'axios'
import moment from 'moment'
import { getCookies } from 'src/store/actions/cookie-actions'
import DealMemoTableHeader from 'src/views/table/data-grid/DealMemoTableHeader'

// ** Vars
const userRoleObj = {
  admin: <Laptop sx={{ mr: 2, color: 'error.main' }} />,
  author: <CogOutline sx={{ mr: 2, color: 'warning.main' }} />,
  editor: <PencilOutline sx={{ mr: 2, color: 'info.main' }} />,
  maintainer: <ChartDonut sx={{ mr: 2, color: 'success.main' }} />,
  subscriber: <AccountOutline sx={{ mr: 2, color: 'primary.main' }} />
}

const userStatusObj = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
}

// ** Styled component for the link for the avatar with image
const AvatarWithImageLink = styled(Link)(({ theme }) => ({
  marginRight: theme.spacing(3)
}))

// ** Styled component for the link for the avatar without image
const AvatarWithoutImageLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  marginRight: theme.spacing(3)
}))

// const dealMemoLink = row => (row.dealMemoURL === null ? row.onboardingLink : row.dealMemoURL)

// ** renders client column
// const renderClient = row => {
//   const randomColor = '#000000'.replace(/0/g, function () {
//     return (~~(Math.random() * 16)).toString(16)
//   })
//   console.log('randomColor', randomColor)

//   return (
//     <CustomAvatar skin='light' color={randomColor} sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}>
//       {getInitials(row.showName ? row.showName : 'Show Name')}
//     </CustomAvatar>
//   )
// }

const columns = [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'showName',
    headerName: 'Show',
    renderCell: ({ row }) => {
      const { showName } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* {renderClient(row)} */}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Typography noWrap component='a' variant='subtitle2' sx={{ color: 'text.primary', textDecoration: 'none' }}>
              {showName}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'season',
    minWidth: 120,
    headerName: 'Season',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.season}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    field: 'seasonStartDate',
    minWidth: 150,
    headerName: 'Start Date',
    renderCell: ({ row }) => {
      const formattedDate = moment(row.seasonStartDate).format('LL')

      return (
        <Typography variant='body2' noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
          {formattedDate}
        </Typography>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'payrollEmail',
    headerName: 'Payroll Email',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap>
          {row.payrollEmail}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Phone',
    field: 'payrollPhone',
    renderCell: ({ row }) => {
      return (
        <Link href={`tel:${row.payrollPhone}`} passHref>
          <Typography noWrap variant='body2' component='a' sx={{ textTransform: 'capitalize', textDecoration: 'none' }}>
            {row.payrollPhone}
          </Typography>
        </Link>
      )
    }
  },
  // {
  //   flex: 0.1,
  //   minWidth: 110,
  //   field: 'status',
  //   headerName: 'Position',
  //   renderCell: ({ row }) => {
  //     return (
  //       <CustomChip
  //         skin='light'
  //         size='small'
  //         label={row.status}
  //         color={userStatusObj[row.status]}
  //         sx={{ textTransform: 'capitalize' }}
  //       />
  //     )
  //   }
  // },
  {
    flex: 0.2,
    minWidth: 130,
    sortable: false,
    field: 'actions',
    headerName: 'Link',
    renderCell: ({ row }) => (
      // <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <a
        href={row.dealMemoURL === null ? row.onboardingURL : row.dealMemoURL}
        target='_blank'
        style={{ textDecoration: 'none' }}
      >
        <Button
          size='small'
          variant='contained'
          color='primary'
        // onClick={() => getFullName(params)}
        >
          Deal MEMO
        </Button>
      </a>
      // </Box>
    )
  }
]

const UserList = () => {
  // ** State
  const [plan, setPlan] = useState('')
  const [value, setValue] = useState('')
  const [pageSize, setPageSize] = useState(10)
  const [data, setData] = React.useState([])

  // Tokenization for server request

  // ** Hooks
  // const dispatch = useDispatch()
  // const store = useSelector(state => state.user)
  // useEffect(() => {
  //   dispatch(
  //     fetchData({
  //       role: '',
  //       q: value,
  //       status: '',
  //       currentPlan: plan
  //     })
  //   )
  // }, [dispatch, plan, value])

  useEffect(() => {
    getDealMemos()
  }, [])

  const getDealMemos = async () => {
    const token = getCookies();

    const response = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/dealmemo/all',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (response.status === 200) {
      setData(response.data.result)
    }
  }

  const handleFilter = useCallback(val => {
    setValue(val)
  }, [])

  const handlePlanChange = useCallback(e => {
    setPlan(e.target.value)
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <DealMemoTableHeader
            plan={plan}
            value={value}
            handleFilter={handleFilter}
            handlePlanChange={handlePlanChange}
          />
          <DataGrid
            autoHeight
            getRowId={() => Math.floor(Math.random() * 100000000)}
            rows={data}
            columns={columns}
            pageSize={pageSize}
            disableSelectionOnClick
            rowsPerPageOptions={[10, 25, 50]}
            onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            sx={{ '& .MuiDataGrid-columnHeaders': { borderRadius: 0 } }}
          />
        </Card>
      </Grid>
    </Grid>
  )
}

export default UserList
