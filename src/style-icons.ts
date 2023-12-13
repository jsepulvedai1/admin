import { NgModule } from '@angular/core';
import { BulbOutline, ExceptionOutline, InfoOutline, LinkOutline, ProfileOutline } from '@ant-design/icons-angular/icons';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';
export const ICONS = [...Object.values(AllIcons), InfoOutline, BulbOutline, ProfileOutline, ExceptionOutline, LinkOutline];
