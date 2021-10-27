import { Injectable } from '@nestjs/common';
import streams from './streams.json';
import containers from './containers.json';
import { AvailableProduct } from './interfaces';
import LogisticProviders from './logistics_providers';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAvailableProducts(postalCode: string): AvailableProduct[] {
    const active_streams = streams.items.filter(({ _active }) => _active);
    const active_containers = containers.items.filter(({ _active }) => _active);
    const lps = LogisticProviders.filter((lp) =>
      lp.stream_products.some(
        (sp) =>
          sp.postal_code_rule(parseInt(postalCode)) &&
          active_streams.some(({ stream_product_id }) =>
            sp.stream_product_ids.includes(stream_product_id),
          ),
      ),
    );
    return active_streams
      .map(({ stream_product_id, name, description, sizes }) =>
        sizes
          .filter((stream_size) =>
            lps.some((lp) =>
              lp.stream_products.some(
                (sp) =>
                  sp.stream_product_ids.includes(stream_product_id) &&
                  sp.container_product_ids.includes(
                    stream_size.container_product_id,
                  ),
              ),
            ),
          )
          .map((stream_size) => ({
            stream_name: name,
            stream_description: description,
            size_display: stream_size.size_display,
            logistics_providers: lps
              .filter((lp) =>
                lp.stream_products.some(
                  (sp) =>
                    sp.stream_product_ids.includes(stream_product_id) &&
                    sp.container_product_ids.includes(
                      stream_size.container_product_id,
                    ),
                ),
              )
              .map((lp) => ({
                name: lp.name,
                container_timeslots: lp.stream_products
                  .filter(
                    (sp) =>
                      sp.stream_product_ids.includes(stream_product_id) &&
                      sp.container_product_ids.includes(
                        stream_size.container_product_id,
                      ),
                  )
                  .map((sp) => ({
                    available_timeslots: sp.available_timeslots,
                    containers: active_containers
                      .filter(
                        ({ container_product_id }) =>
                          sp.container_product_ids.includes(
                            container_product_id,
                          ) &&
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
                  .filter(({ containers }) => containers.length > 0),
              }))
              .filter(
                ({ container_timeslots }) => container_timeslots.length > 0,
              ),
          }))
          .filter(({ logistics_providers }) => logistics_providers.length > 0),
      )
      .flat();
  }
}
