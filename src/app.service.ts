import { Injectable } from '@nestjs/common';
import streams from './data/streams.json';
import containers from './data/containers.json';
import { AvailableProduct } from './interfaces';
import { logistics_providers } from './data/logistics_providers';
import { getAvailableTimeslots } from './utilities';

@Injectable()
export class AppService {
  getAvailableProducts(postalCode: string): AvailableProduct[] {
    const parsedPostalCode = parseInt(postalCode, 10); // parses "1234AB" into 1234

    const active_streams = streams.items.filter(({ _active }) => _active);
    const active_containers = containers.items.filter(({ _active }) => _active);
    const available_logistics_providers = logistics_providers.filter((lp) =>
      lp.stream_products.some(
        (sp) =>
          sp.available_postal_codes(parsedPostalCode) &&
          active_streams.some(
            ({ stream_product_id }) =>
              sp.available_stream_products(stream_product_id),
            // logistic providers with active stream_product_ids
          ),
      ),
    );

    return active_streams
      .map(
        ({ stream_product_id, name, description, sizes }) =>
          sizes
            .filter((stream_size) =>
              available_logistics_providers.some((lp) =>
                lp.stream_products.some(
                  (sp) =>
                    sp.available_stream_products(stream_product_id) &&
                    sp.available_container_products(
                      stream_size.container_product_id,
                    ),
                ),
              ),
            )
            .map((stream_size) => ({
              stream_name: name,
              stream_description: description,
              size_display: stream_size.size_display,
              logistics_providers: available_logistics_providers
                .filter((logistics_provider) =>
                  logistics_provider.supports(
                    stream_product_id,
                    stream_size.container_product_id,
                  ),
                )
                .map(({ name, stream_products }) => ({
                  name,
                  container_timeslots: stream_products
                    .filter((stream_product) =>
                      stream_product.supports(
                        stream_product_id,
                        stream_size.container_product_id,
                      ),
                    )
                    .map(({ available_days }) => ({
                      available_timeslots:
                        getAvailableTimeslots(available_days),
                      containers: active_containers
                        .filter(
                          ({ container_product_id }) =>
                            stream_size.container_product_id ==
                            container_product_id,
                        )
                        .map(
                          ({
                            size,
                            type,
                            name,
                            description,
                            unit_price_purchase,
                            unit_price_rent,
                            unit_price_placement,
                          }) => ({
                            size,
                            type,
                            name,
                            description,
                            unit_price_purchase,
                            unit_price_rent,
                            unit_price_placement,
                          }),
                        ),
                    }))
                    .filter(
                      ({ containers, available_timeslots }) =>
                        containers.length > 0 || available_timeslots.length > 0,
                    ),
                  // remove container_timeslots with empty containers or empty timeslots
                }))
                .filter(
                  ({ container_timeslots }) => container_timeslots.length > 0,
                ),
              // remove logistics_providers with empty container_timeslots
            }))
            .filter(
              ({ logistics_providers }) => logistics_providers.length > 0,
            ),
        // remove sizes with empty logistics_providers
      )
      .flat();
    // create separate record for each stream-size combination
  }
}
