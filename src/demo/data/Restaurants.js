import * as _ from 'lodash'

import image1 from '../style/images/resto-1.jpg'
import image2 from '../style/images/resto-2.jpg'
import image3 from '../style/images/resto-3.jpg'

const MENUS = [
    {
        id: 'dsf4654sfc',
        name: 'Menu 1',
        price: 7
    },
    {
        id: 'z1s84xvc',
        name: 'Menu 2',
        price: 10.5
    },
    {
        id: 'ttgh484q',
        name: 'Menu 3',
        price: 4
    },
    {
        id: '1terert1',
        name: 'Menu 4',
        price: 9
    },
    {
        id: 'azeqsd4',
        name: 'Menu 5',
        price: 1
    },
    {
        id: 'zze84saqfgc',
        name: 'Menu 6',
        price: 8
    }
]

const MENU_BY_IDS = _.keyBy(MENUS, ({id}) => id)

const RESTAURANTS = [
    {
        id: 'adhh45rt',
        image: image1,
        name: 'Wokbar',
        type: 'Thai food',
        rate: 4,
        menus: MENUS,
        menuByIds: MENU_BY_IDS
    },
    {
        id: 'qqx14d88d',
        image: image2,
        name: 'Los Pollos Hermanos',
        type: 'Mexican food',
        rate: 5,
        menus: MENUS,
        menuByIds: MENU_BY_IDS
    },
    {
        id: 'pparrd8r4g',
        image: image3,
        name: 'PastaFiesta',
        type: 'Italian food',
        rate: 3,
        menus: MENUS,
        menuByIds: MENU_BY_IDS
    }
]

export const RESTAURANT_BY_IDS = _.keyBy(RESTAURANTS, ({id}) => id)
export default RESTAURANTS
