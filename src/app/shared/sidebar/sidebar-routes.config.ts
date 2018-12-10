import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

    {
        path: '/dashboard/home', title: 'Latest Deals', icon: 'icon-screen-desktop', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
        path: '/dashboard/deals', title: 'Deals', icon: 'icon-grid', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    },
    {
      path: '/dashboard/invites', title: 'Campaigns', icon: 'icon-grid', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
    // , {
    //     path: '/dashboard/add-deal', title: 'Add Deal', icon: 'icon-magnet ', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
    // },
    {
      path: '/dashboard/users', title: 'Users', icon: 'icon-user', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
  },
  {
    path: '/dashboard/categories', title: 'Categories', icon: 'icon-book-open', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: []
},

    // { path: 'http://pixinvent.com/demo/convex-angular-bootstrap-admin-dashboard-template/documentation', title: 'Documentation', icon: 'icon-book-open', class: '', badge: '', badgeClass: '', isExternalLink: true, submenu: [] }

];
