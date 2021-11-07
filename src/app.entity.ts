import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class i18nStringDto {
  @ApiProperty()
  'en-gb': string;

  @ApiProperty()
  'nl-nl': string;
}

class TimeslotDto {
  @ApiProperty()
  startHour: number;

  @ApiProperty()
  finishHour: number;
}

class AvailableTimeslotDto {
  @ApiProperty()
  date: string;

  @ApiProperty({ type: [TimeslotDto] })
  available_timeslots: TimeslotDto[];
}

class ContainerDto {
  @ApiProperty()
  size: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  name: i18nStringDto;

  @ApiProperty()
  description: i18nStringDto;

  @ApiPropertyOptional()
  unit_price_purchase: number;

  @ApiPropertyOptional()
  unit_price_rent: number;

  @ApiPropertyOptional()
  unit_price_placement: number;
}

class ContainerTimeslotDto {
  @ApiProperty({ type: [AvailableTimeslotDto] })
  available_timeslots: [AvailableTimeslotDto];

  @ApiProperty({ type: [ContainerDto] })
  containers: [ContainerDto];
}

class LogisticsProviderDto {
  @ApiProperty()
  name: i18nStringDto;

  @ApiProperty({ type: [ContainerTimeslotDto] })
  container_timeslots: ContainerTimeslotDto[];
}

export class AvailableProductDto {
  @ApiProperty()
  stream_name: i18nStringDto;

  @ApiProperty()
  stream_description: i18nStringDto;

  @ApiProperty()
  size_display: string;

  @ApiProperty({ type: [LogisticsProviderDto] })
  logistics_providers: LogisticsProviderDto[];
}
