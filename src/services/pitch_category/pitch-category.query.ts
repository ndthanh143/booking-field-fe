import pitchCategoryService from './pitch-category.service';
import { defineQuery } from '@/utils/defineQuery';

export const pitchCategoryKeys = {
  all: ['pitchCategory'] as const,
  lists: () => [...pitchCategoryKeys.all, 'list'] as const,
  list: () => defineQuery([...pitchCategoryKeys.lists()], () => pitchCategoryService.getAll()),
  details: () => [...pitchCategoryKeys.all, 'detail'] as const,
  detail: (id: number) => defineQuery([...pitchCategoryKeys.details()], () => pitchCategoryService.getOne(id)),
};
