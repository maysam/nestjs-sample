import { LogisticProvider } from '../interfaces';

export const logistics_providers: LogisticProvider[] = [
  {
    name: 'Retransport',
    stream_products: [
      {
        stream_product_ids: [2, 3],
        container_product_ids: [4, 5, 6, 7],
        postal_code_rule: (code: number) => 1500 <= code && code <= 2000,
        available_days: [1, 2, 4, 5],
      },
      {
        stream_product_ids: [1, 4, 5, 6],
        container_product_ids: [1, 4, 5, 6, 7],
        postal_code_rule: (code: number) => 1000 <= code && code <= 1499,
        available_days: [1, 2, 3, 4],
      },
    ],
  },
  {
    name: 'GreenCollect',
    stream_products: [
      {
        stream_product_ids: [6, 7, 9, 10],
        container_product_ids: [1, 2, 3],
        postal_code_rule: (code: number) => 1000 <= code && code <= 1099,
        available_days: [1, 3, 5 + 7 /* every second friday*/],
      },
    ],
  },
];
