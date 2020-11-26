import * as aws from 'aws-sdk';
import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class SqsProvider {
  private sqs: aws.SQS;
  private queueUrl: string;

  constructor(private configService: ConfigService) {
    this.sqs = new aws.SQS({
      region: configService.awsRegion
    });
    this.queueUrl = `https://sqs.${configService.awsRegion}.amazonaws.com/${configService.awsAccountId}/${configService.awsQueueName}`;
  }

  async sendMessage(message: Record<string, any>): Promise<aws.SQS.SendMessageResult> {
    return new Promise((resolve, reject) => {
      const params = this.createParams(message);
      this.sqs.sendMessage(params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  createParams(message: Record<string, any>): aws.SQS.SendMessageRequest {
    return {
      MessageBody: JSON.stringify(message),
      QueueUrl: this.queueUrl
    };
  }
}
