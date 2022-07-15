// ** Icon imports
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import EmailRoundedIcon from '@mui/icons-material/EmailRounded'
import GppGoodRoundedIcon from '@mui/icons-material/GppGoodRounded'
import TodayRoundedIcon from '@mui/icons-material/TodayRounded'
import IosShareRoundedIcon from '@mui/icons-material/IosShareRounded'
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import TopicRoundedIcon from '@mui/icons-material/TopicRounded'
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded'

const navigation = () => {
  return [
    // {
    //   title: 'Home',
    //   icon: HomeRoundedIcon,
    //   path: '/home'
    // },
    {
      title: 'Dispatch',
      icon: IosShareRoundedIcon,
      path: '/dispatch',
      action: 'manage',
      subject: 'dispatch-page'
    },
    {
      title: 'Scheduler',
      icon: TodayRoundedIcon,
      path: '/scheduler',
      action: 'manage',
      subject: 'scheduler-page'
    },
    {
      title: 'User Profile',
      icon: AccountCircleRoundedIcon,
      path: '/user-profile',
      action: 'manage',
      subject: 'user-profile'
    },
    // {
    //   title: 'Admin Profile',
    //   icon: AccountBoxRoundedIcon,
    //   path: '/admin-profile'
    // },
    {
      title: 'View Profile',
      icon: AccountBoxRoundedIcon,
      path: '/view-profile',
      action: 'manage',
      subject: 'view-profile-page'
    },
    {
      title: 'Deal Memo',
      icon: TopicRoundedIcon,
      path: '/deal-memo',
      action: 'read',
      subject: 'dealmemo-page'
    },
    {
      title: 'Access Control',
      icon: GppGoodRoundedIcon,
      path: '/acl',
      action: 'manage',
      subject: 'acl-page'
    },
    {
      title: 'Settings',
      icon: SettingsRoundedIcon,
      path: '/account-settings',
      action: 'manage',
      subject: 'settings-page'
    }
  ]
}

export default navigation
