import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { GetCategoryDto } from './dto/get-category.dto';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}
  @Get()
  getCategoryAll(@Query() getCategoryDto: GetCategoryDto) {
    return this.categoryService.getCategoryAll(getCategoryDto);
  }

  @Get()
  getCategory(@Query() getCategoryDto: GetCategoryDto) {
    return this.categoryService.getCategory(getCategoryDto);
  }

  @Post()
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Put('/update/:id_category')
  updateCategoryById(
    @Param('id_category', ParseIntPipe) id_category: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(id_category, updateCategoryDto);
  }

  @Put('/delete/:id_category')
  deleteCategoryById(@Param('id_category', ParseIntPipe) id_category: number) {
    return this.categoryService.deleteCategory(id_category);
  }

  @Put('/un-delete/:id_category')
  unDeleteCategoryById(
    @Param('id_category', ParseIntPipe) id_category: number,
  ) {
    return this.categoryService.unDeleteCategory(id_category);
  }
}
