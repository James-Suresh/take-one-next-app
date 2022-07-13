// ** React Imports
import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { DataGrid } from '@mui/x-data-grid'

// ** Third Party Components
import toast from 'react-hot-toast'

// ** Custom Components
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Data Import
import { rows } from 'src/@fake-db/table/static-data'
import { IconButton, Stack, Tooltip } from '@mui/material'
import { DeleteForeverRounded, EditRounded, LightModeRounded } from '@mui/icons-material'
import axios from 'axios'
import moment from 'moment'
import { getLocalStorage, isAuth } from 'src/hooks/helpers'
import { deleteAvailability } from 'src/store/actions/availabilitiesActions'
import { useDispatch } from 'react-redux'

const shiftObj = {
  Day: { title: 'Day Shift', color: 'yeild' },
  Night: { title: 'Night Shift', color: 'primary' }
}

const UserViewTable = ({ viewedUser }) => {
  // ** States
  const [pageSize, setPageSize] = useState(7)
  const [hideNameColumn, setHideNameColumn] = useState(false)
  const [data, setData] = React.useState([])

  // Tokenization for server request
  const storageChecked = getLocalStorage('accessToken')

  // ** Hooks
  // const dispatch = useDispatch()
  const userId = viewedUser._id

  useEffect(() => {
    getAvalabilities()
    // axios.get('http://localhost:8000/api/availabilities/ofuser')
    // axios({
    //   method: 'GET',
    //   url: 'http://localhost:8000/api/availabilities/ofuser',
    //   headers: {
    //     Authorization: `Bearer ${storageChecked}`
    //   }
    // }).then(res => {
    //   // setData(res.data)
    //   console.log(res)
    // })
  }, [])

  const getAvalabilities = async () => {
    const response = await axios({
      method: 'GET',
      url: `http://localhost:8000/api/availabilities/ofuser/${userId}`,
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
    if (response.status === 200) {
      setData(response.data.result)
    }
  }

  // const deleteAvailabilityAsync = id => {
  //   dispatch(deleteAvailability(id))
  //   getAvalabilities()
  // }

  const deleteAvailabilityAsync = async id => {
    const response = await axios({
      method: 'DELETE',
      url: `http://localhost:8000/api/availabilities/${id}`,
      headers: {
        Authorization: `Bearer ${storageChecked}`
      }
    })
    if (response.status === 200) {
      toast.success('Shift availability deleted!')
    }
    getAvalabilities()
  }

  const columns = [
    {
      flex: 0.25,
      minWidth: 290,
      field: 'full_name',
      headerName: 'Name',
      hide: hideNameColumn,
      renderCell: params => {
        const { firstName, lastName, email, photoURL } = viewedUser

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar src={photoURL} sx={{ mr: 3, width: 34, height: 34 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography noWrap variant='body2' sx={{ color: 'text.primary', fontWeight: 600 }}>
                {`${firstName} ${lastName}`}
              </Typography>
              <Typography noWrap variant='caption'>
                {email}
              </Typography>
            </Box>
          </Box>
        )
      }
    },
    {
      flex: 0.175,
      minWidth: 120,
      headerName: 'Date',
      field: 'start_date',
      renderCell: params => {
        const formattedDate = moment(params.row.availabilityDate).format('LL')

        return (
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {formattedDate}
          </Typography>
        )
      }
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'shift',
      headerName: 'Shift',
      renderCell: params => {
        const shift = shiftObj[params.row.shift]

        return (
          <CustomChip
            size='small'
            skin='light'
            color={shift.color}
            label={shift.title}
            sx={{ '& .MuiChip-label': { textTransform: 'capitalize' } }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'actions',
      headerName: 'Actions',
      renderCell: params => {
        return (
          <Stack direction='row' spacing={1}>
            <Tooltip arrow title='Permanently Delete'>
              <IconButton size='small' onClick={() => deleteAvailabilityAsync(params.row._id)}>
                <DeleteForeverRounded />
              </IconButton>
            </Tooltip>
            {/* <Button size='small' variant='outlined' color='secondary' onClick={() => getFullName(params)}>
              Get Name
            </Button> */}
          </Stack>
        )
      }
    }
  ]

  return (
    <Card>
      <CardHeader
        title='Users Availability'
        action={
          <Box>
            <Button size='small' variant='contained' onClick={() => setHideNameColumn(!hideNameColumn)}>
              Toggle Name Column
            </Button>
          </Box>
        }
      />
      <DataGrid
        getRowId={() => Math.floor(Math.random() * 100000000)}
        autoHeight
        rows={data}
        columns={columns}
        pageSize={pageSize}
        disableSelectionOnClick
        rowsPerPageOptions={[7, 10, 25, 50]}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
      />
    </Card>
  )
}

export default UserViewTable
