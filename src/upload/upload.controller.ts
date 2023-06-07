// import { Controller, Post, UseInterceptors } from '@nestjs/common';
// import { FileInterceptor } from '@nestjs/platform-express';

// @Controller('upload')
// export class UploadController {

//     @UseInterceptors(FileInterceptor('file'))
//     @Post('file')
//     uploadFile(
//       @Body() body: SampleDto,
//       @UploadedFile() file: Express.Multer.File,
//     ) {
//       return {
//         body,
//         file: file.buffer.toString(),
//       };
//     }
// }
