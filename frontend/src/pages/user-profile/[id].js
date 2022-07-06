// ** Third Party Imports
import axios from 'axios'

// ** NEXT JS
import { useRouter } from 'next/router'

// ** Demo Components Imports
import UserViewPage from 'src/views/user/view/UserViewPage'

const UserProfile = ({ id, invoiceData }) => {
  return <UserViewPage id={id} invoiceData={invoiceData} />
}

export const getStaticPaths = async () => {
  const res = await axios.get('/apps/users/list')
  const userDate = await res.data.allData

  const paths = userDate.map(item => ({
    params: { id: `${item.id}` }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params }) => {
  const res = await axios.get('/apps/invoice/invoices')
  const invoiceData = res.data.allData

  return {
    props: {
      invoiceData,
      id: params?.id
    }
  }
}

export default UserProfile
