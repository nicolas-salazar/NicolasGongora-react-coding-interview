import React from 'react';
import { PageHeader } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

import { withContextInitialized } from '../components/hoc';
import { usePeople } from '../components/hooks/usePeople';

import Header from '../components/molecules/ListHeader';
import GenericList from '../components/organisms/GenericList';
import PersonDisplay from '../components/molecules/PersonDisplay';

import { DISPLAY_MODE_CARD, Person } from '../constants/types';
import { useRouter } from 'next/router';
import { ResponsiveListCard } from '../constants';
import useDisplayMode, { COLUMNS_VIEW_MODE, LIST_VIEW_MODE } from '../components/hooks/useDisplayMode';
import usePageSize from '../components/hooks/usePageSize';

const Home = () => {
  const { displayMode, setDisplayMode } = useDisplayMode();
  const { pageSize, setPageSize } = usePageSize();

  const router = useRouter();
  const { data: people, totalItems, loading, execute } = usePeople();

  const isCard = displayMode === COLUMNS_VIEW_MODE;
  const Component = isCard ? PersonDisplay.Card : PersonDisplay.ListItem;

  return (
    <PageHeader avatar={{ icon: <TeamOutlined /> }} title="People list">
      <GenericList<Person>
        extra={isCard && ResponsiveListCard}
        data={people}
        loading={loading}
        handleLoadMore={() => execute(pageSize)}
        hasMore={people.length < totalItems}
        ItemRenderer={({ item }: any) => (
          <Component onEdit={(email) => router.push(`/person/${email}`)} item={item} />
        )}
        Header={
          <Header
            displayMode={displayMode === COLUMNS_VIEW_MODE ? 'card' : 'item'}
            onDiplayModeChange={(newDisplayMode) => setDisplayMode(newDisplayMode === 'card' ? COLUMNS_VIEW_MODE : LIST_VIEW_MODE)}
            pageSize={pageSize}
            title={`Displaying ${people.length} of ${totalItems}`}
            onPageSizeChange={setPageSize}
          />
        }
      />
    </PageHeader>
  );
};

export default withContextInitialized(Home);
