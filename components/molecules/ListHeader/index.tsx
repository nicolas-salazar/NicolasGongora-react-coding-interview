import React from 'react';
import { Select, Space, Switch, Typography } from 'antd';

import { IdcardOutlined, UnorderedListOutlined } from '@ant-design/icons';
import {
  DISPLAY_MODE_CARD,
  DISPLAY_MODE_LIST_ITEM,
  SettingsDisplayMode,
} from '../../../constants/types';
import { TestIDs } from '../../../testing';

interface HeaderProps {
  title: string;
  pageSize: number;
  extra?: React.ReactNode[];
  displayMode: SettingsDisplayMode;
  onPageSizeChange: (value: number) => void;
  onDiplayModeChange: (mode: SettingsDisplayMode) => void;
}
export const DEFAULT_PAGE_SIZE = 20;
const PAGE_SIZE_OPTIONS = [DEFAULT_PAGE_SIZE, 30, 40];

const Header = ({
  title,
  extra = [],
  displayMode,
  onPageSizeChange,
  onDiplayModeChange,
  pageSize = DEFAULT_PAGE_SIZE,
}: HeaderProps) => (
  <Space direction="horizontal">
    <Typography.Text>{title}</Typography.Text>
    <Select defaultValue={pageSize} onChange={onPageSizeChange} value={pageSize}>
      {PAGE_SIZE_OPTIONS.map((value) => (
        <Select.Option key={value} value={value}>
          {value}
        </Select.Option>
      ))}
    </Select>
    <Switch
      data-testid={TestIDs.switcherDisplayMode}
      checkedChildren={<IdcardOutlined />}
      unCheckedChildren={<UnorderedListOutlined />}
      checked={displayMode === DISPLAY_MODE_CARD}
      onChange={(checked) =>
        onDiplayModeChange(checked ? DISPLAY_MODE_CARD : DISPLAY_MODE_LIST_ITEM)
      }
    />
    {extra}
  </Space>
);

export default Header;
