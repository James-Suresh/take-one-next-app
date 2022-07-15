// ** React Imports
import React, { useEffect, useCallback, useState } from 'react'

// ** Next Images
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { DataGrid } from '@mui/x-data-grid'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// ** Icons Imports
import Laptop from 'mdi-material-ui/Laptop'
import ChartDonut from 'mdi-material-ui/ChartDonut'
import CogOutline from 'mdi-material-ui/CogOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import PencilOutline from 'mdi-material-ui/PencilOutline'
import AccountOutline from 'mdi-material-ui/AccountOutline'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Actions Imports
import { fetchData } from 'src/store/apps/user'

// ** Custom Components Imports
import TableHeader from 'src/views/roles/TableHeader'
import { getLocalStorage } from 'src/hooks/helpers'
import axios from 'axios'

// ** Vars
const userRoleObj = {
  admin: <Laptop sx={{ mr: 2, color: 'royal.main' }} />,
  support: <CogOutline sx={{ mr: 2, color: 'warning.main' }} />,
  // editor: <PencilOutline sx={{ mr: 2, color: 'info.main' }} />,
  // maintainer: <ChartDonut sx={{ mr: 2, color: 'success.main' }} />,
  user: <AccountOutline sx={{ mr: 2, color: 'info.main' }} />
}

const userPositionObj = {
  LSP: 'primary',
  LPA: 'warning',
  ALM: 'secondary'
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

// ** renders client column
const renderClient = row => {
  if (row.photoURL.length) {
    return (
      <AvatarWithImageLink href={`/view-profile/${row._id}`}>
        <CustomAvatar src={row.photoURL} sx={{ mr: 3, width: 34, height: 34, cursor: 'pointer' }} />
      </AvatarWithImageLink>
    )
  }
  // else {
  //   return (
  //     <AvatarWithoutImageLink href={`/apps/user/view/${row.id}`}>
  //       <CustomAvatar skin='light' color={row.avatarColor} sx={{ mr: 3, width: 34, height: 34, fontSize: '1rem' }}>
  //         {getInitials(row.fullName ? row.fullName : 'John Doe')}
  //       </CustomAvatar>
  //     </AvatarWithoutImageLink>
  //   )
  // }
}

const columns = [
  {
    flex: 0.2,
    minWidth: 230,
    field: 'fullName',
    headerName: 'User',
    renderCell: ({ row }) => {
      const { _id, firstName, lastName, email } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
            <Link href={`/view-profile/${_id}`} passHref>
              <Typography
                noWrap
                component='a'
                variant='subtitle2'
                sx={{ color: 'text.primary', textDecoration: 'none' }}
              >
                {`${firstName} ${lastName}`}
              </Typography>
            </Link>
            <Link href={`/view-profile/${_id}`} passHref>
              <Typography noWrap component='a' variant='caption' sx={{ textDecoration: 'none' }}>
                {email}
              </Typography>
            </Link>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'role',
    minWidth: 150,
    headerName: 'Role',
    renderCell: ({ row }) => {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {userRoleObj[row.role]}
          <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.role}
          </Typography>
        </Box>
      )
    }
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: 'email',
    headerName: 'Email',
    renderCell: ({ row }) => {
      return (
        <Typography variant='body2' noWrap>
          {row.email}
        </Typography>
      )
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: 'Phone',
    field: 'phone',
    renderCell: ({ row }) => {
      return (
        <Link href={`tel:${row.phone1}`} passHref>
          <Typography noWrap variant='body2' component='a' sx={{ textTransform: 'capitalize', textDecoration: 'none' }}>
            {row.phone1}
          </Typography>
        </Link>
      )
    }
  },

  {
    flex: 0.1,
    minWidth: 110,
    field: 'position',
    headerName: 'Position',
    renderCell: ({ row }) => {
      return (
        <CustomChip
          skin='light'
          size='small'
          label={row.position}
          color={userPositionObj[row.position]}
          sx={{ textTransform: 'capitalize' }}
        />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'View',
    renderCell: ({ row }) => (
      <Link href={`/view-profile/${row._id}`} passHref>
        <IconButton>
          <EyeOutline />
        </IconButton>
      </Link>
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
  const storageChecked = getLocalStorage('accessToken')

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
    getAllUsers()
  }, [])

  const getAllUsers = async () => {
    const response = await axios({
      method: 'GET',
      url: 'http://localhost:8000/api/users/all',
      headers: {
        Authorization: `Bearer ${storageChecked}`
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
          <TableHeader plan={plan} value={value} handleFilter={handleFilter} handlePlanChange={handlePlanChange} />
          <DataGrid
            autoHeight
            getRowId={() => Math.floor(Math.random() * 100000000)}
            // rows={store.data}
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
