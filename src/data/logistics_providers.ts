import { StreamProduct } from '../stream_product';
import { LogisticProvider } from '../logistic_provider';

export const logistics_providers: LogisticProvider[] = [
  new LogisticProvider('Retransport', [
    new StreamProduct({
      available_stream_products: (stream_product_id) =>
        [2, 3].includes(stream_product_id),
      available_container_products: (container_product_id) =>
        [4, 5, 6, 7].includes(container_product_id),
      available_postal_codes: (code: number) => 1500 <= code && code <= 2000,
      available_days: [1, 2, 4, 5],
    }),
    new StreamProduct({
      available_stream_products: (stream_product_id) =>
        [1, 4, 5, 6].includes(stream_product_id),
      available_container_products: (container_product_id) =>
        [1, 4, 5, 6, 7].includes(container_product_id),
      available_postal_codes: (code: number) => 1000 <= code && code <= 1499,
      available_days: [1, 2, 3, 4],
    }),
  ]),
  new LogisticProvider('GreenCollect', [
    new StreamProduct({
      available_stream_products: (stream_product_id) =>
        [6, 7, 9, 10].includes(stream_product_id),
      available_container_products: (container_product_id) =>
        [1, 2, 3].includes(container_product_id),
      available_postal_codes: (code: number) => 1000 <= code && code <= 1099,
      available_days: [1, 3, 5 + 7 /* every second friday*/],
    }),
  ]),
];
