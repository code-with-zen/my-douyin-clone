import {
  IconHome,
  IconLive,
  IconStar,
  IconTiktokLogo,
  IconUser,
} from '@douyinfe/semi-icons';
import { Button, Layout } from '@douyinfe/semi-ui';
import { Outlet } from '@modern-js/runtime/router';
import React, { useState } from 'react';
import './index.css';
import '@douyinfe/semi-ui/dist/css/semi.min.css';

const { Header, Content } = Layout;

const MENU_ITEMS = [
  { key: 'Home', text: '精选', icon: <IconHome /> },
  { key: 'Live', text: '推荐', icon: <IconLive /> },
  { key: 'AI', text: 'AI', icon: <IconStar /> },
  { key: 'Follow', text: '关注', icon: <IconUser /> },
];

export default function LayoutComponent() {
  const [activeKey, setActiveKey] = useState('Home');

  return (
    <Layout className="h-screen w-screen overflow-hidden bg-black flex flex-col text-white">
      <Header className="h-[60px] shrink-0 bg-[#161823] border-b border-[#333] flex items-center px-4 z-10 relative">
        <IconTiktokLogo style={{ fontSize: 36, color: 'white' }} />
        <span className="ml-2 font-bold text-lg text-white">抖音</span>
        <div className="ml-auto mr-2">
          <Button
            theme="solid"
            type="primary"
            style={{ backgroundColor: '#fe2C55', borderColor: '#fe2C55' }}
          >
            登录
          </Button>
        </div>
      </Header>

      <Layout className="flex-1 overflow-hidden flex relative">
        {/* 侧边栏 */}
        <Layout.Sider
          className="shrink-0 bg-[#161823] border-r border-[#252632] flex flex-col items-center pt-2 z-20"
          style={{ width: 72 }}
        >
          {MENU_ITEMS.map(item => {
            const isActive = activeKey === item.key;
            return (
              <div
                key={item.key}
                onClick={() => setActiveKey(item.key)}
                className={`
                  cursor-pointer w-[52px] h-[52px] py-[6px] px-[8px] mb-[16px] rounded-[10px]
                  flex flex-col items-center justify-center transition-all duration-200
                  ${isActive ? 'bg-[rgba(255,255,255,0.15)] text-white' : 'text-gray-500 hover:bg-[rgba(255,255,255,0.05)] hover:text-white'}
                `}
              >
                <div
                  className={`text-[24px] leading-none mb-[2px] transition-transform duration-200 ${isActive ? 'scale-105 text-[#fe2C55]' : ''}`}
                >
                  {item.icon}
                </div>
                <span
                  className={`w-full flex items-center justify-center text-[16px] leading-none whitespace-nowrap origin-top transform ${isActive ? 'font-bold' : ''}`}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </Layout.Sider>

        {/* 内容区域 */}
        <Content className="flex-1 h-full relative bg-black">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
