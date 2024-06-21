"use client";

import TabMenu from '@/components/mypage/TabMenu';
import React, { useState } from 'react';

interface TabMenuProps {
    tabs: { label: string, content: React.ReactNode }[];
}

const TabMenuContainer: React.FC<TabMenuProps> = ({ tabs }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleTabClick = (index: number) => {
        setActiveIndex(index);
    };

    return (
        <TabMenu
            tabs={tabs}
            activeIndex={activeIndex}
            handleTabClick={handleTabClick}
        />
    );
};

export default TabMenuContainer;
