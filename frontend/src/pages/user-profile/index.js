// ** Import hooks
import { useAuth } from 'src/hooks/useAuth';

// ** Demo Components Imports
import UserViewPage from 'src/views/user/view/UserViewPage';

const UserView = () => {
  const { user } = useAuth();
  const currentUserId = user?._id

  if (!currentUserId) return null;
  return <UserViewPage id={currentUserId} />
}

UserView.acl = {
  action: 'manage',
  subject: 'scheduler-page'
}

export default UserView
