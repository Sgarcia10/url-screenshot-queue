import { Body, Controller, Inject, Post } from '@nestjs/common';
import { Logger } from '../../domain/logger/logger.service';
import { UrlScreenshotRoutes } from 'src/common/routes/url-screenshot.route';
import { UrlScreenshotService } from 'src/core/services/url-screenshot.service';
import { ScreenshotCreateResponseDto } from 'src/common/dtos/response/screenshot-response-create.dto';
import { ScreenshotCreateRequestDto } from 'src/common/dtos/request/screeshot-create-request.dto';

@Controller(UrlScreenshotRoutes.base)
export class UrlScreenshotController {
  @Inject()
  private logger: Logger;
  constructor(@Inject(UrlScreenshotService) private service: UrlScreenshotService) {}

  @Post()
  create(@Body() body: ScreenshotCreateRequestDto): Promise<ScreenshotCreateResponseDto> {
    return this.service.create(body);
  }
}
