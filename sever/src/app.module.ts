import { setGlobalOptions } from '@typegoose/typegoose';
setGlobalOptions({
  schemaOptions: {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
});
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { DbModule } from '@app/db';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule.forRoot(),
    DbModule.forFeature(),
    MessageModule,
    UserModule,
    GroupModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
