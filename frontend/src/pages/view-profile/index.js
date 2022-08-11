// ** Third Party Imports
import axios from 'axios'
import { useAuth } from 'src/hooks/useAuth';

// ** Demo Components Imports
import ViewProfilePage from 'src/views/user/view/ViewProfilePage'

const UserView = () => {
  const {user} = useAuth();
  const currentUserId = user?._id

  if (!currentUserId) return null;
  return <ViewProfilePage id={currentUserId} />
}

UserView.acl = {
  action: 'manage',
  subject: 'view-profile-page'
}

export default UserView
