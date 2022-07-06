// ** Third Party Imports
import axios from 'axios'
import { useRouter } from 'next/router'

// ** Demo Components Imports
import ViewProfilePage from 'src/views/user/view/ViewProfilePage'

const UserView = () => {
  const router = useRouter()
  const id = router.query.id

  return <ViewProfilePage id={id} />
}

// export const getStaticPaths = async () => {

//   const res = await axios.get('/apps/users/list')

//   const userData = await res.data.allData

//   const paths = userData.map(item => ({
//     params: { id: `${item.id}` }
//   }))

//   return {
//     paths,
//     fallback: false
//   }
// }

// export const getStaticProps = async ({ params }) => {
//   const res = await axios.get('/apps/invoice/invoices')
//   const invoiceData = res.data.allData

//   return {
//     props: {
//       invoiceData,
//       id: params?.id
//     }
//   }
// }

export default UserView
