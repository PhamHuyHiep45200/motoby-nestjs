import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { BannerService } from './banner.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateBanner } from './dto/create-banner.dto';
import { UpdateBanner } from './dto/update-banner.dto';

@ApiTags('banner')
@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @Post()
  createBanner(@Body() createBanner: CreateBanner) {
    return this.bannerService.createBanner(createBanner);
  }
  @Get()
  getBanner() {
    return this.bannerService.getBanner();
  }
  @Put('/:id')
  updateBanner(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBanner: UpdateBanner,
  ) {
    return this.bannerService.updateBanner(id, updateBanner);
  }
  @Delete('/:id')
  deleteBanner(@Param('id', ParseIntPipe) id: number) {
    return this.bannerService.deleteBanner(id);
  }
}
