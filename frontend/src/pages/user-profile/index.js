// ** Import hooks
import { isAuth } from 'src/hooks/helpers'

// ** Demo Components Imports
import UserViewPage from 'src/views/user/view/UserViewPage'

const UserView = () => {
  const currentUserId = isAuth()._id

  return <UserViewPage id={currentUserId} />
}

UserView.acl = {
  action: 'read',
  subject: 'scheduler-page'
}

export default UserView
