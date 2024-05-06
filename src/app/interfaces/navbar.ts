export interface NavItem {
  title: string;
  label: string;
  route: string;
  icon?: string;
  logout?: boolean;
  type?: string;
  children?: NavItem[]; // Optional array of NavItem for nested navigation
}

export const navItems = [
  {
    title: 'home',
    icon: '',
    type: 'link',
    route: '/Home',
    label: 'nav.home',
  },
  {
    title: 'services',
    icon: '',
    type: 'sub',
    label: 'nav.services.title',
    route: '/Services',
    children: [
      {
        title: 'services items 1',
        label: 'nav.services.items.offices',
        route: '/Services/Offices',
        icon: '',
        type: 'link',
      },
      {
        title: 'services items 2',
        label: 'nav.services.items.sponsorshipTransfer',
        route: '/Services/SponsorshipTransfer',
        icon: '',
        type: 'link',
      }
    ]
  },
  {
    title: 'about',
    label: 'nav.aboutStructure.title',
    route: '/AboutStructure',
    icon: '',
    type: 'sub',
    children: [
      {
        title: 'about items 1',
        label: 'nav.aboutStructure.items.policies',
        route: '/Services/Policies',
        icon: '',
        type: 'sub',
        children: [
          {
            title: 'about items 1',
            label: 'nav.aboutStructure.items.policies',
            route: '/Services/Policies',
            icon: '',
            type: 'link',
          },
          {
            title: 'about items 2',
            label: 'nav.aboutStructure.items.journey',
            route: '/Services/Journey',
            icon: '',
            type: 'link',
          }
        ]
      }
    ]
  },
  {
    title: 'listing',
    label: 'nav.listing.title',
    route: '/Support',
    icon: '',
    type: 'sub',
    children: [
      {
        title: 'support items 1',
        label: 'nav.support.items.contactUs',
        route: '/Services/ContactUs',
        icon: '',
        type: 'sub',
        children: [
          {
            title: 'test link 1',
            label: 'child 3',
            type: 'sub',
            route: '/theme/slider-filter-search',
            children: [
              {
                title: 'test link 1',
                label: 'child 3',
                route: '/theme/slider-filter-search',
                type: 'link',
              },
              {
                title: 'test link 2',
                label: 'child 3',
                route: '/theme/corporate',
                type: 'link',
              },
              {
                title: 'test link 2',
                label: 'child 3',
                route: '/theme/corporate',
                type: 'link',
              }
            ],
          },
          {
            title: 'test link 2',
            label: 'child 3',
            route: '/theme/corporate',
          }
        ],
      },
      {
        title: 'support items 2',
        label: 'nav.support.items.faqs',
        route: '/Services/FAQs',
        icon: ''
      }
    ]
  },
  {
    title: 'Dashboard',
    label: 'Dashboard',
    route: '/Dashboard',
    icon: '',
    type: 'sub',
    children: [
      {
        title: 'Dashboard V1',
        label: 'DashboardV1',
        route: '/Dashboard',
        icon: '',
        type: "link",

      },
      {
        title: 'Dashboard V2',
        label: 'DashboardV2',
        route: '/Dashboard-V2',
        icon: '',
        type: "link",

      }
    ]
  }
];
