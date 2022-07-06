// ** Third Party Imports
import axios from 'axios'
import { isAuth } from 'src/hooks/helpers'

// ** Demo Components Imports
import ViewProfilePage from 'src/views/user/view/ViewProfilePage'

const UserView = () => {
  const currentUserId = isAuth()._id

  return <ViewProfilePage id={currentUserId} />
}

UserView.acl = {
  action: 'read',
  subject: 'scheduler-page'
}

export default UserView
