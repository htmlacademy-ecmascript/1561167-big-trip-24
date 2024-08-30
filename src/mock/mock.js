import { shuffle } from '../utils';

const mockPoints = [
  [
    {
      id: 'ad1679ff-3880-443a-bc76-a5abe7bd0ee0',
      basePrice: 1546,
      dateFrom: '2024-08-21T18:41:09.384Z',
      dateTo: '2024-08-23T03:01:09.384Z',
      destination: 'f9d2304b-588b-43a2-9b45-e42ed44c2bf1',
      isFavorite: true,
      offers: [],
      type: 'bus',
    },
    {
      id: '1633a3ec-2dc9-4d78-8f82-461649058efa',
      basePrice: 2854,
      dateFrom: '2024-08-23T16:37:09.384Z',
      dateTo: '2024-08-24T23:04:09.384Z',
      destination: '947cac80-d0c9-4252-bf0d-298ca436a278',
      isFavorite: false,
      offers: [
        'a1cbe23d-1c7e-447e-a5f3-3d356046c684',
        '035e66ff-53bd-452c-bb43-ae5d0b4b776a',
        '46265456-15e3-4851-80a9-ad5ba9b5c0bb',
      ],
      type: 'bus',
    },
    {
      id: '5a7c1c9e-0a7b-4e63-a01e-869804d9ad9e',
      basePrice: 5974,
      dateFrom: '2024-08-25T07:03:09.384Z',
      dateTo: '2024-08-26T21:15:09.384Z',
      destination: 'ddc60b79-2ec6-4f04-ba0a-b3fa47351cb1',
      isFavorite: false,
      offers: [
        '49214b5b-deea-42c6-b67b-7303a96b8564',
        '9421347a-f1f5-4749-bf9a-d4e2e4d8c102',
      ],
      type: 'train',
    },
    {
      id: '7b0caf37-eca4-4dad-a0c5-7bb5ed2f71f6',
      basePrice: 3787,
      dateFrom: '2024-08-28T03:13:09.384Z',
      dateTo: '2024-08-28T21:15:09.384Z',
      destination: '73e0145f-cec1-4179-8169-bebc1003fd98',
      isFavorite: false,
      offers: ['03ef7df0-0389-4857-a3ed-457a0c24bd14'],
      type: 'restaurant',
    },
    {
      id: '034b0b40-7721-43ce-bfab-5dece717ec46',
      basePrice: 9316,
      dateFrom: '2024-08-30T18:51:09.384Z',
      dateTo: '2024-08-31T15:48:09.384Z',
      destination: '947cac80-d0c9-4252-bf0d-298ca436a278',
      isFavorite: true,
      offers: [
        'a81a940b-cbae-4962-827e-bbd6a5316fb2',
        'a991e640-e323-409a-b99c-967d5714fcf3',
      ],
      type: 'ship',
    },
    {
      id: '81fe21bd-9ce1-4876-b900-be24b8bb5780',
      basePrice: 7479,
      dateFrom: '2024-09-01T11:46:09.384Z',
      dateTo: '2024-09-02T02:28:09.384Z',
      destination: 'fa2bb19a-9ddc-4fa6-aaf3-60596302a3b6',
      isFavorite: false,
      offers: [
        '0645af37-3829-4213-be0c-bb4c986e6cf0',
        '03ef7df0-0389-4857-a3ed-457a0c24bd14',
      ],
      type: 'restaurant',
    },
    {
      id: 'f089d533-18a1-4523-a865-b98e7f9a2b94',
      basePrice: 5910,
      dateFrom: '2024-09-02T14:11:09.384Z',
      dateTo: '2024-09-03T07:16:09.384Z',
      destination: 'fa8177a6-22b7-48a7-a7aa-0dc31998d3f8',
      isFavorite: true,
      offers: ['46265456-15e3-4851-80a9-ad5ba9b5c0bb'],
      type: 'bus',
    },
    {
      id: '2c14edda-ba01-4ac4-92f8-1b55526d6c04',
      basePrice: 438,
      dateFrom: '2024-09-04T18:55:09.384Z',
      dateTo: '2024-09-06T08:00:09.384Z',
      destination: 'cf93e9d2-0e9b-4a05-b87b-6fae404c954b',
      isFavorite: false,
      offers: ['a991e640-e323-409a-b99c-967d5714fcf3'],
      type: 'ship',
    },
    {
      id: '86e01bdb-5105-4683-9595-545628d37e93',
      basePrice: 4169,
      dateFrom: '2024-09-08T05:40:09.384Z',
      dateTo: '2024-09-09T09:32:09.384Z',
      destination: 'f9d2304b-588b-43a2-9b45-e42ed44c2bf1',
      isFavorite: false,
      offers: [],
      type: 'ship',
    },
    {
      id: '8d40fbe0-b3ef-437a-8f7a-b3102cd9a173',
      basePrice: 7919,
      dateFrom: '2024-09-10T00:29:09.384Z',
      dateTo: '2024-09-10T09:43:09.384Z',
      destination: 'fa2bb19a-9ddc-4fa6-aaf3-60596302a3b6',
      isFavorite: false,
      offers: [],
      type: 'drive',
    },
    {
      id: '1ea6dde5-b6d5-4013-9be4-2bdcf6584020',
      basePrice: 2981,
      dateFrom: '2024-09-11T12:12:09.384Z',
      dateTo: '2024-09-12T04:06:09.384Z',
      destination: '60527424-d701-4b02-9b53-39fb841693d7',
      isFavorite: true,
      offers: ['ee44b83d-d3d4-433a-8741-bc2a45d3cdaf'],
      type: 'drive',
    },
    {
      id: '1dbde700-940d-46a8-a3b6-42c0d52b61af',
      basePrice: 1787,
      dateFrom: '2024-09-13T04:21:09.384Z',
      dateTo: '2024-09-14T08:16:09.384Z',
      destination: '19a09a13-2172-46a3-b81a-0b1c8d065290',
      isFavorite: true,
      offers: [],
      type: 'sightseeing',
    },
    {
      id: '235648fe-4f7f-41fd-b5d3-e941d6681a14',
      basePrice: 120,
      dateFrom: '2024-09-14T19:47:09.384Z',
      dateTo: '2024-09-16T14:05:09.384Z',
      destination: '73e0145f-cec1-4179-8169-bebc1003fd98',
      isFavorite: false,
      offers: [
        '8abb8c28-783d-4b95-aa53-2e28f622f224',
        'ee44b83d-d3d4-433a-8741-bc2a45d3cdaf',
      ],
      type: 'drive',
    },
    {
      id: '44467522-241d-4d49-8e08-75c343ab1c7c',
      basePrice: 5562,
      dateFrom: '2024-09-18T09:30:09.384Z',
      dateTo: '2024-09-19T22:37:09.384Z',
      destination: '8be49a3d-5272-41a0-bc99-ac50a81d80d7',
      isFavorite: true,
      offers: [],
      type: 'restaurant',
    },
    {
      id: '22f8054f-67c9-4fd2-a788-2621a16652c9',
      basePrice: 1060,
      dateFrom: '2024-09-21T11:23:09.384Z',
      dateTo: '2024-09-22T19:50:09.384Z',
      destination: 'f9d2304b-588b-43a2-9b45-e42ed44c2bf1',
      isFavorite: true,
      offers: [],
      type: 'restaurant',
    },
    {
      id: 'f55dbb09-b2f9-4349-b887-ac868665941f',
      basePrice: 1800,
      dateFrom: '2024-09-24T06:58:09.384Z',
      dateTo: '2024-09-25T19:56:09.384Z',
      destination: '73e0145f-cec1-4179-8169-bebc1003fd98',
      isFavorite: false,
      offers: [],
      type: 'sightseeing',
    },
    {
      id: 'eb637047-3e94-470b-8ff0-b8a6d4780931',
      basePrice: 7404,
      dateFrom: '2024-09-26T03:37:09.384Z',
      dateTo: '2024-09-27T21:16:09.384Z',
      destination: '19a09a13-2172-46a3-b81a-0b1c8d065290',
      isFavorite: false,
      offers: [
        '600d48db-89cc-4f33-a8b1-a05f8d311404',
        'a81a940b-cbae-4962-827e-bbd6a5316fb2',
        'a991e640-e323-409a-b99c-967d5714fcf3',
      ],
      type: 'ship',
    },
    {
      id: 'e20e94d8-297a-4a06-8116-2501c50bb65b',
      basePrice: 8348,
      dateFrom: '2024-09-28T08:46:09.384Z',
      dateTo: '2024-09-28T19:52:09.384Z',
      destination: '19a09a13-2172-46a3-b81a-0b1c8d065290',
      isFavorite: true,
      offers: [],
      type: 'sightseeing',
    },
    {
      id: 'ae78b96d-1189-4d47-91b0-55cff70aaa38',
      basePrice: 2475,
      dateFrom: '2024-09-30T09:01:09.384Z',
      dateTo: '2024-10-02T03:15:09.384Z',
      destination: 'f9d2304b-588b-43a2-9b45-e42ed44c2bf1',
      isFavorite: false,
      offers: [],
      type: 'restaurant',
    },
    {
      id: '93318513-0bed-4202-bbc7-ff14e58658df',
      basePrice: 8108,
      dateFrom: '2024-10-03T07:23:09.384Z',
      dateTo: '2024-10-05T08:11:09.384Z',
      destination: 'fa2bb19a-9ddc-4fa6-aaf3-60596302a3b6',
      isFavorite: false,
      offers: [
        '9e120040-c0b4-4718-9ef6-a1c952ea8640',
        '34bb41bc-637e-4593-aa93-d50f4b525e64',
        '448cd6c9-841b-446e-a865-7a78837be1f1',
        'c130a2c0-9647-4393-8e66-a2ea91390165',
        'e88e2664-4589-44f7-99d2-0f1cd5a937fe',
        'aa068f85-4c05-49f5-babb-06987bca1235',
      ],
      type: 'flight',
    },
    {
      id: '7295ec8f-6b75-47c6-a39d-d1b8ecb1aa41',
      basePrice: 849,
      dateFrom: '2024-10-07T05:44:09.384Z',
      dateTo: '2024-10-08T18:17:09.384Z',
      destination: '8be49a3d-5272-41a0-bc99-ac50a81d80d7',
      isFavorite: false,
      offers: ['46265456-15e3-4851-80a9-ad5ba9b5c0bb'],
      type: 'bus',
    },
    {
      id: 'f9eb92e2-c660-412e-9591-290f14b6f0c2',
      basePrice: 3790,
      dateFrom: '2024-10-10T07:20:09.384Z',
      dateTo: '2024-10-11T14:36:09.384Z',
      destination: '947cac80-d0c9-4252-bf0d-298ca436a278',
      isFavorite: true,
      offers: ['5f8a21fb-751c-4c38-a66f-b7c045ed9e4e'],
      type: 'taxi',
    },
    {
      id: '25139583-3e2f-4378-b17e-211186da35b4',
      basePrice: 6413,
      dateFrom: '2024-10-13T05:22:09.384Z',
      dateTo: '2024-10-13T19:33:09.384Z',
      destination: 'fa8177a6-22b7-48a7-a7aa-0dc31998d3f8',
      isFavorite: true,
      offers: [
        'd7f78ba2-9565-4216-bb1e-9f53dfda3685',
        '9bfa2f92-7728-44bc-b7b5-41dd7b442d18',
        'e2f9806d-db6e-4a00-a406-05b8e15ea09d',
        'c8fe4bca-7cb8-44bc-9d03-06dfb9d7c2b8',
        'd4b31c8b-55bf-4e9d-85a1-5414e23bfc08',
      ],
      type: 'check-in',
    },
    {
      id: 'b2c87eae-9dd9-4d0d-9298-0cf97ece4c3c',
      basePrice: 9856,
      dateFrom: '2024-10-14T14:55:09.384Z',
      dateTo: '2024-10-14T22:06:09.384Z',
      destination: 'fa8177a6-22b7-48a7-a7aa-0dc31998d3f8',
      isFavorite: true,
      offers: [],
      type: 'train',
    },
    {
      id: 'd715492f-bd60-42d0-957d-e4c52e30d55d',
      basePrice: 3776,
      dateFrom: '2024-10-16T15:40:09.384Z',
      dateTo: '2024-10-18T04:46:09.384Z',
      destination: '947cac80-d0c9-4252-bf0d-298ca436a278',
      isFavorite: false,
      offers: [],
      type: 'sightseeing',
    },
  ],
];

const mockDestinations = [
  [
    {
      id: '73e0145f-cec1-4179-8169-bebc1003fd98',
      description: 'Saint Petersburg - a perfect place to stay with a family',
      name: 'Saint Petersburg',
      pictures: [
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/7.jpg',
          description: 'Saint Petersburg with a beautiful old town',
        },
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/7.jpg',
          description: 'Saint Petersburg a true asian pearl',
        },
      ],
    },
    {
      id: '60527424-d701-4b02-9b53-39fb841693d7',
      description: 'Oslo - is a beautiful city',
      name: 'Oslo',
      pictures: [
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/11.jpg',
          description: 'Oslo for those who value comfort and coziness',
        },
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/1.jpg',
          description: 'Oslo a perfect place to stay with a family',
        },
      ],
    },
    {
      id: 'cf93e9d2-0e9b-4a05-b87b-6fae404c954b',
      description:
        'Helsinki - with an embankment of a mighty river as a centre of attraction',
      name: 'Helsinki',
      pictures: [
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/7.jpg',
          description:
            'Helsinki with an embankment of a mighty river as a centre of attraction',
        },
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/17.jpg',
          description: 'Helsinki a true asian pearl',
        },
      ],
    },
    {
      id: 'fa2bb19a-9ddc-4fa6-aaf3-60596302a3b6',
      description: 'Berlin - a perfect place to stay with a family',
      name: 'Berlin',
      pictures: [
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/9.jpg',
          description: 'Berlin for those who value comfort and coziness',
        },
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/10.jpg',
          description:
            'Berlin full of of cozy canteens where you can try the best coffee in the Middle East',
        },
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/12.jpg',
          description:
            'Berlin full of of cozy canteens where you can try the best coffee in the Middle East',
        },
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/2.jpg',
          description: 'Berlin middle-eastern paradise',
        },
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/3.jpg',
          description:
            'Berlin full of of cozy canteens where you can try the best coffee in the Middle East',
        },
      ],
    },
    {
      id: '8be49a3d-5272-41a0-bc99-ac50a81d80d7',
      description:
        'Nagasaki - with an embankment of a mighty river as a centre of attraction',
      name: 'Nagasaki',
      pictures: [
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/20.jpg',
          description:
            'Nagasaki full of of cozy canteens where you can try the best coffee in the Middle East',
        },
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/15.jpg',
          description:
            'Nagasaki with an embankment of a mighty river as a centre of attraction',
        },
      ],
    },
    {
      id: 'f9d2304b-588b-43a2-9b45-e42ed44c2bf1',
      description: 'Kopenhagen - is a beautiful city',
      name: 'Kopenhagen',
      pictures: [
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/6.jpg',
          description: 'Kopenhagen a true asian pearl',
        },
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/14.jpg',
          description:
            'Kopenhagen with an embankment of a mighty river as a centre of attraction',
        },
      ],
    },
    {
      id: 'fa8177a6-22b7-48a7-a7aa-0dc31998d3f8',
      description: 'Rome - for those who value comfort and coziness',
      name: 'Rome',
      pictures: [],
    },
    {
      id: 'ddc60b79-2ec6-4f04-ba0a-b3fa47351cb1',
      description: 'Amsterdam - for those who value comfort and coziness',
      name: 'Amsterdam',
      pictures: [
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/3.jpg',
          description: 'Amsterdam for those who value comfort and coziness',
        },
      ],
    },
    {
      id: '947cac80-d0c9-4252-bf0d-298ca436a278',
      description: 'Hiroshima - in a middle of Europe',
      name: 'Hiroshima',
      pictures: [],
    },
    {
      id: '19a09a13-2172-46a3-b81a-0b1c8d065290',
      description: 'Frankfurt - for those who value comfort and coziness',
      name: 'Frankfurt',
      pictures: [
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/1.jpg',
          description: 'Frankfurt middle-eastern paradise',
        },
        {
          src: 'https://24.objects.htmlacademy.pro/static/destinations/19.jpg',
          description:
            'Frankfurt famous for its crowded street markets with the best street food in Asia',
        },
      ],
    },
  ],
];

const mockOffers = [
  [
    {
      type: 'taxi',
      offers: [
        {
          id: 'eb588953-6110-4aaf-8e5c-fdb4ea8098dd',
          title: 'Upgrade to a business class',
          price: 156,
        },
        {
          id: '1bf8ad69-f8bb-4f99-bc55-3501e9b765cb',
          title: 'Choose the radio station',
          price: 125,
        },
        {
          id: '045cce87-f606-4fcc-bfbf-ec6ffaaac206',
          title: 'Choose temperature',
          price: 88,
        },
        {
          id: '8e214aa4-696e-4599-ac8c-a50b4b3d3202',
          title: 'Drive quickly, Im in a hurry',
          price: 150,
        },
        {
          id: '5f8a21fb-751c-4c38-a66f-b7c045ed9e4e',
          title: 'Drive slowly',
          price: 180,
        },
      ],
    },
    {
      type: 'bus',
      offers: [
        {
          id: 'a1cbe23d-1c7e-447e-a5f3-3d356046c684',
          title: 'Infotainment system',
          price: 89,
        },
        {
          id: '035e66ff-53bd-452c-bb43-ae5d0b4b776a',
          title: 'Order meal',
          price: 146,
        },
        {
          id: '46265456-15e3-4851-80a9-ad5ba9b5c0bb',
          title: 'Choose seats',
          price: 48,
        },
      ],
    },
    {
      type: 'train',
      offers: [
        {
          id: 'b3119221-c27d-4639-bb1a-2c876a03f299',
          title: 'Book a taxi at the arrival point',
          price: 112,
        },
        {
          id: '49214b5b-deea-42c6-b67b-7303a96b8564',
          title: 'Order a breakfast',
          price: 117,
        },
        {
          id: '9421347a-f1f5-4749-bf9a-d4e2e4d8c102',
          title: 'Wake up at a certain time',
          price: 172,
        },
      ],
    },
    {
      type: 'flight',
      offers: [
        {
          id: '9e120040-c0b4-4718-9ef6-a1c952ea8640',
          title: 'Choose meal',
          price: 65,
        },
        {
          id: '34bb41bc-637e-4593-aa93-d50f4b525e64',
          title: 'Choose seats',
          price: 166,
        },
        {
          id: '448cd6c9-841b-446e-a865-7a78837be1f1',
          title: 'Upgrade to comfort class',
          price: 150,
        },
        {
          id: 'c130a2c0-9647-4393-8e66-a2ea91390165',
          title: 'Upgrade to business class',
          price: 171,
        },
        {
          id: 'e88e2664-4589-44f7-99d2-0f1cd5a937fe',
          title: 'Add luggage',
          price: 173,
        },
        {
          id: 'aa068f85-4c05-49f5-babb-06987bca1235',
          title: 'Business lounge',
          price: 30,
        },
      ],
    },
    {
      type: 'check-in',
      offers: [
        {
          id: 'd7f78ba2-9565-4216-bb1e-9f53dfda3685',
          title: 'Choose the time of check-in',
          price: 176,
        },
        {
          id: '9bfa2f92-7728-44bc-b7b5-41dd7b442d18',
          title: 'Choose the time of check-out',
          price: 57,
        },
        {
          id: 'e2f9806d-db6e-4a00-a406-05b8e15ea09d',
          title: 'Add breakfast',
          price: 120,
        },
        {
          id: 'c8fe4bca-7cb8-44bc-9d03-06dfb9d7c2b8',
          title: 'Laundry',
          price: 61,
        },
        {
          id: 'd4b31c8b-55bf-4e9d-85a1-5414e23bfc08',
          title: 'Order a meal from the restaurant',
          price: 94,
        },
      ],
    },
    {
      type: 'sightseeing',
      offers: [],
    },
    {
      type: 'ship',
      offers: [
        {
          id: '2b360cb2-a860-415a-88dc-6fd494957dc0',
          title: 'Choose meal',
          price: 136,
        },
        {
          id: 'e188963a-0df9-4a2a-a2c5-585fbdff26d9',
          title: 'Choose seats',
          price: 155,
        },
        {
          id: 'ebe80e13-34a3-41a3-95e7-2ce65f6969f1',
          title: 'Upgrade to comfort class',
          price: 138,
        },
        {
          id: '600d48db-89cc-4f33-a8b1-a05f8d311404',
          title: 'Upgrade to business class',
          price: 71,
        },
        {
          id: 'a81a940b-cbae-4962-827e-bbd6a5316fb2',
          title: 'Add luggage',
          price: 90,
        },
        {
          id: 'a991e640-e323-409a-b99c-967d5714fcf3',
          title: 'Business lounge',
          price: 155,
        },
      ],
    },
    {
      type: 'drive',
      offers: [
        {
          id: '8abb8c28-783d-4b95-aa53-2e28f622f224',
          title: 'With automatic transmission',
          price: 104,
        },
        {
          id: 'ee44b83d-d3d4-433a-8741-bc2a45d3cdaf',
          title: 'With air conditioning',
          price: 98,
        },
      ],
    },
    {
      type: 'restaurant',
      offers: [
        {
          id: '0645af37-3829-4213-be0c-bb4c986e6cf0',
          title: 'Choose live music',
          price: 182,
        },
        {
          id: '03ef7df0-0389-4857-a3ed-457a0c24bd14',
          title: 'Choose VIP area',
          price: 162,
        },
      ],
    },
  ],
];

const loadPoints = (isMixUp = false) => {
  if (!isMixUp) {
    return mockPoints;
  }

  return shuffle(mockPoints);
};
const loadDestinations = () => mockDestinations;
const loadOffers = () => mockOffers;

export { loadPoints, loadDestinations, loadOffers };
