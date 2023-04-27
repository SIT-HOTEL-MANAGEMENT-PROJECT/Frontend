// ==========================================     Archived File    ==========================================

const menus = [
  {
    id: 'A',
    collapse:'One',
    itemName: ' Salads and Raita',
    children: [
      {
        id: 'A1',
        childName: 'Russian Salad(Veg)',
        price: 150,
      },
      {
        id: 'A2',
        childName: 'Russian Salad(Non-Veg)',
        price: 170,
      },
    ],
  },

  {
    id: 'B',
    collapse:'Two',
    itemName: 'Veg Starter',
    children: [
      {
        id: 'B1',
        childName: 'Veg pakora',
        price: 150,
      },
      {
        id: 'B2',
        childName: 'Onion Pakora',
        price: 150,
      },
    ],
  },

  {
    id: 'C',
    collapse:'Three',
    itemName: 'Non-Veg-Starter',
    children: [
      {
        id: 'C1',
        childName: 'Chicken pakora',
        price: 150,
      },
      {
        id: 'C2',
        childName: 'Murg Lasuni Tikka',
        price: 150,
      },
    ],
  },

  {
    id: 'D',
    collapse:'Four',
    itemName: 'Soup-Bowl',
    children: [
      {
        id: 'D1',
        childName: 'Choice Of Cream Soup',
        price: 140,
      },
      {
        id: 'D2',
        childName: 'Lemon Coriender Soup(Veg)',
        price: 140,
      },
    ],
  },
];

export default menus;