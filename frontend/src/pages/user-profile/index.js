// ** Third Party Imports
import axios from 'axios'

// ** Demo Components Imports
import UserViewPage from 'src/views/user/view/UserViewPage'

const UserProfile = ({ invoiceData }) => {
  return <UserViewPage id='1' invoiceData={invoiceData} />
}

export const getStaticProps = async () => {
  const res = await axios.get('/apps/invoice/invoices')
  const invoiceData = res.data.allData

  return {
    props: {
      invoiceData
    }
  }
}
UserProfile.acl = {
  action: 'read',
  subject: 'scheduler-page'
}

export default UserProfile
