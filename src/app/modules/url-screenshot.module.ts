import { HttpModule, Module } from '@nestjs/common';
import { UrlScreenshotService } from 'src/core/services/url-screenshot.service';
import { SqsProvider } from 'src/domain/provider/sqs.provider';
import { UrlScreenshotController } from '../controllers/url-screenshot.controller';

@Module({
  imports: [HttpModule],
  controllers: [UrlScreenshotController],
  providers: [UrlScreenshotService, SqsProvider]
})
export class UrlScreenshotModule {}
