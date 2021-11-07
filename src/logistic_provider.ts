import { StreamProduct } from './stream_product';

export class LogisticProvider {
  name: string;
  stream_products: StreamProduct[];

  constructor(name: string, stream_products: StreamProduct[]) {
    this.name = name;
    this.stream_products = stream_products;
  }

  supports = (
    stream_product_id: number,
    container_product_id: number,
  ): boolean =>
    this.stream_products.some((sp) =>
      sp.supports(stream_product_id, container_product_id),
    );
}
