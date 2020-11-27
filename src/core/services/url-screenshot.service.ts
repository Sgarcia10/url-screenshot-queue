import { Injectable } from '@nestjs/common';
import { SqsProvider } from 'src/domain/provider/sqs.provider';
import { ScreenshotCreateResponseDto } from 'src/common/dtos/response/screenshot-response-create.dto';
import { ConfigService } from 'src/config/config.service';
import { HttpDomainException } from 'src/domain/exceptions/http.exception';
import { CreateScreenshotMessage } from 'src/domain/models/createScreenshotMessage.model';
import { ScreenshotCreateRequestDto } from 'src/common/dtos/request/screeshot-create-request.dto';

@Injectable()
export class UrlScreenshotService {
  constructor(private sqsProvider: SqsProvider, private configService: ConfigService) {}

  async create(screenshotCreate: ScreenshotCreateRequestDto): Promise<ScreenshotCreateResponseDto> {
    try {
      const imageName = Date.now().toString() + '.png';
      const screenshotMessage: CreateScreenshotMessage = {
        ...screenshotCreate,
        imageName
      };
      await this.sqsProvider.sendMessage(screenshotMessage);
      const urlImage = `${this.configService.imageBasePath}${imageName}`;

      return {
        urlImage,
        state: 'PENDING'
      };
    } catch (error) {
      throw new HttpDomainException({ message: 'Failed to create image' });
    }
  }
}
