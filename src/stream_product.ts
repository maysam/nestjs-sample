export class StreamProduct {
  available_stream_products: (number) => boolean;
  available_container_products: (number) => boolean;
  available_postal_codes: (number) => boolean;
  available_days: number[];

  constructor({
    available_stream_products,
    available_container_products,
    available_postal_codes,
    available_days,
  }: {
    available_stream_products: (number) => boolean;
    available_container_products: (number) => boolean;
    available_postal_codes: (number) => boolean;
    available_days: number[];
  }) {
    this.available_stream_products = available_stream_products;
    this.available_container_products = available_container_products;
    this.available_postal_codes = available_postal_codes;
    this.available_days = available_days;
  }

  supports = (
    stream_product_id: number,
    container_product_id: number,
  ): boolean =>
    this.available_stream_products(stream_product_id) &&
    this.available_container_products(container_product_id);
}
