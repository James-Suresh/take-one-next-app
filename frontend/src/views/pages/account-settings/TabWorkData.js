// ** React Imports
import { useEffect, useState } from 'react'

// ** Third Party Components
import axios from 'axios'

// ** Components Imports
import { getCookies } from 'src/store/actions/cookie-actions'
import TabWork from './TabWork'

const TabWorkData = ({ id }) => {
  // ** State
  const [error, setError] = useState(false)
  const [data, setData] = useState(null)


  useEffect(() => {
    const token = getCookies();

    axios
      // .get('http://localhost:8000/api/user/view/', { params: { id } })
      .get(`http://localhost:8000/api/user/view/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        setData(response.data)
        setError(false)
      })
      .catch(() => {
        setData(null)
        setError(true)
      })
  }, [id])

  if (data) {
    return <TabWork data={data} />
  } else {
    return null
  }
}

export default TabWorkData
